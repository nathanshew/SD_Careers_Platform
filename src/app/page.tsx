import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-center">
        <Image
          className="dark:invert w-48 h-auto"
          src="/Fintech Logo.svg"
          alt="Fintech logo"
          width={500}
          height={500}
          priority
        />
        <h1 className="text-4xl font-bold text-center">NUS Fintech Society Careers Page</h1>
      </main>
    </div>
  );
}