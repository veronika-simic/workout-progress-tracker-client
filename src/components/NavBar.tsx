import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
const NavBar = () => {
  const { logout } = useLogout();
  const { userState } = useAuthContext();
  const handleClick = () => {
    logout();
  };
  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Workout Tracker</h1>
        </Link>
        <nav>
          {userState.user && (
            <>
              <Link to="/progress">
                <h2>Progress</h2>
              </Link>
              <div>
                <span>{userState.user.email}</span>
                <button onClick={handleClick}>Log out</button>
              </div>
            </>
          )}
          {!userState.user && (
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
