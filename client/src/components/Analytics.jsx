import React, { useState } from 'react';
import axios from 'axios';

export const Analytics = ({ onBack }) => {
  const [shortUrl, setShortUrl] = useState("");
  const [hitCount, setHitCount] = useState(null);
  const [error, setError] = useState("");
  const serverBaseUrl = import.meta.env.VITE_APP_URL;

  const handleSubmit = async () => {
    try {
      setError("");
      setHitCount(null);

      if (!shortUrl.trim()) {
        setError("Please enter a short URL.");
        return;
      }
      const urlCode = shortUrl.split("/").pop();

      const res = await axios.get(`${serverBaseUrl}/api/analytics/${urlCode}`);
      setHitCount(res.data.hitCount);
    } catch (err) {
      setError("Failed to fetch analytics.");
    }
  };

  return (
    <div>
      <p className="helper-text">Enter your short URL to check analytics:</p>
      <input
        type="text"
        value={shortUrl}
        onChange={(e) => setShortUrl(e.target.value)}
        placeholder=" Enter short URL"
      />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "0px"
        }}
      >
        <button
          style={{ margin: "0 14px 0 2px" }}
          onClick={onBack}
        >
          ← Back
        </button>
        <button
          style={{ margin: "0 6px 0 0" }}
          onClick={handleSubmit}
        >
          Get Hit Count
        </button>
      </div>
    
      {error && <p style={{ color: "red" }}>{error}</p>}
      {hitCount !== null && (
        <p style={{ marginTop: "10px" }}>
          Total Visits: <strong>{hitCount}</strong>
        </p>
      )}
    </div>
  );
};
