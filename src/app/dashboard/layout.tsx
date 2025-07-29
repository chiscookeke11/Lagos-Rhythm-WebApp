import Header from "@/components/dashboard/Header";
import SideNav from "@/components/dashboard/SideNav";


// app/dashboard/layout.tsx
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className=" bg-[#FAFBFC] w-full h-full relative flex items-start " >
      <SideNav />
      <main className="h-screen overflow-y-auto  w-full relative flex flex-col items-start gap-6 " >
        <Header />
        <div className="w-full h-fit" >
          {children}
        </div>
      </main>
    </div>
  );
}
