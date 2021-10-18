import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Registration} from "./pages/Registration";
import firebase from "firebase/compat";


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


ReactDOM.render(
  <React.StrictMode>
      <Registration/>
  </React.StrictMode>,
  document.getElementById('root')
);


