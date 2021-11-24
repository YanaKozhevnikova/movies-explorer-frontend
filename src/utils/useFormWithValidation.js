import React from "react";
import validator from 'validator';
import { INFO_MESSAGES } from "./constants";


export function useFormWithValidation({initialValues, initialErrors, formSelector}) {
    const [values, setValues] = React.useState(initialValues);
    const [errors, setErrors] = React.useState(initialErrors);
    const [isValid, setIsValid] = React.useState(false);

    function handleValuesChange(e) {
        setValues({...values, [e.target.name]: e.target.value});
        if (e.target.name === 'email') {
            if (!validator.isEmail(e.target.value)) {
                e.target.setCustomValidity(INFO_MESSAGES.incorrectEmailFormat);
            } else {
                e.target.setCustomValidity('');
            }
        }
        setErrors({...errors, [e.target.name]: e.target.validationMessage});
        setIsValid(e.target.closest(formSelector).checkValidity());
    }

    function resetForm() {
        setIsValid(false);
    }

    return {values, errors, setErrors, isValid, handleValuesChange, resetForm}
}