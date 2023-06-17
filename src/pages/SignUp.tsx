import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { Tooltip } from "react-tooltip";
const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useSignup();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(email, password);
    await signup(email, password);
  };
  return (
    <form className="signup" onSubmit={handleSubmit} data-testid="signup-form">
      <h3>Sign up</h3>
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
        data-tooltip-id="signup-button-tooltip"
        data-tooltip-content="Sign up"
        disabled={isLoading}
      >
        Sign up
      </button>
      <Tooltip id="signup-button-tooltip" />
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default SignUp;
