import './App.css';
import {useEffect, useState} from "react";
import {AuthContext} from "./context";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import {onAuthStateChanged} from "firebase/auth";
import {doc, getDoc} from "firebase/firestore";
import {getFirestore} from "firebase/firestore";
import Loader from "react-loader-spinner";


function App(props) {
    const {firebase, auth} = props;
    const [isAuth, setIsAuth] = useState(false);
    const [userData, setUserData] = useState(undefined);
    const [isLoader, setIsLoader] = useState(true);
    const db = getFirestore();


    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                new Promise(resolve => {
                    const dataUser = getDoc(doc(db, "Users", currentUser.uid));
                    resolve(dataUser);
                }).then(dataUser => setUserData(dataUser.data()))
                    .then(() => {
                        setIsAuth(true);
                        setIsLoader(false);
                    })
            } else {
                setIsAuth(false);
                setIsLoader(false);
            }
        });
    }, []);


    return (
        <BrowserRouter>
            <AuthContext.Provider value={{
                firebase,
                auth,
                isAuth,
                setIsAuth,
                userData,
                setUserData,
                db,
                isLoader,
                setIsLoader,
            }}>

                {(isLoader === true ? <div className="centered-container"><Loader type="BallTriangle"/></div> :
                    <AppRouter/>)}
            </AuthContext.Provider>
        </BrowserRouter>
    );
}

export default App;
