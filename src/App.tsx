import React, { useState } from 'react';
import SearchInput from './Components/SearchInput';
import VideoSearchResults from './Components/VideoSearchResults';
import RecentSearches from './Components/RecentSearches';
import VideoDetail from './Components/VideoDetail';

const App: React.FC = () => {
  const [query, setQuery] = useState<string | null>(null);
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);

  return (
    <div className="container mx-auto p-4">
      <SearchInput queryDefault={query} onSearch={setQuery} />
      {query && <VideoSearchResults query={query} setSelectedVideoId={setSelectedVideoId}/>}
      {selectedVideoId && <VideoDetail videoId={selectedVideoId} />}
      <RecentSearches query={query} onSearch={setQuery}/>
    </div>
  );
};

export default App;
