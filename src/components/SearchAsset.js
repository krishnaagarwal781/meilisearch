import React, { useState, useEffect } from "react";
import { MeiliSearch } from "meilisearch";
import Image from "next/image";

const SearchAsset = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const searchMovies = async () => {
      setIsLoading(true);
      try {
        const client = new MeiliSearch({
          host: "https://meli.catax.me",
          apiKey:
            "1f194588dd75addc57ce54e46320c0f56b7858c4b6b42cee92beb88a55fe0b72",
        });
        const index = client.index("assetdata");
        const response = await index.search(searchTerm);
        setSearchResults(response.hits);
        setError(null);
      } catch (error) {
        console.error("Error searching:", error);
        setError("An error occurred while searching. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    if (searchTerm.trim() !== "") {
      searchMovies();
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search Assets from catax..."
        value={searchTerm}
        onChange={handleInputChange}
      />
      {isLoading ? (
        <div className="overflow-scroll w-96 h-96">Loading...</div>
      ) : (
        <>
          {error && <div>{error}</div>}
          {searchResults.length === 0 && <div>No results found.</div>}
          <div className="overflow-scroll w-96 h-96">
            {searchResults.map((result) => (
              <div key={result.id} className="flex items-center justify-between p-2">
                <p>{result.name}</p>
                <Image
                  src={result.logoUrl || ""}
                  alt={result.name}
                  width={50}
                  height={50}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SearchAsset;
