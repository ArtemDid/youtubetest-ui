import React, { useState, useEffect } from 'react';

const VideoDetail: React.FC<{ videoId: string }> = ({ videoId }) => {
  const [videoDetails, setVideoDetails] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideoDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/video/${videoId}`);
        const res = await response.json();
        setVideoDetails(res.result);
      } catch (err) {
        setError('Failed to fetch video details.');
      } finally {
        setLoading(false);
      }
    };

    fetchVideoDetails();
  }, [videoId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  if (!videoDetails) return <p>No video details available.</p>;

  return (
    <div className="p-4">
      <h2 className="font-semibold text-2xl">{videoDetails.title}</h2>
      <p>{videoDetails.description}</p>
      <img src={videoDetails.thumbnailUrl} alt={videoDetails.title} className="w-full my-4"/>
      <div className="mt-4">
        <iframe
          width="100%"
          height="400"
          src={`https://www.youtube.com/embed/${videoId}`}
          title={videoDetails.title}
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
      <div>
        <p>Published: {new Date(videoDetails.publishedAt).toLocaleDateString()}</p>
        <p>Views: {videoDetails.viewCount}</p>
        <p>Likes: {videoDetails.likeCount}</p>
        <p>Comments: {videoDetails.commentCount}</p>
      </div>
    </div>
  );
};

export default VideoDetail;
