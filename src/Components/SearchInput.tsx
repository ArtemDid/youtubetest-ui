import React, { useState } from 'react';

const SearchInput: React.FC<{queryDefault:string|null, onSearch: (query: string|null) => void }> = ({ queryDefault, onSearch }) => {
  const [query, setQuery] = useState(queryDefault);

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSearch} className="flex justify-center p-4">
      <input
        type="text"
        value={query||''}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a video..."
        className="border p-2 w-1/2 rounded"
      />
      <button type="submit" className="ml-2 bg-blue-500 text-white px-4 py-2 rounded">Search</button>
    </form>
  );
};

export default SearchInput;
