import { useState } from "react";
import axios from "axios";
import "./auth.scss";
import imagerobot from "../../../assets/Image 129.png";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const { email, name, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post("https://x8ki-letl-twmt.n7.xano.io/api:SSOLzzIz/auth/signup", {
        email,
        name,
        password
      });

      if (response.status === 200) {
        setSuccess("Signup successful! Proceed to log in.");
        navigate('/login'); 
      } else {
        setError(response.data.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="auth-page_wrapper">
      <div className="auth-page_wrapper_left">
        <div className="top">
          <div className="chatbot">CHATBOT</div>
          <h1>Sign Up</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
          />

          <label htmlFor="name">Name</label>
          <input
            id="name"
            placeholder="Enter Name"
            value={formData.name}
            onChange={handleChange}
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />

          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />

          <button type="submit" className="btn">Sign Up</button>
        </form>

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        <p>Already have an account? <Link className="link" to="/">Log in </Link></p>
      </div>
      <div className="auth-page_wrapper_right">
        <img src={imagerobot} alt="Chatbot" />
      </div>
    </div>
  );
};

export default Signup;
