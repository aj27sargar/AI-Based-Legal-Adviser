import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';

function Home() {
    const [loggedInUser, setLoggedInUser] = useState('');
    const [products, setProducts] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser'));

        // Embedding the chatbot script with error handling
        try {
            const script1 = document.createElement('script');
            script1.innerHTML = `
                window.embeddedChatbotConfig = {
                    chatbotId: "ApZTTdHUt3Ipnz4inDOl3",
                    domain: "www.chatbase.co"
                };
            `;
            document.body.appendChild(script1);

            const script2 = document.createElement('script');
            script2.src = "https://www.chatbase.co/embed.min.js";
            script2.setAttribute('chatbotId', "ApZTTdHUt3Ipnz4inDOl3");
            script2.setAttribute('domain', "www.chatbase.co");
            script2.defer = true;

            // Handle script loading errors
            script2.onerror = () => {
                handleError(new Error('Failed to load chatbot script'));
            };

            document.body.appendChild(script2);

            return () => {
                // Cleanup scripts when component unmounts
                document.body.removeChild(script1);
                document.body.removeChild(script2);
            };
        } catch (error) {
            handleError(error);
        }
    }, []);

    const handleLogout = (e) => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        handleSuccess('User Logged out');
        setTimeout(() => {
            navigate('/login');
        }, 1000);
    }

    const fetchProducts = async () => {
        try {
            const url = "http://localhost:8080/products";
            const headers = {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            }
            const response = await fetch(url, headers);
            const result = await response.json();
            console.log(result);
            setProducts(result);
        } catch (err) {
            handleError(err);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div>
            <h1>Welcome {loggedInUser}</h1>
            <button onClick={handleLogout}>Logout</button>
            <div>
                {
                    products && products.map((item, index) => (
                        <ul key={index}>
                            <span>{item.name}  {item.price}</span>
                        </ul>
                    ))
                }
            </div>
            <ToastContainer />
        </div>
    )
}

export default Home;
