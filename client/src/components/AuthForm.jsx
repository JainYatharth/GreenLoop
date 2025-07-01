import { useState } from "react";
import axios from "../axiosConfig";
import mail from "./assets/mail.png";
import nam from "./assets/name.png";
import pass from "./assets/password.png";
import './AuthForm.css';

const AuthForm = ({ onAuthSuccess }) => {const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [name, setname] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");

    try {
      const endpoint = isSignup ? "/api/auth/signup" : "/api/auth/login";
      const res = await axios.post(endpoint, { email, password });

      const { token, user } = res.data;
      localStorage.setItem("token", token);
      onAuthSuccess(user); // sends user to dashboard
    } catch (error) {
      setErr(error.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div>
      <div className="text-center mb-6 head"> <h2 className="underline underline-offset-4 "> {isSignup ? "Sign Up" : "Log In"} </h2> </div>
      <form onSubmit={handleSubmit} className="space-y-4">
          {isSignup && (
            <div className="inputs">
              <div className="input">
                <img src={nam} alt="Name icon" />
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  className="w-full"
                  onChange={(e) => setname(e.target.value)}
                  required
                />
              </div>
            </div>
          )}

          <div className="inputs">
            <div className="input">
              <img src={mail} alt="Mail icon" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                className="w-full"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="inputs">
            <div className="input">
              <img src={pass} alt="Password icon" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                className="w-full"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {err && <p className="text-red-500 text-sm">{err}</p>}

          <div className="button-container">
            <button type="submit" className="submit">
              {isSignup ? "SignUp" : "LogIn"}
            </button>
          </div>
        </form>

        <p className="text-sm mt-4 text-center text-blue-500">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            type="button"
            className="text-blue-600 underline"
            onClick={() => setIsSignup(!isSignup)}
          >
            {isSignup ? "Log In" : "Sign Up"}
          </button>
        </p>

    </div>)}

export default AuthForm;
