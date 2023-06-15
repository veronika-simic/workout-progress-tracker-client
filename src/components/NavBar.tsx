import { Link } from "react-router-dom";
const NavBar = () => {
  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Workout Tracker</h1>
        </Link>
        <Link to="/progress">
          <h2>Progress</h2>
        </Link>
      </div>
    </header>
  );
};
export default NavBar;
