import React, { useState, useEffect } from 'react';

const RecentSearches: React.FC<{ query:string|null, onSearch: (query: string) => void }> = ({ query, onSearch }) => {
  const [searchHistory, setSearchHistory] = useState<any[]>([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/history`);
        const res = await response.json();
        setSearchHistory(res.history);
      } catch (error) {
        console.error('Failed to fetch history');
      }
    };

    fetchHistory();
  }, [query]);

  return (
    <div className="p-4">
      <h2 className="font-semibold mb-4">Recent Searches</h2>
      <ul className="space-y-2">
        {searchHistory.map((entry, index) => (
          <li
            key={index}
            className="flex justify-between items-center bg-gray-100 p-2 rounded cursor-pointer"
            onClick={() => onSearch(entry.query)}
          >
            <span>{entry.query}</span>
            <span className="text-xs text-gray-500">{new Date(entry.created_at).toLocaleString()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentSearches;
