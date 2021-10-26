import './App.css';
import {createContext, useState} from "react";
import {Registration} from "./pages/Registration";
import {AuthContext} from "./context";


function App() {
  const [isAuth, setIsAuth] = useState(false);

  return (
  <AuthContext.Provider value={{
    isAuth,
    setIsAuth,
  }}>
    <div>
      <Registration/>
    </div>
  </AuthContext.Provider>
  );
}

export default App;
