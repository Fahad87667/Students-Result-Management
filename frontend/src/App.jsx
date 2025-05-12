import { ToastContainer } from "react-toastify";
import { Dashboard } from "./components/Dashboard";
import { Navigation } from "./components/Navigation";
import { StudentList } from "./components/StudentList";
import { UpdateRecord } from "./components/updaterecord";
import { StudentRegistration } from "./components/StudentRegistration";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./components/Login";
import { RenderNavbar } from "./components/RenderNavbar";
import { Privateroute } from "./components/Privateroute";

function App() {
  return (
    <div>
      <BrowserRouter>
        <RenderNavbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<Privateroute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/register-student" element={<StudentRegistration />} />
            <Route path="/studentslist" element={<StudentList />} />
            <Route path="/update/:id" element={<UpdateRecord />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer></ToastContainer>
    </div>
  );
}

export default App;
