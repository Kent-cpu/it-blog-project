import {VALIDATION_TYPE} from "../../utils/constants";
import {getData} from "../../getData";


export const validate = async (values, validationType) => {
    let error = {};
    const regularEmail = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
    const regularDisplayName = /^[a-z0-9_-]{3,15}$/; // длина от 3 до 15, a-z _ -
    const regularPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/; // пароль от 6, содержит хотя бы 1 цифру , 1 заглавную и 1 строчную букву
    const bcrypt = require("bcryptjs");

    if (!values.realName && values?.realName?.length === 0) {
        error.realName = "Обязательное поле";
    }

    if (!values.nickname && values?.nickname?.length === 0) {
        error.nickname = "Обязательное поле";
    } else if (!regularDisplayName.test(values.displayName)) {
        error.nickname = "Неверный формат";
    } else {
        const data = await getData("Users");
        for (let {nickname} of data) {
            if (values.nickname === nickname) {
                error.nickname = "Имя уже занято";
                break;
            }
        }
    }

    if (!values.email && values?.email?.length === 0) {
        error.email = "Обязательное поле";
    } else if (!regularEmail.test(values.email)) {
        error.email = "Неверный формат";
    } else {
        const data = await getData("Users");
        if (validationType === VALIDATION_TYPE.REGISTRATION) {
            for (let {email} of data) {
                if (values.email === email) {
                    error.email = "Такая электронная почта уже зарегистрирована";
                    break;
                }
            }
        }
    }


    if (!values.password && values?.password?.length === 0) {
        error.password = "Обязательное поле";
    } else if (!regularPassword.test(values.password)) {
        error.password = "Неверный формат";
    }


    if (validationType === VALIDATION_TYPE.AUTHORIZATION && Object.entries(error).length === 0) {
        const data = await getData("Users");
        for (let {email, password} of data) {
            if (values.email === email && bcrypt.compareSync(values.password, password)) {
                values.password = password;
                delete error.email;
                delete error.password;
                break;
            } else {
                error.email = "Неверная электронная почта или пароль";
                error.password = "Неверная электронная почта или пароль";
            }
        }
    }

    return error;
}