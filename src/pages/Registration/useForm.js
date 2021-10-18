import {useState} from 'react';

export const useForm = () => {
    const [textFields, setTextFields] = useState({
        email: "",
        name: "",
        surname: "",
        displayName: "",
        password: "",
    });

    const handleChange = e => {
        setTextFields(prevData => {
            return {
                ...prevData,
                [e.target.name]: e.target.value,
            };
        });
    }



    return {
        textFields,
        setTextFields,
        handleChange,
    };
};

