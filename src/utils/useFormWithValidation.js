import React from "react";

export function useFormWithValidation({initialValues, initialErrors, formSelector}) {
    const [values, setValues] = React.useState(initialValues);
    const [errors, setErrors] = React.useState(initialErrors);
    const [isValid, setIsValid] = React.useState(false);

    function handleValuesChange(e) {
        setValues({...values, [e.target.name]: e.target.value});
        setErrors({...errors, [e.target.name]: e.target.validationMessage});
        setIsValid(e.target.closest(formSelector).checkValidity());
    }

    function resetForm() {
        setIsValid(false);
    }

    return {values, errors, isValid, handleValuesChange, resetForm}
}