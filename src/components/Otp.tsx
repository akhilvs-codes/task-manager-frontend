import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";




const OtpVerify = ({email}:{email:string}) => {

  const navigate = useNavigate();

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await api.post("/auth/verify-otp", { otp,email });
      alert("OTP verified");

      setTimeout(() => {
       navigate("/login");
      }, 800); 
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" flex items-center">
      <form
        onSubmit={handleSubmit}
        className="border p-4 rounded w-64"
      >
        <h2 className="text-center mb-3">Verify OTP</h2>

        {error && (
          <p className="text-red-500 text-sm text-center mb-2">
            {error}
          </p>
        )}

        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full border p-2 mb-3"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full border p-2"
        >
          {loading ? "Verifying..." : "Verify"}
        </button>
      </form>
    </div>
  );
};

export default OtpVerify;
