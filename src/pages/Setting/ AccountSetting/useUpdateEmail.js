import {useContext, useState} from "react";
import {AuthContext} from "../../../context";
import {doc, updateDoc} from "firebase/firestore";
import {signInWithEmailAndPassword, updateEmail} from "firebase/auth";


export const useUpdateEmail = () => {
    const bcrypt = require("bcryptjs");
    const {auth, userData, setUserData, db} = useContext(AuthContext);
    const [emailChange, setEmailChange] = useState({
        newEmail: "",
        passwordConfirmation: "",
    });

    const [errorEmailChange, setError] = useState({});


    const validationData = () => {
        const regularEmail = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
        const error = {};
        if (emailChange.newEmail.length === 0) {
            error.newEmail = "Обязательное поле";
        } else if (!regularEmail.test(emailChange.newEmail)) {
            error.email = "Неверный формат";
        }

        if (emailChange.passwordConfirmation.length === 0) {
            error.passwordConfirmation = "Обязательное поле";
        } else if (!bcrypt.compareSync(emailChange.passwordConfirmation, userData.password)) {
            error.passwordConfirmation = "Неверный пароль";
        }
        setError(error);

        if (Object.entries(error).length === 0) {
            return true;
        }
        return false;
    }


    const updateProfileEmail = (e) => {
        try {
            e.target.disabled = true;
            if (validationData()) {
                signInWithEmailAndPassword(auth, userData.email, userData.password).then(() => {
                    updateEmail(auth.currentUser, emailChange.newEmail).then(() => {
                        const userRef = doc(db, "Users", userData.uid);
                        updateDoc(userRef, {
                            email: emailChange.newEmail,
                        });
                        setUserData((prevData) => {
                            return {...prevData, email: emailChange.newEmail};
                        });
                    }).catch((error) => {
                        console.error(error)
                    });
                    e.target.disabled = false;
                }).catch((error) => {
                    e.target.disabled = false;
                    console.error(error.code, error.message);
                });
            }

        } catch (e) {

        }
    }

    return [setEmailChange, errorEmailChange, updateProfileEmail];
}