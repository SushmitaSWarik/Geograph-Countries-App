// import { gql, useQuery } from "@apollo/client";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const GET_COUNTRIES = gql`
//   query {
//     countries {
//       code
//       name
//       emoji
//       capital
//       continent {
//         name
//       }
//     }
//   }
// `;

// function Home() {
//   const { loading, data } = useQuery(GET_COUNTRIES);
//   const [search, setSearch] = useState("");
//   const navigate = useNavigate();

//   if (loading) return <p>Loading...</p>;

//   const filtered = data.countries.filter(c =>
//     c.name.toLowerCase().includes(search.toLowerCase()),
//   );

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <h1 className="text-4xl text-center text-blue-600 font-bold mb-6">
//         🌍 GeoGraph
//       </h1>

//       <div className="flex justify-center mb-6">
//         <input
//           type="text"
//           placeholder="Search..."
//           className="px-4 py-2 border rounded-xl"
//           value={search}
//           onChange={e => setSearch(e.target.value)}
//         />
//       </div>

//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         {filtered.map(c => (
//           <div
//             key={c.code}
//             onClick={() => navigate(`/country/${c.code}`)}
//             className="bg-white p-4 rounded-xl shadow cursor-pointer hover:scale-105 transition"
//           >
//             <p className="text-2xl">{c.emoji}</p>
//             <h2>{c.name}</h2>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Home;



import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const GET_COUNTRIES = gql`
  query {
    countries {
      code
      name
      capital
      continent {
        name
      }
    }
  }
`;

function Home() {
  const { loading, error, data } = useQuery(GET_COUNTRIES);
  const [search, setSearch] = useState("");
  const [continent, setContinent] = useState("");
  const navigate = useNavigate();

  const countries = data?.countries || [];

  const continents = [...new Set(countries.map(c => c.continent.name))];

  const filtered = countries.filter(c => {
    return (
      c.name.toLowerCase().includes(search.toLowerCase()) &&
      (continent === "" || c.continent.name === continent)
    );
  });

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-6">
        {/* Header */}
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">
          🌍 GeoGraph
        </h1>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 justify-center mb-6">
          <input
            type="text"
            placeholder="Search country..."
            className="px-4 py-2 rounded-xl border shadow focus:ring-2 focus:ring-blue-400 outline-none"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />

          <select
            className="px-4 py-2 rounded-xl border shadow"
            value={continent}
            onChange={e => setContinent(e.target.value)}
          >
            <option value="">All Continents</option>
            {continents.map(cont => (
              <option key={cont}>{cont}</option>
            ))}
          </select>
        </div>

        {/* CONDITIONAL UI */}
        {loading ? (
          <p className="text-center mt-10 text-lg animate-pulse">
            Loading countries...
          </p>
        ) : error ? (
          <p className="text-center mt-10 text-red-500">Error 😢</p>
        ) : (
          <>
            {/* Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
              {filtered.map(country => (
                <div
                  key={country.code}
                  onClick={() => navigate(`/country/${country.code}`)}
                  className="bg-white rounded-2xl shadow-md p-4 text-center hover:shadow-xl hover:-translate-y-1 transition duration-300 cursor-pointer"
                >
                  <img
                    src={`https://flagcdn.com/w80/${country.code.toLowerCase()}.png`}
                    alt={country.name}
                    className="mx-auto mb-2 rounded"
                  />

                  <h2 className="font-semibold">{country.name}</h2>

                  <p className="text-sm text-gray-500">
                    {country.capital || "No Capital"}
                  </p>

                  <p className="text-xs text-blue-500 mt-1">
                    {country.continent.name}
                  </p>
                </div>
              ))}
            </div>

            {/* Empty state */}
            {filtered.length === 0 && (
              <p className="text-center mt-10 text-gray-500">
                No countries found 😢
              </p>
            )}
          </>
        )}
      </div>
    );
}

export default Home;