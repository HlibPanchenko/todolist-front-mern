import "./App.scss";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import CreateTask from "./pages/CreateTask/CreateTask";
import Home from "./pages/Home/Home";
import EditTask from "./pages/EditTask/EditTask";

function App() {
  return (
    <div className="App">
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/createTask" element={<CreateTask />} />
        <Route path="/editTask/:id" element={<EditTask />} />
      </Routes>
    </div>
  );
}

export default App;
