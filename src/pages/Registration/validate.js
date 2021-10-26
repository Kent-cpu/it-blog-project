import {VALIDATION_TYPE} from "../../utils/constants";
import {getData} from "../../getData";


export const validate = async (values, validationType) => {
    let error = {};
    const regularEmail = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
    const regularDisplayName = /^[a-z0-9_-]{3,15}$/; // длина от 3 до 15, a-z _ -
    const regularPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/; // пароль от 6, содержит хотя бы 1 цифру , 1 заглавную и 1 строчную букву

    // Проверка данных на уникальность
    const checkDataUniqueness = (verifiedData, data) => {
        if(verifiedData === data){ // если данные совпали и в бд есть такая запись, то вернуть true
            return true;
        }
        return false;
    }

    if(!values.name && values?.name?.length === 0){
        error.name = "Обязательное поле";
    }

    if(!values.surname && values?.surname?.length === 0){
        error.surname = "Обязательное поле";
    }

    if(!values.displayName && values?.displayName?.length === 0){
        error.displayName = "Обязательное поле";
    }else if(!regularDisplayName.test(values.displayName)){
        error.displayName = "Неверный формат";
    } else{
        const data = await getData( "Users");
        for(let {displayName} of data){
            if(checkDataUniqueness(values.displayName, displayName)){
                error.displayName = "Имя уже занято";
                break;
            }
        }
    }

    if(!values.email && values?.password?.length === 0){
        error.email = "Обязательное поле";
    }else if(!regularEmail.test(values.email)){
        error.email = "Неверный формат";
    }else{
        const data = await getData( "Users");
        if(validationType === VALIDATION_TYPE.REGISTRATION){
            for(let {email} of data) {
                if(checkDataUniqueness(values.email, email)){
                    error.email = "Такая электронная почта уже зарегистрирована";
                    break;
                }
            }
        }

        if(validationType === VALIDATION_TYPE.AUTHORIZATION){
            for(let {email} of data) {
                if(checkDataUniqueness(values.email, email)){
                    delete error.email;
                    break;
                }else{
                    error.email = "Неверная электронная почта или пароль";
                }
            }
        }
    }


    if(!values.password && values?.password?.length === 0){
        error.password = "Обязательное поле";
    }else if(!regularPassword.test(values.password)){
        error.password = "Неверный формат";
    }else{
        const data = await getData( "Users");
        if(validationType === VALIDATION_TYPE.AUTHORIZATION){
            for(let {password} of data) {
                if(checkDataUniqueness(values.password, password)){
                    delete error.password;
                    break;
                }else{
                    error.password = "Неверный электронная почта или пароль";
                }
            }
        }
    }

    return error;
}