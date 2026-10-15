import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/not-found")({
  head: () => ({
    meta: [
      { title: "404 – Page Not Found" },
      {
        name: "description",
        content:
          "Simulated 404 page shown after a phishing-awareness demo submission for an Ethical Hacking college assessment.",
      },
      { property: "og:title", content: "404 – Page Not Found" },
      {
        property: "og:description",
        content: "Phishing-awareness demo result page.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: FakeNotFound,
});

function FakeNotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-10">
      <div className="max-w-xl w-full text-center space-y-6">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="text-xl font-semibold text-foreground">Page Not Found</h2>
        <p className="text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="mt-8 text-left border border-amber-300 bg-amber-50 text-amber-900 rounded-lg p-5 text-sm space-y-3">
          <p className="font-semibold">⚠️ This was a phishing-awareness simulation.</p>
          <p>
            You just submitted a form on a fake login page as part of an authorized{" "}
            <strong>Ethical Hacking</strong> college assessment. On a real phishing site,
            your credentials would have been stolen.
          </p>
          <p>
            In this demo, only your <em>fictional</em> username, a timestamp, and a status
            flag were recorded. Your password was <strong>never</strong> read, sent,
            stored, or logged.
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>Always check the URL before entering credentials.</li>
            <li>Look for HTTPS and verify the real domain name.</li>
            <li>Enable two-factor authentication on real accounts.</li>
            <li>Report suspicious login pages to your IT/security team.</li>
          </ul>
        </div>

        <Link
          to="/"
          className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Back to demo login
        </Link>
      </div>
    </div>
  );
}
