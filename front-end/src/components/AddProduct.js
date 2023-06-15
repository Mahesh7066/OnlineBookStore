import React from "react";
import { useNavigate } from "react-router-dom";
const AddProduct = () => {
    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [authorName, setAuthorName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [error, setError] = React.useState(false);
    const navigate = useNavigate();
    const addProduct = async () => {
        // checking invalid input fields
        if (!name || !price || !authorName || !description) {
            setError(true);
            return false;
        }

        console.log(name, price, authorName, description);
        const userID = JSON.parse(localStorage.getItem('user'))._id;
        console.log(userID)
        let result = await fetch('http://localhost:4000/add-book', {
            method: 'post',
            body: JSON.stringify({ name, price, authorName, description, userID }),
            headers: {
                "content-type": "application/json",
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })

        result = await result.json()
        if (result) {
            alert('Are you sure, you want to add this product?');
        }
        // console.log(result)
        navigate('/');

        // result = await result.json();
        // console.log(result)
    }
    return (
        <div className="addProduct">
            <h1 className="heading">Add a Book</h1>

            <input type='text' placeholder="Enter book name"
                value={name} onChange={(e) => { setName(e.target.value) }}
            />
            {error && !name && <span className="inputValid">*Enter valid name</span>}
            <input type="Number" placeholder="Enter Price"
                value={price} onChange={(e) => { setPrice(e.target.value) }}
            />
            {error && !price && <span className="inputValid">*Enter product price</span>}
            <input type="text" placeholder="Enter author name"
                value={authorName} onChange={(e) => { setAuthorName(e.target.value) }}
            />
            {error && !authorName && <span className="inputValid">*Enter Author name</span>}
            <input type="text" placeholder="Enter book description"
                value={description} onChange={(e) => { setDescription(e.target.value) }}
            />
            {error && !description && <span className="inputValid">*Enter description</span>}
            <button onClick={addProduct} className="btn btn-padding">Add Book</button>
        </div>
    )
}

export default AddProduct;

