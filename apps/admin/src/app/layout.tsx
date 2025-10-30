export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-gray-900 text-white">{children}</div>
      </body>
    </html>
  );
}
