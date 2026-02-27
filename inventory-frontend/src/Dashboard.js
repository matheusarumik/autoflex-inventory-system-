import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {
  const [suggestions, setSuggestions] = useState([]);

  const load = async () => {
    const res = await axios.get('http://localhost:8081/api/production/suggestion');
    setSuggestions(res.data);
  };

  useEffect(() => { load(); }, []);

  const handleProduce = async (name, qty) => {
    if (window.confirm(`Execute production of ${qty} units of ${name}?`)) {
      try {
        await axios.post('http://localhost:8081/api/production/execute', { productName: name, quantity: qty });
        alert("✅ Stock updated!");
        load();
      } catch (e) { alert("Insufficient stock error"); }
    }
  };

  return (
    <div className="fade-in">
      <h2>📈 Production Intelligence</h2>
      <div className="suggestion-grid">
        {suggestions.map((item, i) => (
          <div key={i} className="suggestion-card">
            <h3>{item.productName}</h3>
            <p>Capacity: <strong>{item.quantityToProduce}</strong></p>
            <p className="profit-text">Total Profit: ${item.totalValue.toFixed(2)}</p>
            <button onClick={() => handleProduce(item.productName, item.quantityToProduce)} className="btn-save" style={{width: '100%'}}>Produce Now</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;