import React, { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

function RandomQuote({ token }) {
  const [quote, setQuote] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchRandomQuote = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/quotes/random`);
      setQuote(response.data);
      setMessage('');
    } catch (error) {
      setMessage({ text: error.response?.data.message || 'Failed to fetch quote', type: 'error' });
      setQuote(null);
    }
    setLoading(false);
  };

  const saveQuote = async () => {
    if (!token) {
      setMessage({ text: 'Please login first!', type: 'error' });
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API_BASE_URL}/quotes`, quote, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage({ text: 'Quote saved!', type: 'success' });
    } catch (error) {
      setMessage({ text: error.response?.data.message || 'Failed to save quote', type: 'error' });
    }
    setLoading(false);
  };

  return (
    <div className="card">
      <h2>Random Quote</h2>
      <button onClick={fetchRandomQuote} disabled={loading}>
        {loading ? 'Fetching...' : 'Get Random Quote'}
      </button>
      {quote && (
        <div>
          <p className="quote-display">"{quote.content}" — {quote.author}</p>
          <button onClick={saveQuote} disabled={loading}>
            {loading ? 'Saving...' : 'Save Quote'}
          </button>
        </div>
      )}
      {message && <p className={`message ${message.type}`}>{message.text}</p>}
    </div>
  );
}

export default RandomQuote;