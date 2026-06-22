import AppRoutes from "./Pages/routes/AppRoutes.jsx"

function App() {
  const savedUser = localStorage.getItem("user");
  const user = savedUser ? JSON.parse(savedUser) : null;
  
  return(
    <AppRoutes/>
  )
}

export default App
