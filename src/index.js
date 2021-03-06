import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import firebase from "firebase/compat";
import App from "./App";
import {BrowserRouter} from "react-router-dom";


firebase.initializeApp(
    {
        apiKey: "AIzaSyCjHq7_8xpFgYfnn0UN8XeOdacu29_5OXE",
        authDomain: "it-blog-c0d57.firebaseapp.com",
        projectId: "it-blog-c0d57",
        storageBucket: "it-blog-c0d57.appspot.com",
        messagingSenderId: "707217535577",
        appId: "1:707217535577:web:82e81cfbd6d33fd39db748"
    }
);

const auth = firebase.auth();


ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
                <App firebase = {firebase} auth = {auth}/>
        </BrowserRouter>
    </React.StrictMode>,
  document.getElementById('root')
);


