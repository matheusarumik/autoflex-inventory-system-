import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Products() {
  const [products, setProducts] = useState([]);
  const [rawMaterials, setRawMaterials] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedMaterialId, setSelectedMaterialId] = useState('');
  const [requiredQuantity, setRequiredQuantity] = useState('');
  const [recipeCart, setRecipeCart] = useState([]);

  useEffect(() => {
    loadProducts();
    loadRawMaterials();
  }, []);

  const loadProducts = async () => {
    const res = await axios.get('http://localhost:8081/api/products');
    setProducts(res.data);
  };

  const loadRawMaterials = async () => {
    const res = await axios.get('http://localhost:8081/api/raw-materials');
    setRawMaterials(res.data);
  };

  const addToCart = () => {
    if (!selectedMaterialId || !requiredQuantity) return alert("Select material and quantity");
    const material = rawMaterials.find(m => m.id === parseInt(selectedMaterialId));
    setRecipeCart([...recipeCart, { materialId: material.id, name: material.name, quantity: parseFloat(requiredQuantity) }]);
    setSelectedMaterialId('');
    setRequiredQuantity('');
  };

  const handleSaveBulkRecipe = async () => {
    try {
      await axios.post('http://localhost:8081/api/production/recipe/bulk', {
        productId: selectedProductId,
        materials: recipeCart
      });
      alert("✅ Full recipe saved successfully!");
      setRecipeCart([]);
      setSelectedProductId(null);
      loadProducts();
    } catch (e) { alert("Error saving recipe"); }
  };

  return (
    <div className="fade-in">
      <h2>🔨 Products & Recipes</h2>
      <form style={{marginBottom: '20px'}} onSubmit={(e) => { e.preventDefault(); axios.post('http://localhost:8081/api/products', { name, price: parseFloat(price) }).then(() => {setName(''); setPrice(''); loadProducts();}); }}>
        <input placeholder="Product Name" value={name} onChange={e => setName(e.target.value)} />
        <input type="number" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} />
        <button type="submit" className="btn-save">Create Product</button>
      </form>

      {selectedProductId && (
        <div style={{ padding: '20px', background: '#f0f7ff', borderRadius: '10px', marginBottom: '20px', border: '1px solid #007bff' }}>
          <h3>Build Recipe for Product ID: {selectedProductId}</h3>
          <select value={selectedMaterialId} onChange={e => setSelectedMaterialId(e.target.value)}>
            <option value="">Select Material...</option>
            {rawMaterials.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
          </select>
          <input type="number" placeholder="Qty" value={requiredQuantity} onChange={e => setRequiredQuantity(e.target.value)} />
          <button type="button" onClick={addToCart} className="nav-btn" style={{backgroundColor: '#17a2b8', marginLeft: '10px'}}>+ Add to List</button>

          {recipeCart.length > 0 && (
            <div style={{marginTop: '15px'}}>
              <ul>{recipeCart.map((item, i) => <li key={i}>{item.name} - {item.quantity} units</li>)}</ul>
              <button onClick={handleSaveBulkRecipe} className="btn-save" style={{backgroundColor: '#28a745'}}>Save All Items</button>
            </div>
          )}
        </div>
      )}

      <table>
        <thead><tr><th>ID</th><th>Name</th><th>Price</th><th>Actions</th></tr></thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>${p.price.toFixed(2)}</td>
              <td><button onClick={() => setSelectedProductId(p.id)} className="nav-btn">Add Materials</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Products;