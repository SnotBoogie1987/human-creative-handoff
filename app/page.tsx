export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-6xl font-black mb-4">
          HUMAN.
        </h1>
        <p className="text-lg text-gray-600">
          Your Next.js 14 + Supabase project is ready!
        </p>
        <div className="mt-8 p-4 bg-lime-green/10 border border-lime-green rounded">
          <p className="text-sm">
            ✅ Supabase connected<br />
            ✅ Tailwind CSS configured<br />
            ✅ TypeScript enabled
          </p>
        </div>
      </div>
    </main>
  )
}
