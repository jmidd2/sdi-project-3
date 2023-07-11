import { Navigate, useOutlet, Outlet } from "react-router-dom";
import { useState, createContext } from "react";
import Header from '../Header/Header';

export const AppContext = createContext();

const tokenCookie = () => {
  return document.cookie.split("; ").find(row => row.startsWith("token="))?.split("=")[1] ? true : false
}

const AppLayout = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(tokenCookie())

  return (
    <div>
      <AppContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
        <Header />
        <Outlet />
      </AppContext.Provider>
    </div>
  );
};

export default AppLayout;