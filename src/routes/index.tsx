import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PhotoConnect – Log In" },
      {
        name: "description",
        content:
          "Educational phishing-awareness demo login page for an Ethical Hacking college assessment. Not a real service.",
      },
      { property: "og:title", content: "PhotoConnect – Educational Demo" },
      {
        property: "og:description",
        content:
          "Ethical Hacking training demo page for phishing awareness. Do not enter real credentials.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: LoginPage,
});

// Students: paste the Apps Script Web App URL here after deploying.
// It's a public endpoint that only accepts a demo username + timestamp.
const APPS_SCRIPT_URL = "";

function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    const u = username.trim();
    if (!u || !password) {
      setError("Please fill in both fields.");
      return;
    }
    if (u.length > 50 || !/^[a-zA-Z0-9._-]+$/.test(u)) {
      setError("Username can only contain letters, numbers, dots, underscores and dashes.");
      return;
    }

    setSubmitting(true);

    // IMPORTANT: password is intentionally never read, sent, or logged.
    const payload = {
      username: u,
      timestamp: new Date().toISOString(),
      status: "Demo Submitted",
    };

    try {
      if (APPS_SCRIPT_URL) {
        // text/plain avoids a CORS preflight to Apps Script.
        await fetch(APPS_SCRIPT_URL, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify(payload),
        });
      }
    } catch {
      // Swallow network errors — this is a demo, continue to the fake 404.
    } finally {
      // Clear the password from memory before navigating away.
      setPassword("");
      setSubmitting(false);
      navigate({ to: "/not-found" });
    }
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-rose-50 via-white to-sky-50 flex flex-col">
      <div className="w-full bg-amber-100 border-b border-amber-300 text-amber-900 text-center text-sm px-4 py-2">
        ⚠️ Educational Demo Only – Do Not Enter Real Credentials
      </div>

      <main className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-sm space-y-4">
          <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
            <h1 className="text-center text-4xl font-semibold tracking-tight bg-gradient-to-r from-fuchsia-500 via-rose-500 to-amber-500 bg-clip-text text-transparent mb-8">
              PhotoConnect
            </h1>

            <form onSubmit={handleSubmit} className="space-y-2" noValidate>
              <input
                type="text"
                autoComplete="off"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                maxLength={50}
                className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-300 rounded focus:outline-none focus:border-gray-400"
              />
              <input
                type="password"
                autoComplete="off"
                placeholder="Dummy Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                maxLength={100}
                className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-300 rounded focus:outline-none focus:border-gray-400"
              />

              {error && (
                <p className="text-xs text-red-600 pt-1" role="alert">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full mt-3 py-2 text-sm font-semibold text-white bg-sky-500 hover:bg-sky-600 disabled:opacity-60 rounded transition-colors"
              >
                {submitting ? "Submitting…" : "Log in"}
              </button>
            </form>

            <p className="mt-6 text-center text-xs text-gray-500 leading-relaxed">
              Try fictional demo credentials, e.g.
              <br />
              <span className="font-mono text-gray-700">student_demo01 / demo1234</span>
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4 text-center text-xs text-gray-600">
            This site is part of an authorized college <strong>Ethical Hacking</strong>{" "}
            assessment on phishing awareness. It is not affiliated with any real social
            network. No real credentials are collected.
          </div>
        </div>
      </main>

      <footer className="text-center text-xs text-gray-500 py-4 px-4">
        PhotoConnect · Ethical Hacking Training Demo – Phishing Awareness
      </footer>
    </div>
  );
}
