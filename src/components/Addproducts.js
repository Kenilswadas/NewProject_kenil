import { React, useEffect, useState } from "react";
import { db } from "../Firebase";
import "../components/Addproducts.css";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
} from "@firebase/firestore";
import { v4 as uuidv4 } from "uuid";
function Addproducts() {
  const [ProductName, setProductName] = useState("");
  const [ProductPrice, setProductPrice] = useState("");
  const [Productcolor, setProductcolor] = useState("");
  const [Product, setProduct] = useState([]);

  useEffect(() => {
    productSnapshot();
  }, []);
  const productSnapshot = async () => {
    const Productdata = collection(db, "Products");
    const Products = onSnapshot(Productdata, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProduct(data);
    });
    return Products;
  };
  const addproduct = (e) => {
    e.preventDefault();
    try {
      addDoc(collection(db, "Products"), {
        id: uuidv4(),
        Product_Name: ProductName,
        Product_Price: ProductPrice,
        Product_color: Productcolor,
      });
      alert("Product added .");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="main">
      <form className="form" action="">
        <label htmlFor="name">Product Name :</label>
        <input
          className="input"
          type="text"
          placeholder="name"
          onChange={(e) => setProductName(e.target.value)}
        />
        <label htmlFor="Price">Price :</label>
        <input
          className="input"
          type="text"
          placeholder="price"
          onChange={(e) => setProductPrice(e.target.value)}
        />
        <label htmlFor="">color :</label>
        <input
          className="input"
          type="text"
          placeholder="color"
          onChange={(e) => setProductcolor(e.target.value)}
        />
        <button className="button" onClick={addproduct}>
          Add Item
        </button>
        <div className="mainoutputdiv">
          {Product.map((e) => (
            <div className="card">
              <table>
                <th>{["Name : " + e.Product_Name]}</th>
              </table>
              <table>
                <tr>
                  <td>{["price : " + e.Product_Price]}</td>
                </tr>
                <tr>
                  <td>{["color : " + e.Product_color]}</td>
                </tr>
              </table>
            </div>
          ))}
        </div>
      </form>
    </div>
  );
}

export default Addproducts;
