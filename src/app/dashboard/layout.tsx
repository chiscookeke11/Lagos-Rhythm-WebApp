

// app/dashboard/layout.tsx
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <header className="p-4 bg-blue-800 text-white">Dashboard Header</header>
      <main className="p-6">{children}</main>
    </div>
  );
}
