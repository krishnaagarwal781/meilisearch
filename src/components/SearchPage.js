import React, { useState, useEffect } from "react";
import { MeiliSearch } from "meilisearch";
import movies from "./movies.json";
import Image from "next/image";

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const searchMovies = async () => {
      setIsLoading(true);
      try {
        const client = new MeiliSearch({
          host: "https://meli.catax.me",
          apiKey: "1f194588dd75addc57ce54e46320c0f56b7858c4b6b42cee92beb88a55fe0b72",
        });
        const index = client.index("MoviesCatax");
        const response = await index.search(searchTerm);
        setSearchResults(response.hits);
      } catch (error) {
        console.error("Error searching:", error);
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
        placeholder="Search movies..."
        value={searchTerm}
        onChange={handleInputChange}
      />
      {isLoading ? (
        <div className="overflow-scroll w-96 h-96">Loading...</div>
      ) : (
        <div className="overflow-scroll w-96 h-96">
          {searchResults.map((result) => (
            <div key={result.objectID} className="flex items-center justify-between p-2">
              <p>{result.title}</p>
              <Image
                src={result.poster}
                alt={result.title}
                width={50}
                height={50}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
