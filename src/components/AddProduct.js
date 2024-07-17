import React, { useState,useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {

    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [company, setCompany] = React.useState('');
    const [error, setError] = React.useState(false);

    const navigate = useNavigate();

    const addProduct = async()=>{

        if(!name || !price || !category || !company)
        {
            setError(true);
            return false;
        }
        
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        let result = await fetch("http://localhost:5000/add-product", {
            method: "post",
            body: JSON.stringify({ name, price, category, userId, company}),
            headers: {
                'Content-Type': 'application/json',
                authorization:"bearer " +JSON.parse(localStorage.getItem('token'))
            },
        });
        console.warn(name,price,category,company,company);
        result = await result.json();
        console.warn(result);
        if(result.name){
            alert("Data added Succesfully");
            navigate('/');
        }
    };

    return (
        <div className="register">
            <h1>Add Product</h1>
            <input className="inputBox" type="text"  value={name}
                onChange={(e) => setName(e.target.value)} placeholder="Enter Name" />
              { error && !name && <span className="invalid-input">Enter valid Name</span>}

            <input className="inputBox" type="text" value={price}
                onChange={(e) => setPrice(e.target.value)}  placeholder="Enter price" />
            { error && !price && <span className="invalid-input">Enter valid price</span>}

            <input className="inputBox" type="text" value={category}
                onChange={(e) => setCategory(e.target.value)} placeholder="Enter category" />
            { error && !category && <span className="invalid-input">Enter valid category</span>}

            <input className="inputBox" type="text" value={company}
                onChange={(e) => setCompany(e.target.value)} placeholder="Enter company" />
            { error && !company && <span className="invalid-input">Enter valid company</span>}

            <button className="appbutton" type="button" onClick={addProduct}>Add Product</button>
        </div>
    )
}

export default AddProduct;