import React, { useState, useEffect } from 'react';
import axios from 'axios';

function RawMaterials() {
  const [materials, setMaterials] = useState([]);
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');

  // 1. Função para buscar dados do Back-end (Java)
  const loadMaterials = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/raw-materials');
      setMaterials(response.data);
    } catch (error) {
      console.error("Erro ao carregar materiais. O Java está ligado?", error);
    }
  };

  // 2. Roda assim que a página abre
  useEffect(() => {
    loadMaterials();
  }, []);

  // 3. Função para salvar nova matéria-prima
  const handleSave = async (e) => {
    e.preventDefault();
    if (!name || !quantity) return alert("Fill all fields!");

    try {
      await axios.post('http://localhost:8081/api/raw-materials', {
        name: name,
        stockQuantity: parseFloat(quantity)
      });
      setName('');
      setQuantity('');
      loadMaterials(); // Recarrega a lista após salvar
    } catch (error) {
      alert("Error saving material");
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>📦 Raw Materials Stock (RF006)</h2>

      <form onSubmit={handleSave} style={{ marginBottom: '30px', border: '1px solid #ddd', padding: '15px', borderRadius: '8px' }}>
        <input
          placeholder="Material Name"
          value={name}
          onChange={e => setName(e.target.value)}
          style={{ marginRight: '10px', padding: '8px' }}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={e => setQuantity(e.target.value)}
          style={{ marginRight: '10px', padding: '8px' }}
        />
        <button type="submit" style={{ padding: '8px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Save Material
        </button>
      </form>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f4f4f4' }}>
            <th style={{ border: '1px solid #ddd', padding: '12px' }}>ID</th>
            <th style={{ border: '1px solid #ddd', padding: '12px' }}>Name</th>
            <th style={{ border: '1px solid #ddd', padding: '12px' }}>Stock</th>
          </tr>
        </thead>
        <tbody>
          {materials.map(m => (
            <tr key={m.id}>
              <td style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'center' }}>{m.id}</td>
              <td style={{ border: '1px solid #ddd', padding: '12px' }}>{m.name}</td>
              <td style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'center' }}>{m.stockQuantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RawMaterials;