import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./styles/Auth.css";
import Logo from "./assets/logo2.png";
import SignUpImage from "./assets/signUp.jpg";

function SignUp({ onClose }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            setMessage("⚠️ Passwords do not match!");
            return;
        }

        setLoading(true);
        setMessage("");

        try {
            await axios.post("http://localhost:3001/register", { name, email, password });
            setMessage("✅ Registered successfully! Redirecting...");
            setTimeout(() => {
                navigate("/signin");
                onClose();
            }, 1500);
        } catch (error) {
            setMessage(error.response?.data?.message || "❌ Something went wrong!");
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
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
            >
                <div className="left-panel">
                    <img src={SignUpImage} alt="Sign Up" />
                </div>

                <div className="right-panel">
                    <img src={Logo} alt="Project Logo" className="logo" />
                    <h2>Sign Up</h2>

                    {message && <p className="message">{message}</p>}

                    <form onSubmit={handleSubmit}>
                        <input type="text" placeholder="Full Name" onChange={(e) => setName(e.target.value)} required />
                        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
                        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
                        <input type="password" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} required />

                        <button type="submit" className="btn" disabled={loading}>
                            {loading ? "Signing Up..." : "Sign Up"}
                        </button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
}

export default SignUp;
