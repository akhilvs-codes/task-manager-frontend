import { useState } from "react";
import api from "../services/api"
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {

        
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            console.log("authentication");
            
            await api.post("/auth/login", { email, password }, { withCredentials: true });

            alert("Login successful");
            setTimeout(() => {
                navigate("/home");
            }, 800);
        } catch (err: any) {
            setError(err.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login Page</h2>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <input
                type="email"
                value={email}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)} className="m-1"
                required
            />
            <br />

            <input
                type="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)} className="m-1"
                required
            />
            <br />

            <button type="submit" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
            </button>
        </form>
    );
};

export default Login;
