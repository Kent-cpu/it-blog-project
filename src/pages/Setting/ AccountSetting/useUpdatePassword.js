import React, {useContext, useState} from 'react';
import {AuthContext} from "../../../context";
import {signInWithEmailAndPassword, updatePassword} from "firebase/auth";
import {doc, updateDoc} from "firebase/firestore";


export const useUpdatePassword = () => {
    const bcrypt = require("bcryptjs");
    const {auth, userData, setUserData, db} = useContext(AuthContext);
    const [passwordChange, setPasswordChange] = useState({
        oldPassword: "",
        newPassword: "",
        newPasswordConfirmation: "",
    });
    const [errorChangePsw, setErrorChangePsw] = useState({});


    const validationData = () => {
        const regularPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
        const error = {};
        if (passwordChange.oldPassword.length === 0) {
            error.oldPassword = "Обязательное поле";
        } else if (!bcrypt.compareSync(passwordChange.oldPassword, userData.password)) {
            error.oldPassword = "Неверный пароль";
        }

        if (passwordChange.newPassword.length === 0) {
            error.newPassword = "Обязательное поле";
        } else if (!regularPassword.test(passwordChange.newPassword)) {
            error.newPassword = "Неверный формат";
        }


        if (passwordChange.newPasswordConfirmation.length === 0) {
            error.newPasswordConfirmation = "Обязательное поле";
        } else if (passwordChange.newPasswordConfirmation !== passwordChange.newPassword) {
            error.notMatchPsw = "Не совпадают пароли";
        }


        setErrorChangePsw(error);
        if (Object.entries(error).length === 0) {
            return true;
        }
        return false;
    }


    const updateProfilePassword = () => {
        if (validationData()) {
            const hashPassword = bcrypt.hashSync(passwordChange.newPassword, 10);
            signInWithEmailAndPassword(auth, userData.email, userData.password).then(() => {
                updatePassword(auth.currentUser, hashPassword).then(() => {
                    const userRef = doc(db, "Users", userData.uid);
                    updateDoc(userRef, {password: hashPassword,});
                    setUserData((prevData) => {
                        return {...prevData, password: hashPassword};
                    });

                }).catch((error) => {
                    console.log(error)
                });
            }).catch((error) => {
                console.error(error.code, error.message);
            });
        }
    }

    return [setPasswordChange, errorChangePsw, updateProfilePassword];

};

