export default function Home() {
  return (
    <div className="h-screen flex items-center justify-center bg-surface">
      <div className="card">
        <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted mb-4">Welcome back 👋</p>

        <button className="btn shadow-button">
          Start Interview
        </button>
      </div>
    </div>
  );
}