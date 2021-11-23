import React, {useContext, useState} from 'react';
import styles from "./account.module.scss";
import "./../index.scss";
import {AuthContext} from "../../../context";
import {useUpdateEmail} from "./useUpdateEmail";
import {useUpdatePassword} from "./useUpdatePassword";


export const AccountSetting = () => {
    const {userData} = useContext(AuthContext);
    const [setEmailChange, errorEmailChange, updateProfileEmail] = useUpdateEmail();
    const [setPasswordChange, errorChangePsw, updateProfilePassword] = useUpdatePassword();


    return (
        <div className={styles["account-setting"]}>
            <form onSubmit={(e) => e.preventDefault()} style={{marginBottom: "40px"}} action="">
                <p className={styles["account-setting__title"]}>Изменить пароль</p>
                <div className={styles["account-setting__item"]}>
                    <label className={"form__label"} htmlFor="oldPassword">Старый пароль</label>
                            <input
                                className="input-field"
                                name="oldPassword"
                                // type="password"
                                onChange={(e) => {
                                    setPasswordChange((prevData) => {
                                        return {...prevData, oldPassword: e.target.value}
                                    })
                                }}
                            />

                    <p className="error-message">{errorChangePsw?.oldPassword || ''}</p>
                </div>


                <div className={styles["account-setting__item"]}>
                    <label className={"form__label"} htmlFor="newPassword">Новый пароль</label>
                    <input
                        className="input-field"
                        name="newPassword"
                        type="password"
                        onChange={(e) => {
                            setPasswordChange((prevData) => {
                                return {...prevData, newPassword: e.target.value}
                            })
                        }}
                    />
                    <p className="error-message">{errorChangePsw?.newPassword || errorChangePsw.notMatchPsw || ''}</p>
                </div>


                <div className={styles["account-setting__item"]}>
                    <label className={"form__label"} name="newVerifiedPassword" htmlFor="">Потвердить новый
                        пароль</label>
                    <input
                        className="input-field"
                        name="newVerifiedPassword"
                        type="password"
                        onChange={(e) => {
                            setPasswordChange((prevData) => {
                                return {...prevData, newPasswordConfirmation: e.target.value}
                            })
                        }}
                    />
                    <p className="error-message">{errorChangePsw?.newPasswordConfirmation ||  errorChangePsw.notMatchPsw || ''}</p>
                </div>


                <button
                    className="save-changes-btn"
                    onClick={updateProfilePassword}
                >Сохранить изменения</button>
            </form>


            <form onSubmit={(e) => e.preventDefault()} action="">
                <p className={styles["account-setting__title"]}>Изменить email</p>
                <div className={styles["account-setting__item"]}>
                    <label className={"form__label"} htmlFor="currentEmail">Текущий email</label>
                    <input
                        type="text"
                        name="currentEmail"
                        className="input-field"
                        disabled={true}
                        value={userData?.email || ''}
                    />
                </div>

                <div className={styles["account-setting__item"]}>
                    <label className={"form__label"} htmlFor="newEmail">Новый email</label>
                    <input
                        className="input-field"
                        name="newEmail"
                        type="text"
                        onChange={(e) => {
                            setEmailChange((prevData) => {
                                return {...prevData, newEmail: e.target.value}
                            })
                        }}
                    />
                    <p className="error-message">{errorEmailChange?.newEmail || ''}</p>
                </div>

                <div className={styles["account-setting__item"]}>
                    <label className={"form__label"} name="newVerifiedPassword" htmlFor="">Пароль для
                        потверждения</label>
                    <input
                        type="password"
                        name="newVerifiedPassword"
                        className="input-field"
                        onChange={(e) => {
                            setEmailChange((prevData) => {
                                return {...prevData, passwordConfirmation: e.target.value}
                            })
                        }}
                    />
                    <p className="error-message">{errorEmailChange?.passwordConfirmation || ''}</p>
                </div>

                <button onClick={updateProfileEmail} className="save-changes-btn">Сохранить изменения</button>
            </form>

        </div>
    );
};
