export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Bine ai venit la Planyvite Expo
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Târgul digital de evenimente unde găsești toți furnizorii de care ai
            nevoie. Descoperă servicii de calitate pentru evenimentul tău
            perfect.
          </p>
          <div className="space-x-4">
            <button className="bg-primary hover:bg-primary/80 cursor-pointer text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              Catalog Furnizori
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Ce poți face?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Descoperă toate funcționalitățile platformei noastre pentru
            evenimente perfecte
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <span className="text-indigo-600 text-xl">🔍</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Caută Furnizori</h3>
            <p className="text-gray-600">
              Găsește rapid furnizori verificați pentru orice tip de eveniment
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <span className="text-indigo-600 text-xl">💰</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Compară Prețuri</h3>
            <p className="text-gray-600">
              Vezi oferte de la mai mulți furnizori și alege cea mai bună ofertă
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <span className="text-indigo-600 text-xl">📞</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Vezi Contacte</h3>
            <p className="text-gray-600">
              Toate informațiile de contact ale furnizorilor la un click
              distanță
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <span className="text-indigo-600 text-xl">⭐</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Citește Recenzii</h3>
            <p className="text-gray-600">
              Ia decizii informate bazate pe experiențele altor clienți
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <span className="text-indigo-600 text-xl">📅</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">
              Rezervă Intalnire Online
            </h3>
            <p className="text-gray-600">
              Programează întâlniri cu furnizorii direct prin platforma noastră
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
