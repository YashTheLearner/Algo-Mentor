import Link from "next/link";

export function AppSidebar() {
  return (
    <aside className="w-64 border-r">
      <div className="border-b p-6">
        <h2 className="text-xl font-bold">
          AlgoMentor
        </h2>
      </div>

      <nav className="flex flex-col gap-2 p-4">
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/interview">Interview</Link>
        <Link href="/reports">Reports</Link>
        <Link href="/settings">Settings</Link>
      </nav>
    </aside>
  );
}