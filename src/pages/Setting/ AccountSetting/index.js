import React, {useContext} from 'react';
import styles from "./account.module.scss";
import "./../index.scss";
import {AuthContext} from "../../../context";
import {useUpdateEmail} from "./useUpdateEmail";
import {useUpdatePassword} from "./useUpdatePassword";
import {handleChangeInput} from "../../../utils/handleChangeInput";


export const AccountSetting = () => {
    const {userData} = useContext(AuthContext);
    const [setEmailChange, errorEmailChange, updateProfileEmail] = useUpdateEmail();
    const [setPasswordChange, errorChangePsw, updateProfilePassword] = useUpdatePassword();

    const handleChangeEmail = (e) => handleChangeInput(e, setEmailChange);
    const handleChangePassword = e => handleChangeInput(e, setPasswordChange);


    return (
        <div className={styles["account-setting"]}>
            <form onSubmit={(e) => e.preventDefault()} style={{marginBottom: "40px"}}>
                <p className={styles["account-setting__title"]}>Изменить пароль</p>
                <div className={styles["account-setting__item"]}>
                    <label
                        className={"form__label"}
                        htmlFor="oldPassword"
                    >
                        Старый пароль
                    </label>
                    <input
                        className="input-field"
                        name="oldPassword"
                        type="password"
                        onChange={handleChangePassword}
                    />
                    <p className="error-message">{errorChangePsw?.oldPassword || ''}</p>
                </div>


                <div className={styles["account-setting__item"]}>
                    <label className={"form__label"} htmlFor="newPassword">Новый пароль</label>
                    <input
                        className="input-field"
                        name="newPassword"
                        type="password"
                        onChange={handleChangePassword}
                    />
                    <p className="error-message">{errorChangePsw?.newPassword || errorChangePsw.notMatchPsw || ''}</p>
                </div>


                <div className={styles["account-setting__item"]}>
                    <label
                        className={"form__label"}
                        htmlFor="newPasswordConfirmation"
                    >
                        Потвердить новый пароль
                    </label>
                    <input
                        className="input-field"
                        name="newPasswordConfirmation"
                        type="password"
                        onChange={handleChangePassword}
                    />
                    <p className="error-message">{errorChangePsw?.newPasswordConfirmation || errorChangePsw.notMatchPsw || ''}</p>
                </div>

                <button
                    className="save-changes-btn"
                    onClick={updateProfilePassword}
                >
                    Сохранить изменения
                </button>
            </form>

            <form onSubmit={(e) => e.preventDefault()} action="">
                <p className={styles["account-setting__title"]}>Изменить email</p>
                <div className={styles["account-setting__item"]}>
                    <label
                        className={"form__label"}
                        htmlFor="currentEmail"
                    >
                        Текущий email
                    </label>
                    <input
                        type="text"
                        name="currentEmail"
                        className="input-field"
                        disabled={true}
                        value={userData?.email || ''}
                    />
                </div>

                <div className={styles["account-setting__item"]}>
                    <label
                        className={"form__label"}
                        htmlFor="newEmail"
                    >
                        Новый email
                    </label>
                    <input
                        className="input-field"
                        name="newEmail"
                        type="text"
                        onChange={handleChangeEmail}
                    />
                    <p className="error-message">{errorEmailChange?.newEmail || ''}</p>
                </div>

                <div className={styles["account-setting__item"]}>
                    <label
                        className={"form__label"}
                        htmlFor="passwordConfirmation">
                        Пароль для потверждения
                    </label>
                    <input
                        type="password"
                        name="passwordConfirmation"
                        className="input-field"
                        onChange={handleChangeEmail}
                    />
                    <p className="error-message">{errorEmailChange?.passwordConfirmation || ''}</p>
                </div>

                <button onClick={updateProfileEmail} className="save-changes-btn">Сохранить изменения</button>
            </form>
        </div>
    );
};