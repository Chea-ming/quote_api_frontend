import React, { useState } from 'react';
import './App.css';
import Auth from './components/Auth';
import RandomQuote from './components/RandomQuote';
import SavedQuotes from './components/SavedQuotes';

function App() {
  const [token, setToken] = useState(null);
  const [refreshQuotes, setRefreshQuotes] = useState(false);

  const handleQuoteSaved = () => {
    setRefreshQuotes(!refreshQuotes); 
  };

  const handleLogout = () => {
    setToken(null); 
    setRefreshQuotes(false); 
  };

  return (
    <div className="app">
      <div className="header">
        <h1>Quote Management</h1>
        {token && (
          <button className="logout-btn" onClick={() => handleLogout()}>
            Logout
          </button>
        )}
      </div>
      <Auth setToken={setToken} />
      <RandomQuote token={token} onQuoteSaved={handleQuoteSaved} />
      <SavedQuotes token={token} refresh={refreshQuotes} />
    </div>
  );
}

export default App;