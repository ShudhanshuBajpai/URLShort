import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function UrlRedirect() {
  const { urlCode } = useParams();
  const serverBaseUrl = import.meta.env.VITE_APP_URL;

  const redirect = () => {
    let url = (serverBaseUrl + `/${urlCode}`);
    window.location.replace(url);
  };

  useEffect(() => {
    if (urlCode) {
      redirect();
    }
  }, [urlCode]);

  return (
    <div>
      <h3 style={{ margin: '3% 0% 2% 0%', fontSize: '1.5em' }}>
        Redirecting...
      </h3>
    </div>
  );
}
