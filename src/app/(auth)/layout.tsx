import Image from "next/image";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-brand-white-500 flex-center h-screen w-screen">
      <div className="container flex h-full min-h-4/5 flex-col items-center justify-around bg-white shadow-2xl lg:h-auto lg:flex-row">
        <Image
          src="pegazuls-logo.svg"
          alt="PegAzuls Logo"
          width={322}
          height={323}
        />
        {children}
      </div>
    </div>
  );
}
