import React, { useState, useEffect } from "react";
import { db } from "../firebase"; // Import Firestore
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import "./AdminPage.css";

const AdminItems = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch items from Firestore
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "foundItems"));
        const fetchedItems = [];
        querySnapshot.forEach((doc) => {
          fetchedItems.push({ id: doc.id, ...doc.data() });
        });
        setItems(fetchedItems);
      } catch (error) {
        console.error("Error fetching items:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchItems();
  }, []);

  // Remove item from Firestore
  const handleRemoveItem = async (itemId) => {
    try {
      await deleteDoc(doc(db, "foundItems", itemId));
      setItems(items.filter((item) => item.id !== itemId)); // Update state after removal
      alert("Item removed successfully!");
    } catch (error) {
      console.error("Error removing item:", error);
      alert("Failed to remove the item. Please try again.");
    }
  };

  if (isLoading) {
    return <p>Loading items...</p>;
  }

  return (
    <div className="admin-page">
      <h2>Listed Founded Items</h2>
      <table className="items-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Item Name</th>
            <th>Color</th>
            <th>Brand</th>
            <th>Found Place</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>
                <img src={item.imageUrl} alt={item.itemName} width="50" />
              </td>
              <td>{item.itemName}</td>
              <td>{item.color}</td>
              <td>{item.brand}</td>
              <td>{item.foundPlace}</td>
              <td>
                <button onClick={() => handleRemoveItem(item.id)} className="remove-btn">
                  Remove Item
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminItems;
