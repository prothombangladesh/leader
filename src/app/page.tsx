export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-4xl font-bold text-blue-700">মোহাম্মদ আলী আসগর লবী</h1>
      <p className="mt-4 text-lg text-gray-700">
        আমি শহীদ জিয়ার সৈনিক, জনগণের সেবক
      </p>
      <a
        href="/peoples-voice"
        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
      >
        Share Your Voice
      </a>
    </main>
  )
}
