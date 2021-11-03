import './App.css';
import {useState} from "react";
import {AuthContext} from "./context";
import {Header} from "./components/Header";


function App() {
  const [isAuth, setIsAuth] = useState(false);

  return (
  <AuthContext.Provider value={{
    isAuth,
    setIsAuth,
  }}>
    <div>
      <Header/>
    </div>
  </AuthContext.Provider>
  );
}

export default App;
