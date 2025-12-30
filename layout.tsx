export const metadata = {
  title: "Gensyn Dashboard",
  description: "Live sale and refund analytics"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body style={{ background: "#000", color: "#0ff", fontFamily: "monospace" }}>
        {children}
      </body>
    </html>
  );
}
