import firebase from "firebase/compat";


export const validate = async (values) => {
    let error = {};
    const regularEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    const regularDisplayName = /^[a-z0-9_-]{3,15}$/; // длина от 3 до 15, a-z _ -


    // Получение данных из firebase
    const getData = async (nameCollection) => {
        let result = null;
        await firebase.firestore()
            .collection(nameCollection)
            .get()
            .then((snippetsSnapshot) => {
                result = snippetsSnapshot.docs.map(doc => doc.data());
            });
        return result;
    }

    // Проверка данных на уникальность
    const checkDataUniqueness = (verifiedData, data) => {
        if(verifiedData === data){ // если данные совпали и в бд есть такая запись, то вернуть true
            return true;
        }
        return false;
    }

    if(!values.email){
        error.email = "Обязательное поле";
    }else if(!regularEmail.test(values.email)){
        error.email = "Неверный формат";
    }else{
        const data = await getData( "Users");
        for(let {email} of data){
            if(checkDataUniqueness(values.email, email)){
                error.email = "Такая электронная почта уже зарегистрирована";
                break;
            }
        }
    }

    if(!values.name){
        error.name = "Обязательное поле";
    }

    if(!values.surname){
        error.surname = "Обязательное поле";
    }

    if(!values.displayName){
        error.displayName = "Обязательное поле";
    }else if(!regularDisplayName.test(values.displayName)){
        error.displayName = "Неверный формат";
    }
    else{
        const data = await getData( "Users");
        for(let {displayName} of data){
            if(checkDataUniqueness(values.displayName, displayName)){
                error.displayName = "Имя уже занято";
                break;
            }
        }
    }

    if(!values.password){
        error.password = "Обязательное поле";
    }

    return error;
}