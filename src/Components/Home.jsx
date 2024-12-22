import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { db } from '../firebase'; // Firebase instance
import { collection, getDocs } from 'firebase/firestore'; // Firestore methods
import './Home.css';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [productsData, setProductsData] = useState([]);

  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'foundItems'));
      const products = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProductsData(products);
      setFilteredProducts(products); 
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts(); 
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = productsData.filter((product) =>
      product.itemName.toLowerCase().includes(value) ||
      product.foundPlace.toLowerCase().includes(value) ||
      product.timestamp.toDate().toLocaleDateString().includes(value)
    );
    setFilteredProducts(filtered);
  };

  return (
    <div className="home-container">
      <input
      style={{borderRadius:'20px'}}
        type="text"
        placeholder="Search by name, details, or date..."
        value={searchTerm}
        onChange={handleSearch}
        className="search-bar"
      />
      <div className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard data-aos="fade-up" key={product.id} product={product} />
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  );
};

export default Home;
