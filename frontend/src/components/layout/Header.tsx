'use client';

export default function Header() {
  return (
   <header className='p-3 w-full bg-white sticky top-0 '>
    <div className='flex justify-between items-center'>
    <h1 className="text-xl font-semibold ">Welcome,Rony</h1>
     <div className="flex gap-2 items-center   rounded-full font-semibold">
     <img className="size-10 rounded-full object-cover" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuNhTZJTtkR6b-ADMhmzPvVwaLuLdz273wvQ&s" alt="" />
     <p>Arafat Hasan</p>
     </div>
    </div>
   </header>
  );
}
