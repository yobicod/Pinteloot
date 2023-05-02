import "./App.css";
import Login from "./components/login";
import Nav from "./components/nav";
import Admin from "./components/admin";
import Createpin from "./components/createpin";
import Register from "./components/register";
import Mainboard from "./components/mainboard";
import Profile from "./components/profile";
import Pin from "./components/Pin";
import Modal from "./components/Modal";
import ModalAdmin from "./components/Modal_admin";
import ReportPin from "./components/reportPin";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  BrowserRouter,
} from "react-router-dom";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* <Nav /> */}
        {/* <Mainboard /> */}
        {/* <Login /> */}
        {/* <Register /> */}
        {/* <Admin /> */}
        {/* <Createpin /> */}
        {/* <Profile/> */}
        <Routes>
          <Route>
            <Route path="/" element={<Login />} exact></Route>
          </Route>
          <Route>
            <Route path="/create" element={<Createpin />} exact></Route>
          </Route>
          <Route>
            <Route path="/login" element={<Login />} exact></Route>
          </Route>
          <Route>
            <Route path="/register" element={<Register />} exact></Route>
          </Route>
          <Route>
            <Route path="/admin" element={<Admin />} exact></Route>
          </Route>
          <Route>
            <Route path="/profile" element={<Profile />} exact></Route>
          </Route>
          <Route>
            <Route path="/pin" element={<Pin />} exact></Route>
          </Route>
          <Route>
            <Route path="/modal" element={<Modal />} exact></Route>
          </Route>
          <Route>
            <Route path="/report" element={<ReportPin />} exact></Route>
          </Route>
          <Route>
            <Route path="/ModalAdmin" element={<ModalAdmin />} exact></Route>
          </Route>
          <Route>
            <Route path="/mainpage" element={<Mainboard />} exact></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
