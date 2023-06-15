import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
const UpdateProduct = () => {
    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [authorName, setAuthorName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const params = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        getProductDetails();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getProductDetails = async ()=>{
        console.log(params)
        let result = await fetch(`http://localhost:4000/book/${params.id}`,{
            headers:{
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        setName(result.name)
        setPrice(result.price)
        setAuthorName(result.authorName)
        setDescription(result.description)
    }
    const updateProduct = async () => {
        console.log(name, price, authorName, description)
        let result = await fetch(`http://localhost:4000/book/${params.id}`, {
            method: 'put',
            body: JSON.stringify({name, price, authorName, description}),
            headers: {
                'content-Type': 'application/json',
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        result = await result.json()
        if (result) {
            alert('Are you sure, you want to update this product?');
        }
        // console.log(result)
        navigate('/');
    }
    return (
        <div className="addProduct">
            <h1 className="heading">Update Book</h1>

            <input type='text' placeholder="Enter book name"
                value={name} onChange={(e) => { setName(e.target.value) }}
            />
            <input type="text" placeholder="Enter Price"
                value={price} onChange={(e) => { setPrice(e.target.value) }}
            />
            <input type="text" placeholder="Enter Author Name"
                value={authorName} onChange={(e) => { setAuthorName(e.target.value) }}
            />
            <input type="text" placeholder="Enter book description"
                value={description} onChange={(e) => { setDescription(e.target.value) }}
            />
            <button onClick={updateProduct} className="btn btn-padding">Update</button>
        </div>
    )
}

export default UpdateProduct;

