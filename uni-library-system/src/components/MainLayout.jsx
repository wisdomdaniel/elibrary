import { Outlet } from 'react-router-dom';
import SideBar from './SideBar';
import Header from './Header';

const MainLayout = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <SideBar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <main className="flex-1 overflow-auto p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
