import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { Tooltip } from "react-tooltip";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error } = useLogin();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await login(email, password);
    console.log(email, password);
  };
  return (
    <form className="login" onSubmit={handleSubmit} data-testid="login-form">
      <h3>Login</h3>
      <label htmlFor="email">Email:</label>
      <input
        id="email"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button
        data-tooltip-id="login-button-tooltip"
        data-tooltip-content="Login"
        disabled={isLoading}
      >
        Login
      </button>
      <Tooltip id="login-button-tooltip" />
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Login;
