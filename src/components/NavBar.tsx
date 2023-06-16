import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
const NavBar = () => {
  const { logout } = useLogout();
  const { state } = useAuthContext();
  const handleClick = () => {
    logout();
  };
  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Workout Tracker</h1>
        </Link>
        <Link to="/progress">
          <h2>Progress</h2>
        </Link>
        <nav>
          {state.user && (
            <div>
              <span>{state.user.email}</span>
              <button onClick={handleClick}>Log out</button>
            </div>
          )}
          {!state.user && (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};
export default NavBar;
