import { useState, useContext } from "react";
import axios from "axios";
import "./auth.scss";
import imagerobot from "../../../assets/Image 129.png";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../../../UserContext";

const Login = () => {
  const { setAuthToken } = useContext(UserContext);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const { email, password } = formData;

    try {
      const response = await axios.post("https://x8ki-letl-twmt.n7.xano.io/api:SSOLzzIz/auth/login", {
        email,
        password
      });

      if (response.status === 200) {
        const token = response.data.authToken;
        setAuthToken(token);
        localStorage.setItem('authToken', token); 
        setSuccess("Login successful! Redirecting...");
        navigate('/chatpage');
      } else {
        setError(response.data.message || "Login failed. Please try again.");
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
          <h1>Log in</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            placeholder="Password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
          <button type="submit" className="btn">Log in</button>
        </form>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <p>Don't have an account? <Link className="link" to="/signup"> Sign Up</Link></p>
      </div>
      <div className="auth-page_wrapper_right">
        <img src={imagerobot} alt="Chatbot" />
      </div>
    </div>
  );
};

export default Login;
