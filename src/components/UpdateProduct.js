import React, { useState,useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';

const UpdateProduct = () => {

    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [company, setCompany] = React.useState('');
    const [error, setError] = React.useState(false);

    const navigate = useNavigate();
    const params = useParams();

    useEffect(()=>{
        //console.warn(params);
        getProductDetails();
    },[]);


    const getProductDetails = async () => {
        let result = await fetch("http://localhost:5000/product/"+params.id, {
            headers:{
                authorization:"bearer " +JSON.parse(localStorage.getItem('token'))
            }
        });
        result = await result.json();
       
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);
    };

    const updateProduct = async()=>{

        if(!name || !price || !category || !company)
        {
            setError(true);
            return false;
        }
        
        let result = await fetch("http://localhost:5000/product/"+params.id, {
            method: "put",
            body: JSON.stringify({ name, price, category, company}),
            headers: {
                'Content-Type': 'application/json',
                authorization:"bearer " +JSON.parse(localStorage.getItem('token'))
            }
        });

        console.warn(name,price,category,company,company);
        result = await result.json();
        console.warn(result);
        if(result){
            alert("Product Updated Succesfully");
            navigate('/');
        }
    };

    return (
        <div className="register">
            <h1>Update Product</h1>
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

            <button className="appbutton" type="button" onClick={updateProduct}>update Product</button>
        </div>
    )
}

export default UpdateProduct;