import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import WorkoutProgress from "./components/WorkoutProgress"
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/progress" element={<WorkoutProgress />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
