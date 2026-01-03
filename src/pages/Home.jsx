export default function Home() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* HERO SECTION */}
      <section className="bg-blue-600 text-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-4">
            Book Flights Easily & Securely ✈️
          </h1>
          <p className="text-lg mb-8">
            Search flights, book tickets, and get email reminders — all in one place.
          </p>

          <a
            href="/search"
            className="bg-white text-blue-600 px-6 py-3 rounded font-semibold hover:bg-gray-100"
          >
            Search Flights
          </a>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8 text-center">
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-xl font-semibold mb-2">🔍 Search Flights</h3>
            <p className="text-gray-600">
              Find flights by route, date, and price easily.
            </p>
          </div>

          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-xl font-semibold mb-2">💺 Book Instantly</h3>
            <p className="text-gray-600">
              Secure booking with instant confirmation.
            </p>
          </div>

          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-xl font-semibold mb-2">📧 Email Reminders</h3>
            <p className="text-gray-600">
              Get flight reminders before departure.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
