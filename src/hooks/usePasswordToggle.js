import {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";


export const usePasswordToggle = () => {
    const [visiblePassword, setVisiblePassword] = useState(false);

    const icon = (
        <FontAwesomeIcon
            icon={visiblePassword ? faEyeSlash : faEye}
            onClick ={() => setVisiblePassword(prevVisible => !prevVisible)}
        />
    );

    const inputType = visiblePassword ? "text" : "password";

    return [inputType, icon];
};
