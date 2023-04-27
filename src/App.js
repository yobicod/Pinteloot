import "./App.css";
import Login from "./components/login";
import Nav from "./components/nav";
import Admin from "./components/admin";
import Createpin from "./components/createpin";
import Register from "./components/register";
import Mainboard from "./components/mainboard";
function App() {
  return (
    <div className="App">
      <Nav />
      <Mainboard />
      {/* <Login /> */}
      {/* <Register /> */}
      {/* <Admin /> */}
      {/* <Createpin /> */}
    </div>
  );
}

export default App;
