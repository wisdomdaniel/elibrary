import {Routes, Route} from "react-router-dom";
import Login from "../auth/Login.jsx";
import Register from "../auth/Register.jsx";
import StudentDashboard from "../student/StudentDashboard.jsx";
import AdminDashboard from "../admin/AdminDashboard.jsx";

function AppRoutes(){


     if(user){
        if(user.role === "admin"){
            navigate("/admin")
        }
        else if(user.role === "student")
        {navigate("/student")}
     }
    return(

        <Routes>
             <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/student" element={<StudentDashboard />} />
      <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
    )
}export default AppRoutes