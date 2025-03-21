import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

function SavedQuotes({ token, refresh }) {
  const [quotes, setQuotes] = useState([]); 
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchSavedQuotes = useCallback(async () => {
    if (!token) {
      setMessage({ text: 'Please login first!', type: 'error' });
      setQuotes([]); 
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/quotes`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const quotesData = Array.isArray(response.data.data) ? response.data.data : [];
      setQuotes(quotesData);
      setMessage(quotesData.length === 0 ? { text: 'No saved quotes yet.', type: 'success' } : '');
    } catch (error) {
      setMessage({ text: error.response?.data.message || 'Failed to load quotes', type: 'error' });
      setQuotes([]); 
    }
    setLoading(false);
  }, [token]); 

  const deleteQuote = async (id) => {
    if (!token) {
      setMessage({ text: 'Please login first!', type: 'error' });
      return;
    }
    setLoading(true);
    try {
      await axios.delete(`${API_BASE_URL}/quotes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage({ text: 'Quote deleted!', type: 'success' });
      fetchSavedQuotes(); 
    } catch (error) {
      setMessage({ text: error.response?.data.message || 'Failed to delete quote', type: 'error' });
    }
    setLoading(false);
  };

  useEffect(() => {
    if (token) fetchSavedQuotes();
  }, [token, refresh, fetchSavedQuotes]); 

  return (
    <div className="card">
      <h2>Saved Quotes</h2>
      <button onClick={() => fetchSavedQuotes()} disabled={loading}>
        {loading ? 'Refreshing...' : 'Refresh Saved Quotes'}
      </button>
      <ul className="quote-list">
        {quotes.length > 0 ? (
          quotes.map((quote) => (
            <li key={quote.id} className="quote-item">
              "{quote.content}" — {quote.author}
              <button onClick={() => deleteQuote(quote.id)} disabled={loading}>
                Delete
              </button>
            </li>
          ))
        ) : (
          <li>No quotes to display</li>
        )}
      </ul>
      {message && <p className={`message ${message.type}`}>{message.text}</p>}
    </div>
  );
}

export default SavedQuotes;