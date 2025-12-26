import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import type {LayoutProps} from '@/types' 



export default function layout({ children }: LayoutProps) {
  return (
    <div className="flex">
      {/* Sidebar */}
     <div className="sticky top-0 h-screen">
       <Sidebar />
     </div>
      
      {/* Main Content */}
      <main className="flex-1">
        <Header/>
       <div className='lg:p-5'>
         {children}
       </div>
      </main>
    </div>
  );
}
