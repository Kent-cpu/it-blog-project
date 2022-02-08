import './App.css';
import {useEffect, useState} from "react";
import {AuthContext} from "./context";
import AppRouter from "./components/AppRouter";
import {onAuthStateChanged} from "firebase/auth";
import {doc, getDoc, getFirestore} from "firebase/firestore";
import Loader from "react-loader-spinner";
import Header from "./components/Header";
import {useLocation} from "react-router-dom";
import {hideHeaderPages} from "./utils/constants";


function App(props) {
    const {firebase, auth} = props;
    const [isAuth, setIsAuth] = useState(false);
    const [userData, setUserData] = useState(undefined);
    const [isLoader, setIsLoader] = useState(true);
    const location = useLocation();
    const db = getFirestore();


    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                new Promise(resolve => {
                    const dataUser = getDoc(doc(db, "Users", currentUser.uid));
                    resolve(dataUser);
                }).then(dataUser => {
                    setUserData(dataUser.data());
                    setIsAuth(true);
                    setIsLoader(false);
                });
            } else {
                setIsAuth(false);
                setIsLoader(false);
            }
        });
    }, []);


    return (
        <AuthContext.Provider value={{
            firebase,
            auth,
            isAuth,
            setIsAuth,
            userData,
            setUserData,
            db,
        }}>

            {isLoader === true ?
                <div className="centered-container">
                    <Loader type="BallTriangle"/>
                </div>
                :
                <div>
                    {hideHeaderPages.filter(page => page === location.pathname).length === 0 && <Header/>}
                    <AppRouter/>
                </div>

            }
        </AuthContext.Provider>
    );
}

export default App;