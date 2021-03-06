import {useState} from 'react';
import {handleChangeInput} from "../utils/handleChangeInput";

export const useForm = () => {
    const [textFields, setTextFields] = useState({
        email: "",
        realName: "",
        nickname: "",
        password: "",
    });

    const handleChange = e => handleChangeInput(e, setTextFields);

    return {
        textFields,
        handleChange,
    };
};

