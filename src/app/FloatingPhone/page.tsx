import FloatingPhone from "@/components/FloatingPhone";

export default function Home() {
  return (
    <div>
      <div className="flex justify-end right-10">
        <main className="flex h-[1003px] w-[586px] bg-blue-800">
          <FloatingPhone />
        </main>
      </div>
    </div>
  );
}
