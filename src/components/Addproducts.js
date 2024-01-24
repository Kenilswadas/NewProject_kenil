import { React, useEffect, useState } from "react";
import { db } from "../Firebase";
import {
  doc,
  updateDoc,
  deleteDoc,
  deleteField,
  setDoc,
} from "firebase/firestore";
import "../components/Addproducts.css";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  addDoc,
  collection,
  getDocs,
  // doc,
  // getDoc,
  // getDocs,
  onSnapshot,
} from "@firebase/firestore";
import { v4 as uuidv4 } from "uuid";
function Addproducts() {
  const [ProductName, setProductName] = useState("");
  const [ProductPrice, setProductPrice] = useState("");
  const [Productcolor, setProductcolor] = useState("");
  const [Product, setProduct] = useState([]);
  const [openUpadte, setOpenUpdate] = useState(false);
  const [newProductName, setNewProductName] = useState("");
  const [newProductPrice, setNewProductPrice] = useState("");
  const [newProductcolor, setNewProductcolor] = useState("");
  const [indexId, setindexId] = useState(null)

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
        uid: uuidv4(),
        Product_Name: ProductName,
        Product_Price: ProductPrice,
        Product_color: Productcolor,
      });
      alert("Product added .");
    } catch (error) {
      console.log(error.message);
    }
  };
  //delete function
  const DeleteProducts = async (indexId) => {
    try {
      await deleteDoc(doc(db, "Products", indexId));
      alert("delete....");
    } catch (error) {
      console.log(error.message);
    }
  };
  //update function
  const updateProducts = async (indexId) => {
    console.log(indexId);
    setindexId(indexId);
    setOpenUpdate(true);
    // setProductName("")
    // setProductPrice("")
    // setProductcolor("")
    
  };
  const FinalUpadte = ()=>{
setDoc(doc(db, "Products",indexId), {
      Product_Name: newProductName,
      Product_Price: newProductPrice,
      Product_color: newProductcolor,
    });
  }
  //open form on click of update btn

  //table styles...........
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "tomato",
      color: theme.palette.common.white,
      textAlign: "center", // Center text align for header cells
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      color: "red",
      textAlign: "center", // Center text align for body cells
      borderBottom: `1px solid black`, // Add border to separate rows
    },
  }));
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  }));

  return (
    <div className="main">
      <form className="form" action="">
        <label htmlFor="name">Product Name :</label>
        <input
          className="input"
          type="text"
          placeholder="name"
          // value={Product.ProductName}
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
          {/* normal table */}
          {/* <table>
            <tr>
              <th>jlfjsdlkhflk</th>
              <th>jlfjsdlkhflk</th>
              <th>jlfjsdlkhflk</th>
            </tr>
            {Product.map((e) => (
              <tr>
                <td>{["Name : " + e.Product_Name]}</td>
                <td>{["price : " + e.Product_Price]}</td>
                <td>{["color : " + e.Product_color]}</td>
              </tr>
            ))}
          </table> */}
          {/* material ui */}
          <TableContainer component={Paper}>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Product Name</StyledTableCell>
                  <StyledTableCell>Product Price</StyledTableCell>
                  <StyledTableCell>Product Color</StyledTableCell>
                  <StyledTableCell>Upadte collection</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Product.map((e, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell scope="row">
                      {e.Product_Name}
                    </StyledTableCell>
                    <StyledTableCell>{e.Product_Price}</StyledTableCell>
                    <StyledTableCell>{e.Product_color}</StyledTableCell>
                    <StyledTableCell>
                      <button
                        key={e.id}
                        type="button"
                        onClick={() => DeleteProducts(e.id)}
                      >
                        Delete
                      </button>
                      <button
                        key={e.id}
                        type="button"
                        onClick={() => updateProducts(e.id)}
                      >
                        update
                      </button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        {openUpadte ? (
          <div>
            <label htmlFor="Product_Name">Product Name : </label>
            <input
              type="text"
              placeholder="update name"
              value={ProductName}
              onChange={(e) => setNewProductName(e.target.value)}
            />
            <label htmlFor="Product_Name">Product Price : </label>
            <input
              type="text"
              placeholder="update Price"
              // value={ProductPrice}
              onChange={(e) => setNewProductPrice(e.target.value)}
            />
            <label htmlFor="Product_color">Product color : </label>
            <input
              type="text"
              placeholder="update color"
              // value={Productcolor}
              onChange={(e) => setNewProductcolor(e.target.value)}
            />
            <button type="button" onClick={()=>FinalUpadte()}>update</button>
          </div>
        ) : null}
      </form>
    </div>
  );
}

export default Addproducts;
