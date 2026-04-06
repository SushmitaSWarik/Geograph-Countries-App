// function App() {

//   return (
//     <>

//     </>
//   )
// }

// export default App

// import { gql, useQuery } from "@apollo/client";

// const GET_COUNTRIES = gql`
//   query {
//     countries {
//       name
//       emoji
//     }
//   }
// `;

// function App() {
//   const { loading, data } = useQuery(GET_COUNTRIES);

//   if (loading) return <p>Loading...</p>;

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl text-blue-500 font-bold">
//         🌍 GeoGraph Working 🚀
//       </h1>

//       {data.countries.map(c => (
//         <p key={c.name}>
//           {c.emoji} {c.name}
//         </p>
//       ))}
//     </div>
//   );
// }

// export default App;

// import { gql, useQuery } from "@apollo/client";
// import { useState } from "react";

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

// function App() {
//   const { loading, error, data } = useQuery(GET_COUNTRIES);
//   // console.log(data.countries);

//   const [search, setSearch] = useState("");
//   const [continent, setContinent] = useState("");

//   if (loading)
//     return (
//       <p className="text-center mt-10 text-lg animate-pulse">
//         Loading countries...
//       </p>
//     );

//   if (error) return <p>Error 😢</p>;

//   // Filter logic
//   const filtered = data?.countries.filter(c => {
//     return (
//       c.name.toLowerCase().includes(search.toLowerCase()) &&
//       (continent === "" || c.continent.name === continent)
//     );
//   });

//   // Get unique continents
//   const continents = [...new Set(data?.countries.map(c => c.continent.name))];

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       {/* Header */}
//       <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">
//         🌍 GeoGraph
//       </h1>

//       {/* Filters */}
//       <div className="flex flex-col md:flex-row gap-4 justify-center mb-6">
//         {/* Search */}
//         <input
//           type="text"
//           placeholder="Search country..."
//           className="px-4 py-2 rounded-xl border shadow focus:ring-2 focus:ring-blue-400 outline-none"
//           value={search}
//           onChange={e => setSearch(e.target.value)}
//         />

//         {/* Continent Filter */}
//         <select
//           className="px-4 py-2 rounded-xl border shadow"
//           value={continent}
//           onChange={e => setContinent(e.target.value)}
//         >
//           <option value="">All Continents</option>
//           {continents.map(cont => (
//             <option key={cont}>{cont}</option>
//           ))}
//         </select>
//       </div>

//       {/* Grid */}
//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
//         {filtered.map(country => (
//           <div
//             key={country.code}
//             className="bg-white rounded-2xl shadow-md p-4 text-center hover:shadow-xl hover:-translate-y-1 transition duration-300 cursor-pointer"
//           >
//             {/* <p className="text-3xl">{country.emoji}</p> */}
//             <img
//               src={`https://flagcdn.com/w80/${country.code.toLowerCase()}.png`}
//               alt={country.name}
//               className="mx-auto mb-2"
//             />
//             <h2 className="font-semibold mt-2">{country.name}</h2>
//             <p className="text-sm text-gray-500">
//               {country.capital || "No Capital"}
//             </p>
//             <p className="text-xs text-blue-500 mt-1">
//               {country.continent.name}
//             </p>
//           </div>
//         ))}
//       </div>

//       {/* Empty State */}
//       {filtered.length === 0 && (
//         <p className="text-center mt-10 text-gray-500">No countries found 😢</p>
//       )}
//     </div>
//   );
// }

// export default App;





import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CountryDetails from "./pages/CountryDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/country/:code" element={<CountryDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;