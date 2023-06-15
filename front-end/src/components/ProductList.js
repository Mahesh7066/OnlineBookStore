import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
    const [books, setBooks] = useState([]);
    useEffect(() => {
        getProducts();
    }, [])

    const getProducts = async () => {
        let result = await fetch('http://localhost:4000/books',{
            headers:{
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        setBooks(result);
    }

    const deleteProduct = async (id) => {
        let result = await fetch(`http://localhost:4000/book/${id}`, {
            method: 'Delete',
            headers:{
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        result = await result.json();
        if (result) {
            alert('Are you sure, you want to delete this item ?');
            getProducts();
        }
    }

    const searchHandle = async (event) => {
        let key = event.target.value;
        if (key) {
            let result = await fetch(`http://localhost:4000/search/${key}`, {
                headers:{
                    authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
                
            })
            result = await result.json();
            if (result) {
                setBooks(result)
            }
        } else {
            getProducts()
        }

    }

    return (
        <div className="products product-list">
            <h1>Book List</h1>
            <input className="product-search-box" type='text' placeholder="Search Book"
                onChange={searchHandle}
            />

            <ul>
                <li className="li-sno">S. No. </li>
                <li className="listItem">Book Name</li>
                <li className="listItem_price" >Price</li>
                <li className="listItem" >Author Name</li>
                <li className="item_description" >Book Description</li>
                <li className="btn_op" >Operation</li>
            </ul>

            {
                books.length > 0 ? books.map((item, index) =>
                    <ul>
                        <li className="li-sno">{index + 1}</li>
                        <li className="listItem" >{item.name}</li>
                        <li className="listItem_price price_color"><span>&#x20B9;</span> {item.price}</li>
                        <li className="listItem" >{item.authorName}</li>
                        <li className="item_description" >{item.description}</li>
                        <li className="btn_op" >
                            <button onClick={() => deleteProduct(item._id)}>Delete</button>
                            <Link className="updateLink" to={`/update/${item._id}`}>Update</Link>
                        </li>
                    </ul>
                )
                    : <h1>No result found</h1>
            }
        </div>
    )
}

export default ProductList;