import { NextRequest, NextResponse } from "next/server";
import { UserRole } from "./types/user.type";
import { getCurrentUser } from "./services/api/user.api.service";

//  Define accessible routes for each role
const roleBaseRoutes: Record<string, RegExp[]> = {
  [UserRole.ADMIN]: [/^\/admin/],
  [UserRole.EMPLOYEE]: [/^\/employee/],
  [UserRole.CLIENT]: [/^\/client/],
};

//Routes that don't require authentication
const authRoutes = ["/", "/login"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  let userResponse;

  const redirectHome = () => {
    const redirectUrl = new URL("/", request.url);
    return NextResponse.redirect(redirectUrl);
  };

  try {
    userResponse = await getCurrentUser();
  } catch (err) {
    // If the API call fails, treat as unauthenticated
    userResponse = null;
  }

  const user = userResponse?.data;

  //  If logged in and trying to access auth
  if (user && authRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL(`/${user.role}`, request.url));
  }

  //  If not logged in
  if (!user) {
    if (authRoutes.includes(pathname)) {
      // Allow login access
      return NextResponse.next();
    }
    // Redirect to default home page
    return redirectHome();
  }

  //  Determine user role
  const userRole = user.role;

  const allowedRoutes = roleBaseRoutes[userRole] || [];

  const isAllowed = allowedRoutes.some((route) => route.test(pathname));

  // If route is not allowed
  if (!isAllowed) return redirectHome();

  //   allow
  return NextResponse.next();
}

//  Apply middleware to restricted and auth routes
export const config = {
  matcher: ["/((?!api|_next|favicon.ico).*)"],
};
