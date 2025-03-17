import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import SignInImage from "./assets/signIn.jpg";
import "./styles/Auth.css";
import Logo from './assets/logo2.png';

function SignIn({ onClose }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrorMessage("");
        setSuccessMessage("");
        setLoading(true);

        try {
            const response = await axios.post("http://localhost:3001/signin", { email, password });
            setSuccessMessage("✅ Login successful! Redirecting...");
            setTimeout(() => {
                navigate("/success");
                onClose();
            }, 1500);
        } catch (error) {
            if (error.response && error.response.data.message) {
                setErrorMessage(`⚠️ ${error.response.data.message}`);
            } else {
                setErrorMessage("⚠️ Server error! Please try again later.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="popup-overlay" onClick={onClose}>
            <motion.div
                className="popup-content"
                initial={{ opacity: 0, scale: 0.9, x: "50%" }}
                animate={{ opacity: 1, scale: 1, x: "0%" }}
                exit={{ opacity: 0, scale: 0.9, x: "50%" }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="left-panel">
                    <img src={SignInImage} alt="Sign In" />
                </div>

                <div className="right-panel">
                    <img src={Logo} alt="Project Logo" className="logo" />
                    <h2>Welcome Back!</h2>

                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    {successMessage && <p className="success-message">{successMessage}</p>}

                    <form onSubmit={handleSubmit}>
                        <input 
                            type="email" 
                            placeholder="Email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                        />
                        <input 
                            type="password" 
                            placeholder="Password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                        <button type="submit" className="btn" disabled={loading}>
                            {loading ? <span className="spinner"></span> : "Login"}
                        </button>
                    </form>

                    <p>Don't have an account? <Link to="/register" className="link">Sign Up</Link></p>
                    <p><Link to="/resetpassword" className="link">Forgot Password?</Link></p>
                </div>
            </motion.div>
        </div>
    );
}

export default SignIn;
