import "./App.css";
import Login from "./components/login";
import Nav from "./components/nav";
import Admin from "./components/admin";
import Createpin from "./components/createpin";
import Register from "./components/register";
import Mainboard from "./components/mainboard";
import Profile from "./components/profile";
import { BrowserRouter as Router, Routes, Route, Link, BrowserRouter } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Nav />
          {/* <Mainboard /> */}
          {/* <Login /> */}
          {/* <Register /> */}
          {/* <Admin /> */}
          {/* <Createpin /> */}
          {/* <Profile/> */}
          <Routes>
          <Route>
              <Route path="/" element={<Mainboard/>} exact></Route>
            </Route>
            <Route>
              <Route path="/create" element={<Createpin/>} exact></Route>
            </Route>
            <Route>
              <Route path="/login" element={<Login/>} exact></Route>
            </Route>
            <Route>
              <Route path="/rgister" element={<Register/>} exact></Route>
            </Route>
            <Route>
              <Route path="/admin" element={<Register/>} exact></Route>
            </Route>
            <Route>
              <Route path="/profile" element={<Profile/>} exact></Route>
            </Route>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
