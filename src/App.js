import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Task from "./pages/Task";
import TaskCreate from "./pages/TaskCreate";
import Admin from "./pages/Admin";
import PrivateRoute from "./components/PrivateRouter";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>}/>
        <Route path="/task/:id" element={<PrivateRoute><Task /></PrivateRoute>}/>
        <Route path="/task/create" element={<PrivateRoute><TaskCreate /></PrivateRoute>}/>
        <Route path="/admin/users" element={<PrivateRoute><Admin /></PrivateRoute>}/>
      </Routes>
    </Router>
  );
}

export default App;
