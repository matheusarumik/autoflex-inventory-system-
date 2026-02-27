import React, { useState } from 'react';
import RawMaterials from './RawMaterials';
import Products from './Products';
import Dashboard from './Dashboard';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('materials');

  return (
    <div className="App">
      <header className="App-header">
        <h1>🛠️ Autoflex Factory Control</h1>
        <nav>
          <button
            className={`nav-btn ${activeTab === 'materials' ? 'active' : ''}`}
            onClick={() => setActiveTab('materials')}
          >
            📦 Inventory
          </button>
          <button
            className={`nav-btn ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            🔨 Products
          </button>
          <button
            className={`nav-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            📈 Dashboard
          </button>
        </nav>
      </header>

      <main>
        {activeTab === 'materials' && <RawMaterials />}
        {activeTab === 'products' && <Products />}
        {activeTab === 'dashboard' && <Dashboard />}
      </main>
    </div>
  );
}

export default App;