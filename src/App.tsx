import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import WorkoutProgress from "./components/WorkoutProgress"
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import { useAuthContext } from "./hooks/useAuthContext";
function App() {
  const {userState} = useAuthContext()
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <div className="pages">
          <Routes>
            <Route path="/" element={userState.user ? <Home /> : <Navigate to="login"/>} />
            <Route path="/signup" element={!userState.user ? <SignUp />: <Navigate to="/"/>} />
            <Route path="/login" element={!userState.user ? <Login />: <Navigate to="/"/>} />
            <Route path="/progress" element={!userState.user? <WorkoutProgress />:<Navigate to="/"/>} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
