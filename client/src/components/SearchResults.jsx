import React from 'react';

const SearchResults = ({ results, query }) => {
  if (!query) return null;

  return (
    <section className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4">
        Search Results for "{query}"
      </h2>
      
      {results.length === 0 ? (
        <p className="text-gray-600">No results found. Try different keywords.</p>
      ) : (
        <ul className="space-y-4">
          {results.map((result) => (
            <li 
              key={`${result.type}-${result.context}-${result.id}`}
              className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50"
            >
              <div className="flex items-baseline mb-2">
                <span className="inline-block px-2 py-1 text-xs font-medium mr-2 rounded bg-blue-100 text-blue-800">
                  {result.type.toUpperCase()}
                </span>
                <h3 className="text-lg font-semibold">{result.name}</h3>
              </div>
              <div className="ml-2">
                <p className="text-gray-600 mb-1">
                  <strong>Program:</strong> {result.context}
                </p>
                <p className="text-gray-600 mb-1">
                  <strong>Requirements:</strong> {result.requirements.join(', ')}
                </p>
                {result.options && (
                  <p className="text-gray-600 mb-1">
                    <strong>Options:</strong> {result.options.join(', ')}
                  </p>
                )}
                <p className="text-gray-600">
                  <strong>Prerequisites:</strong> {result.prerequisites}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default SearchResults;