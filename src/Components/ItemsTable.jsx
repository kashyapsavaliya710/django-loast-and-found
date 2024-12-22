import React, { useState, useEffect } from "react";
import { db } from "../firebase"; // Import Firestore
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import "./ItemsTable.css";

const ItemsTable = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchItems();
  }, []);

  // Fetch items from Firestore
  const fetchItems = async () => {
    setIsLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "foundItems"));
      const itemsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setItems(itemsList);
    } catch (error) {
      console.error("Error fetching items:", error);
      alert("Failed to fetch items. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Remove item from Firestore
  const handleRemoveItem = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this item?");
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "foundItems", id));
      setItems(items.filter((item) => item.id !== id));
      alert("Item removed successfully!");
    } catch (error) {
      console.error("Error removing item:", error);
      alert("Failed to remove item. Please try again.");
    }
  };

  return (
    <div className="items-table">
      <h2>Uploaded Items</h2>
      {isLoading ? (
        <p>Loading items...</p>
      ) : items.length === 0 ? (
        <p>No items found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Item Name</th>
              <th>Color</th>
              <th>Brand</th>
              <th>Found Place</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>
                  <img src={item.imageUrl} alt={item.itemName} className="item-image" />
                </td>
                <td>{item.itemName}</td>
                <td>{item.color}</td>
                <td>{item.brand}</td>
                <td>{item.foundPlace}</td>
                <td>
                  <button className="remove-btn" onClick={() => handleRemoveItem(item.id)}>
                    Remove Item
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ItemsTable;
