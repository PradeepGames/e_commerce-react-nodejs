import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const ProductList = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        let result = await fetch("http://localhost:5000/product",{
            headers:{
                authorization:"bearer " +JSON.parse(localStorage.getItem('token'))
            }
        });
        result = await result.json();
        setProducts(result);
    }

    console.log("products", products);

    let deleteProduct = async (id) => {
        console.warn(id);
        let result = await fetch('http://localhost:5000/product/' + id,
            {
                method: "Delete",
                headers:{
                    authorization:"bearer " +JSON.parse(localStorage.getItem('token'))
                }
            });
        result = await result.json();
        console.warn(result);
        if (result) {
            alert("Record has deleted");
            getProducts();
        }
    }

    const searchHandle = async (event) => {

        let key = event.target.value;
        if (key == "") {
            getProducts();
        }
        else {
            let result = await fetch("http://localhost:5000/search/" + key,{
                headers:{
                    authorization:"bearer " +JSON.parse(localStorage.getItem('token'))
                }
            });
            result = await result.json();
            setProducts(result);
        }
    }

    return (
        <div className="product-list">
            <h3>Product List</h3>
            <input type="text" className="search-Product-Box" placeholder="Search Product"
                onChange={searchHandle} ></input>

            <ul>
                <li>S. No</li>
                <li>Name</li>
                <li>Price</li>
                <li>category</li>
                <li>company</li>
                <li>Operation</li>
            </ul>
            {
               products.length >0 ? products.map((item, index) =>
                    <ul>
                        <li>{index + 1}</li>
                        <li>{item.name}</li>
                        <li>{item.price}</li>
                        <li>{item.category}</li>
                        <li>{item.company}</li>
                        <li>
                            <button onClick={() => deleteProduct(item._id)}>Delete</ button>
                            <Link to={"/update/" + item._id}>Update</Link>
                        </li>
                    </ul>
                ):
                <h1>No Product Found</h1>
            }
        </div>
    )
}

export default ProductList;

