import React, { useState } from 'react';
import axios from 'axios';
import { Analytics } from './Analytics.jsx';

export const InputForm = () => {
  const [input, setInput] = useState({ longUrl: "", urlCode: "" });
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showAnalytics, setShowAnalytics] = useState(false);

  const baseUrl = window.location.origin;
  const serverBaseUrl = import.meta.env.VITE_APP_URL;

  const handelInputChange = (e) => {
    const { id, value } = e.target;
    setInput({ ...input, [id]: value });
    setError(false);
  };

  const handelEnter = (e) => {
    if (e.key === "Enter") handelSubmit();
  };

  const handelSubmit = () => {
    if (!input.longUrl) {
      setError(true);
      return;
    }
    setIsLoading(true);

    axios.post(`${serverBaseUrl}/api/shorten`, input)
      .then(res => {
        if (res.status === 200 || res.status === 201) {
          let shortUrl = res.data.shortUrl;
          setUrl(shortUrl);
        }
        setIsLoading(false);
      })
      .catch(error => {
        let errorMessage = error.response ? error.response.data.error : "An error occurred";
        setUrl(errorMessage);
        setIsLoading(false);
      });
  };

  if (showAnalytics) {
    return <Analytics onBack={() => setShowAnalytics(false)} />;
  }

  return (
    <div>
      <p className="helper-text">Convert long URLs into short versions in a single click :</p>

      <input
        id="longUrl"
        type="url"
        value={input.longUrl}
        placeholder='  Enter long URL'
        onChange={handelInputChange}
        onKeyDown={handelEnter}
        autoFocus
      />
      {error && <p style={{ color: "red", margin: "0 0 8px 0" }}>Please, enter URL.</p>}

      <p className="helper-text">Create personalized and memorable links for your URLs [Optional]:</p>
      <div style={{ display: "flex", gap: "8px", marginBottom: "10px" }}>
        <span style={{
          padding: "16px 12px",
          backgroundColor: "#f0f0f0",
          borderRadius: 8,
          fontSize: "1em",
          width: "100%",
          marginTop: 5,
          marginBottom: 10,
          maxWidth: "200px",
          color: "#5a4ff3"
        }}>{baseUrl}/</span>
        <input
          id="urlCode"
          type="text"
          value={input.urlCode}
          placeholder='  Enter custom code'
          onChange={handelInputChange}
          onKeyDown={handelEnter}
          style={{ flexGrow: 1 }}
        />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "0px"
        }}
      >
        <button
          style={{ margin: "0 6px 0 0" }}
          onClick={handelSubmit}
          disabled={isLoading}
        >
          {isLoading ? "Shortening..." : "Shorten URL"}
        </button>
        <button
          style={{ margin: "0 14px 0 2px" }}
          onClick={() => setShowAnalytics(true)}
        >
          Check Analytics
        </button>
      </div>

      {url && (
        <div className="short-url-box">
          <input value={url} readOnly />
        </div>
      )}
    </div>
  );
};
