

import { useParams, useNavigate } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

const GET_COUNTRY = gql`
  query GetCountry($code: ID!) {
    country(code: $code) {
      code
      name
      capital
      currency
      continent {
        name
      }
      languages {
        name
      }
    }
  }
`;

function CountryDetails() {
  const { code } = useParams();
  const navigate = useNavigate();

  const { loading, data } = useQuery(GET_COUNTRY, {
    variables: { code },
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 animate-pulse">Loading...</p>
      </div>
    );
  }

  const c = data?.country;

    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        {/* CARD */}
        <div className="w-full md:w-1/2 bg-white rounded-xl shadow-lg p-6">
          {/* HEADER */}
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={() => navigate("/")}
              className="text-sm px-3 py-1.5 bg-gray-100 rounded-md hover:bg-gray-200 transition"
            >
              ← Back
            </button>

            <h1 className="text-base font-semibold text-gray-700">
              Country Details
            </h1>
          </div>

          {/* FLAG */}
          <div className="flex justify-center mb-4">
            <img
              src={`https://flagcdn.com/w320/${c.code.toLowerCase()}.png`}
              alt={c.name}
              className="w-40 rounded-lg shadow-md"
            />
          </div>

          {/* NAME */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">{c.name}</h2>
            <p className="text-gray-500 text-sm mt-1">
              Located in {c.continent.name}
            </p>
          </div>

          {/* STACKED DETAILS */}
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <p className="text-xs text-gray-400">Capital</p>
              <p className="font-medium text-gray-800">{c.capital || "N/A"}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <p className="text-xs text-gray-400">Currency</p>
              <p className="font-medium text-gray-800">{c.currency || "N/A"}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <p className="text-xs text-gray-400">Languages</p>
              <p className="font-medium text-gray-800">
                {c.languages.map(l => l.name).join(", ")}
              </p>
            </div>
          </div>

          {/* OVERVIEW */}
          <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-sm">
            <h3 className="text-sm font-semibold text-gray-600 mb-2">
              Overview
            </h3>

            <p className="text-gray-600 text-sm leading-relaxed">
              {c.name} is located in {c.continent.name}. The capital city is{" "}
              {c.capital || "not available"} and the country uses{" "}
              {c.currency || "various currencies"}. The primary languages spoken
              include {c.languages.map(l => l.name).join(", ")}.
            </p>
          </div>

          {/* BACK BUTTON */}
          {/* <div className="mt-6 flex justify-center">
            <button
              onClick={() => navigate("/")}
            //   className="px-6 py-2.5 bg-blue-600 text-white rounded-lg shadow-md 
            //    hover:bg-blue-700 hover:shadow-lg transition duration-200"
              className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 
           text-white rounded-lg shadow-md hover:scale-105 
           transition duration-200"
            >
              ← Back to Home
            </button>
          </div> */}

         
        </div>
      </div>
    );
}

export default CountryDetails;