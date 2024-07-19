import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gray-200">
      <Link href="practice">
        <button className="bg-gray-700 px-4 py-2 rounded-full text-gray-50 border-2 border-blue-400 outline  outline-gray-700 outline-2">Practice common words</button>
      </Link>
    </main>
  );
}
