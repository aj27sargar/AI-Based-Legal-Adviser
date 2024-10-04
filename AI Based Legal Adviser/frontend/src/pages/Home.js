import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';

function Home() {
    const [loggedInUser, setLoggedInUser] = useState('');
    const [products, setProducts] = useState('');
    const navigate = useNavigate();

    // Simple Navbar
    const Navbar = () => (
        <nav style={{ padding: '10px', background: '#333', color: '#fff', display: 'flex', justifyContent: 'space-between' }}>
            <div>
                <a href="/" style={{ color: '#fff', textDecoration: 'none', marginRight: '20px' }}>Home</a>
                
                <a href="/contact" style={{ color: '#fff', textDecoration: 'none', marginRight: '20px' }}>Contact</a>
                <a href="/blog" style={{ color: '#fff', textDecoration: 'none' }}>Blog</a>
            </div>
            <div>
                {loggedInUser ? (
                    <button onClick={handleLogout} style={{ background: 'red', color: 'white', padding: '5px 10px', border: 'none', borderRadius: '4px' }}>Logout</button>
                ) : (
                    <a href="/login" style={{ color: '#fff', textDecoration: 'none' }}>Login</a>
                )}
            </div>
        </nav>
    );

    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser'));

        // Adding chatbot scripts dynamically
        const script1 = document.createElement('script');
        script1.src = "https://cdn.botpress.cloud/webchat/v2.2/inject.js";
        script1.async = true;
        document.body.appendChild(script1);

        const script2 = document.createElement('script');
        script2.src = "https://files.bpcontent.cloud/2024/10/03/14/20241003143013-HTYKHCLK.js";
        script2.async = true;
        document.body.appendChild(script2);

        return () => {
            // Clean up scripts when component unmounts
            document.body.removeChild(script1);
            document.body.removeChild(script2);
        };
    }, []);

    const handleLogout = (e) => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        handleSuccess('User Logged out');
        setTimeout(() => {
            navigate('/login');
        }, 1000);
    };

    const fetchProducts = async () => {
        try {
            const url = "http://localhost:8080";
            const headers = {
                headers: {
                    'Authorization': localStorage.getItem('token'),
                },
            };
            const response = await fetch(url, headers);
            const result = await response.json();
            console.log(result);
            setProducts(result);
        } catch (err) {
            handleError(err);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div>
            {/* Navbar component */}
            <Navbar />

            <h1>Welcome {loggedInUser}</h1>
            <div>
                {products &&
                    products.map((item, index) => (
                        <ul key={index}>
                            <span>{item.name} : {item.price}</span>
                        </ul>
                    ))}
            </div>
            <ToastContainer />
        </div>
    );
}

export default Home;
