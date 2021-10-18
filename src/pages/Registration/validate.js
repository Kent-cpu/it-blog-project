import firebase from "firebase/compat";


export const validate = async (values) => {
    let error = {};
    const regularEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    const regularDisplayName = /^[a-z0-9_-]{3,15}$/; // длина от 3 до 15, a-z _ -

    const dataUniquenessCheck = async (value, key, nameCollection, errorMessage) => {
        await firebase.firestore()
            .collection(nameCollection)
            .get()
            .then((snippetsSnapshot) => {
                const snippets = snippetsSnapshot.docs.map(doc => doc.data()[key]);
                if(snippets.indexOf(value) !== -1){
                    error[key] = errorMessage;
                }
            });
    }

    if(!values.email){
        error.email = "Обязательное поле";
    }else if(!regularEmail.test(values.email)){
        error.email = "Неверный формат";
    }else{
        await dataUniquenessCheck(values.email, "email", "Users", "Почта уже зарегистрирована");
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
    }else{
        await dataUniquenessCheck(values.displayName, "displayName", "Users", "Имя уже зарегистрировано, попробуйте другое");
    }

    if(!values.password){
        error.password = "Обязательное поле";
    }

    return error;
}