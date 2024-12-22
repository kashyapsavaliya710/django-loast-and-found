import React, { useState, useEffect } from "react";
import { db, storage } from "../firebase"; // Import Firestore and Storage
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import "./AdminPage.css";
import ItemsTable from './ItemsTable';

const AdminPage = () => {
    const navigate = useNavigate();
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [formData, setFormData] = useState({
      image: null,
      itemName: "",
      color: "",
      brand: "",
      foundPlace: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [adminCredentials, setAdminCredentials] = useState({
      username: "",
      password: "",
    });
    const [errorMessage, setErrorMessage] = useState("");
  
    useEffect(() => {
      const isAdminLoggedIn = localStorage.getItem("isAdminLoggedIn");
      if (isAdminLoggedIn) {
        setIsLoggedIn(true);
      }
    }, []);
  
    const handleLogin = (e) => {
      e.preventDefault();
      if (adminCredentials.username === "admin" && adminCredentials.password === "admin123") {
        localStorage.setItem("isAdminLoggedIn", "true");
        setIsLoggedIn(true);
      } else {
        setErrorMessage("Invalid credentials. Please try again.");
      }
    };
  
    const handleFormToggle = () => {
      setIsFormVisible(!isFormVisible);
    };
  
    const handleInputChange = (e) => {
      const { name, value, files } = e.target;
      setFormData({
        ...formData,
        [name]: files ? files[0] : value,
      });
    };
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
          const imageRef = ref(storage, `items/${Date.now()}_${formData.image.name}`);
          await uploadBytes(imageRef, formData.image);
          const imageUrl = await getDownloadURL(imageRef); // Get the image URL
      
          await addDoc(collection(db, "foundItems"), {
            itemName: formData.itemName,
            color: formData.color,
            brand: formData.brand,
            foundPlace: formData.foundPlace,
            imageUrl, // Save the image URL instead of the File object
            timestamp: new Date(), // Save a timestamp
          });
      
          alert("Item uploaded successfully!");
          // Reset the form data
          setFormData({
            image: null,
            itemName: "",
            color: "",
            brand: "",
            foundPlace: "",
          });
          setIsFormVisible(false);
        } catch (error) {
          console.error("Error uploading item:", error);
          alert("Failed to upload the item. Please try again.");
        } finally {
          setIsSubmitting(false);
        }
      };
      
  
  
  
    if (!isLoggedIn) {
      return (
        <div className="admin-login">
          <h1>Admin Login</h1>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Username:</label>
              <input
                type="text"
                name="username"
                value={adminCredentials.username}
                onChange={(e) => setAdminCredentials({ ...adminCredentials, username: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                name="password"
                value={adminCredentials.password}
                onChange={(e) => setAdminCredentials({ ...adminCredentials, password: e.target.value })}
                required
              />
            </div>
            {errorMessage && <p className="error">{errorMessage}</p>}
            <button type="submit">Login</button>
          </form>
        </div>
      );
    }
  
    return (
      <div className="admin-page">
        <h2>Admin - Lost and Found</h2>
        <button className="upload-btn" onClick={handleFormToggle}>
          Upload Item
        </button>
       
  
        {isFormVisible && (
          <div className="modal-overlay">
            <div className="modal-content">
              <button className="close-btn" onClick={handleFormToggle}>
                &times;
              </button>
              <form className="upload-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="image">Image:</label>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="itemName">Item Name:</label>
                  <input
                    type="text"
                    id="itemName"
                    name="itemName"
                    value={formData.itemName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="color">Color:</label>
                  <input
                    type="text"
                    id="color"
                    name="color"
                    value={formData.color}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="brand">Brand:</label>
                  <input
                    type="text"
                    id="brand"
                    name="brand"
                    value={formData.brand}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="foundPlace">Found Place:</label>
                  <input
                    type="text"
                    id="foundPlace"
                    name="foundPlace"
                    value={formData.foundPlace}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <button className="submit-btn" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </form>
            </div>
          </div>
        )}
        <ItemsTable />
      </div>
    );
  };
  
  export default AdminPage;
  