import { Outlet } from "react-router-dom";
import { useState, createContext, useEffect } from "react";
import Header from '../Header/Header';

export const AppContext = createContext();

const tokenCookie = () => {
  return document.cookie.split("; ").find(row => row.startsWith("token="))?.split("=")[1] ? true : false
}

const AppLayout = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(tokenCookie())

  useEffect(() => {
    if(isLoggedIn === false) {
      // delete username and token cookies
      document.cookie = 'token' + '=; Max-Age=-99999999;'
      document.cookie = 'username' + '=; Max-Age=-99999999;'
    }
  }, [isLoggedIn])


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