import React from "react";
import { useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom';

const SignUP = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/')
        }
    })
    const collectData = async ()=> {
        console.log(name, email, password);
        let result = await fetch('http://localhost:4000/register', {
            method: 'post',
            body: JSON.stringify({ name, email, password }),
            headers: {
                'content-Type': 'application/json'
            },
        })
        result = await result.json();
        console.log(result);
        localStorage.setItem("user", JSON.stringify(result.result));
        localStorage.setItem("token", JSON.stringify(result.auth));
        if (result) {
            navigate('/');
        }
    }

    return (
        <div className="sign_up">
            <h1 className="register">Register</h1>

            <input className="inputBox" type="text"
                value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter name" />
            <input className="inputBox" type="text"
                value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <input className="inputBox" type="password"
                value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" />
            <button className="btn" onClick={collectData}
                type="button">Submit</button>
        </div>
    )
}

export default SignUP;
