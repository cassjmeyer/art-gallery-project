import { useState, useEffect } from "react";

function ApiTest() {
  const [artwork, setArtwork] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.artic.edu/api/v1/artworks/27992")
      .then((response) => response.json())
      .then((data) => {
        setArtwork(data.data);
        setLoading(false);
        console.log("API Working! Got:", data.data.title);
      })
      .catch((error) => {
        console.error("API Error:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Testing API...</div>;

  return (
    <div>
      <h2>API Test Result:</h2>
      {artwork ? (
        <div>
          <p>
            <strong>Title:</strong> {artwork.title}
          </p>
          <p>
            <strong>Artist:</strong> {artwork.artist_display}
          </p>
          <p>
            <strong>API is working!!!</strong>
          </p>
        </div>
      ) : (
        <p>API test failed</p>
      )}
    </div>
  );
}

export default ApiTest;
