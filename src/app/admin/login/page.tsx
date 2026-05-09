"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Nesprávny email alebo heslo.");
    } else {
      router.push("/admin");
      router.refresh();
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#f9efe2" }}>
      <div className="w-full max-w-[420px] rounded-[20px] p-10" style={{ backgroundColor: "#ffffff", border: "1px solid #e4d5b2", boxShadow: "0 8px 32px rgba(0,0,0,0.08)" }}>

        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div style={{ width: "48px", height: "48px", backgroundColor: "#bea055", borderRadius: "12px", marginBottom: "16px" }} />
          <h1 style={{ fontFamily: "var(--font-commissioner)", fontSize: "28px", fontWeight: 700, color: "#1c1d1e" }}>
            Marana Tha
          </h1>
          <p style={{ fontFamily: "var(--font-inter)", fontSize: "14px", color: "#635f5b", marginTop: "4px" }}>
            Admin panel
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {error && (
            <div className="px-4 py-3 rounded-[8px]" style={{ backgroundColor: "#fef2f2", border: "1px solid #fca5a5", color: "#dc2626", fontFamily: "var(--font-inter)", fontSize: "14px" }}>
              {error}
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <label style={{ fontFamily: "var(--font-inter)", fontSize: "13px", fontWeight: 500, color: "#292929" }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="admin@maranatha.sk"
              required
              style={{ fontFamily: "var(--font-commissioner)", fontSize: "15px", color: "#1c1d1e", backgroundColor: "#ffffff", border: "1px solid #e4d5b2", borderRadius: "8px", padding: "10px 14px", outline: "none" }}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label style={{ fontFamily: "var(--font-inter)", fontSize: "13px", fontWeight: 500, color: "#292929" }}>
              Heslo
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              style={{ fontFamily: "var(--font-commissioner)", fontSize: "15px", color: "#1c1d1e", backgroundColor: "#ffffff", border: "1px solid #e4d5b2", borderRadius: "8px", padding: "10px 14px", outline: "none" }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 py-3 rounded-full transition-colors hover:bg-[#977d3e]"
            style={{ backgroundColor: loading ? "#9ca3af" : "#bea055", fontFamily: "var(--font-commissioner)", fontSize: "15px", fontWeight: 700, color: "#fdf5f2", cursor: loading ? "not-allowed" : "pointer", border: "none" }}
          >
            {loading ? "Prihlasovanie..." : "Prihlásiť sa"}
          </button>
        </form>
      </div>
    </div>
  );
}
