import Header from "@/components/Header";
import SideBar from "@/components/SideBar";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid flex-1 w-full grid-cols-[250px_minmax(0,1fr)_minmax(0,1fr)] grid-rows-[3rem_minmax(0,1fr)_minmax(0,1fr)] gap-4 p-4">
      <SideBar />
      <Header />
      <main className="col-span-2 row-span-2 bg-white rounded-xl p-2.5 overflow-auto">
        {children}
      </main>
    </div>
  );
}
