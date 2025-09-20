"use client";
import { useAuth } from "../../context/Authcontext";

export default function Dashboard() {
  const { isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return <p>❌ You must log in first</p>;
  }

  return (
    <div>
      <h1>Welcome to Dashboard 🎉</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
