export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-brand-white-500 flex-center h-screen w-screen">
      <div className="container flex h-full min-h-4/5 flex-col items-center justify-around bg-white shadow-2xl lg:h-auto lg:flex-row">
        {children}
      </div>
    </div>
  );
}
