import Header from "@/components/Header";
import SideBar from "@/components/SideBar";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid flex-1 w-full grid-cols-[16rem_minmax(0,1fr)_minmax(0,1fr)] grid-rows-[3rem_minmax(0,1fr)_minmax(0,1fr)] gap-4 p-2 lg:p-4">
      <SideBar />
      <Header />
      <main className="col-span-3 lg:col-span-2 lg:row-span-2 bg-white rounded-xl">
        {children}
      </main>
    </div>
  );
}
