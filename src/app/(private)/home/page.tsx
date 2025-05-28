import { PrivateLayout } from "@/components/layout/private-layout";
import Image from "next/image";

export default function HomePage() {
  return (
    <PrivateLayout>
      <main className="flex-center flex-col gap-4 p-4 px-8 lg:px-16">
        <Image
          src="/pegazuls-logo.svg"
          alt="Next.js logo"
          width={383}
          height={380}
          priority
        />
      </main>
    </PrivateLayout>
  );
}
