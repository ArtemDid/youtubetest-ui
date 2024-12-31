import React, { useState, useEffect } from 'react';

const VideoSearchResults: React.FC<{query:string, setSelectedVideoId: (selectedVideoId: string) => void}> = ({query, setSelectedVideoId}) => {
  const [videos, setVideos] = useState<any[]>([]);
  const [nextPageToken, setNextPageToken] = useState<string | null>(null);
  const [prevPageToken, setPrevPageToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchVideos = async (query: string, pageToken?: string) => {
    setLoading(true);
    setError(null);

    const params = new URLSearchParams();
    params.append("q", query);
    if (pageToken) {
      params.append("pageToken", pageToken);
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/search?${params.toString()}`);
      const res = await response.json();

      const { results, nextPageToken, prevPageToken } = res;

      setVideos(results);
      setNextPageToken(nextPageToken);
      setPrevPageToken(prevPageToken);
    } catch (err) {
      setError('Failed to fetch videos.');
    } finally {
      setLoading(false);
    }
  };

  const handlePagination = (pageToken: string | null) => {
    if (pageToken) {
      fetchVideos(query, pageToken);
    }
  };

  useEffect(()=>{
    fetchVideos(query);
  }, [query])

  return (
    <div className="p-4">
      <div>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.map((video) => (
          <div key={video.videoId} className="border rounded overflow-hidden shadow-lg cursor-pointer" onClick={()=>setSelectedVideoId(video.videoId)}>
            <img
              src={video.thumbnailUrl}
              alt={video.title}
              className="w-full"
            />
            <div className="p-4">
              <h2 className="font-semibold">{video.title}</h2>
              <p>{video.description}</p>
              <p className="text-sm text-gray-500">
                Published on: {new Date(video.published_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-4">
        {prevPageToken && (
          <button onClick={() => handlePagination(prevPageToken)} className="bg-gray-500 text-white px-4 py-2 rounded">
            Previous
          </button>
        )}
        {nextPageToken && (
          <button onClick={() => handlePagination(nextPageToken)} className="bg-blue-500 text-white px-4 py-2 rounded">
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default VideoSearchResults;
