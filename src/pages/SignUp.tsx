


import { useState } from "react";
import api from "../services/api"
import OtpVerify from "../components/Otp";





const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [otpSent, setOtpSent] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {

             const isValidPassword = (password: string): boolean => {
                const passwordRegex =
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

                return passwordRegex.test(password);

            }

            if(isValidPassword(password) === false){
                setError("Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.");
                setLoading(false);
                return;
            }

                await api.post("/auth/signup", { name, email, password });
                alert("Signup successful");

                setOtpSent(true);
            } catch (err: any) {
                setError(err.response?.data?.message || "Signup failed");
            } finally {
                setLoading(false);
            }
        };

        return (
            <>
                {!otpSent && <form onSubmit={handleSubmit}>
                    <h2 className="">Sign Up</h2>


                    <input
                        type="name"
                        value={name}
                        placeholder="Name"
                        onChange={(e) => setName(e.target.value)} className="m-1"
                        required
                        /> <br />
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
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        />
                    <br />

                    <button type="submit" disabled={loading} className="bg-red-500 w-full p-1 m-1 h-8 rounded-md text-white">
                        {loading ? "Logging in..." : "Login"}
                    </button>
                {error && <p style={{ color: "red" }} className="text-xs w-52">{error}</p>}
                </form>}

                {otpSent && <OtpVerify email={email}></OtpVerify>}

            </>

        );
    };

    export default SignUp;
