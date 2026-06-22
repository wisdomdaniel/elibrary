import AppRoutes from "./Pages/routes/AppRoutes.jsx"
import NavBar from "./components/NavBar.jsx"
import SideBar from "./components/SideBar.jsx"
import { useAuth } from "./Pages/context/AuthContext.jsx"

function App() {
  const { user } = useAuth();
  
  return(
    <div className="app-container">
      <NavBar />
      <div style={{ display: 'flex' }}>
        {user && <SideBar />}
        <main style={{ flex: 1, padding: '20px' }}>
          <AppRoutes/>
        </main>
      </div>
    </div>
  )
}

export default App
