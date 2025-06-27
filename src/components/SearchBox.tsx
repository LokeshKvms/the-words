import React, { useState, type FormEvent } from "react";

interface SearchBoxProps {
  onSearch: (query: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim() === "") return;
    onSearch(query.trim());
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 max-w-md mx-auto mt-8"
    >
      <input
        type="text"
        placeholder="Enter a word or sentence..."
        className="flex-grow p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        type="submit"
        className="px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBox;
