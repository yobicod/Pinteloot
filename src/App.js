import "./App.css";
import Login from "./components/login";
import Nav from "./components/nav";
import Admin from "./components/admin"
import Createpin from "./components/createpin";
function App() {
  return (
    <div className="App">
      <Nav />
      {/* <Login /> */}
      <Admin />
      <Createpin />
    </div>
  );
}

export default App;
