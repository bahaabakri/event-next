export default function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className="container mx-auto mt-30">{children}</section>;
}
