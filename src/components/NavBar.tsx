import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { Tooltip } from "react-tooltip";
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
          <h1 data-tooltip-id="home-page-tooltip" data-tooltip-content="Home">
            Workout Tracker
          </h1>
          <Tooltip id="home-page-tooltip" />
        </Link>
        <nav>
          {userState.user && (
            <>
              <span data-tooltip-id="user-name-tooltip" data-tooltip-content="User">{userState.user.email}</span>
              <Tooltip id="user-name-tooltip"/>
              <button data-tooltip-id="logout-tooltip" data-tooltip-content="Log out" onClick={handleClick}>Log out</button>
              <Tooltip id="logout-tooltip"/>
            </>
          )}
          {!userState.user && (
            <div>
              <Link data-tooltip-id="login-tooltip" data-tooltip-content="Login" to="/login">Login</Link>
              <Tooltip id="login-tooltip"/>
              <Link data-tooltip-id="signup-tooltip" data-tooltip-content="Sign up" to="/signup">Sign Up</Link>
              <Tooltip id="signup-tooltip"/>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};
export default NavBar;
