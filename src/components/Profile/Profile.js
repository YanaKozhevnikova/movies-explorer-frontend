import React from 'react';
import './Profile.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useFormWithValidation } from '../../utils/useFormWithValidation';
import { NAME_PATTERN, INFO_MESSAGES, STATUS_CODES } from '../../utils/constants';
import Preloader from '../Preloader/Preloader';


function Profile({onUpdateUser, onSignOut, isLoading, isFormLoading, updateStatus}) {
    const context = React.useContext(CurrentUserContext);
    const { values, errors, isValid, handleValuesChange, resetForm } = useFormWithValidation({
        initialValues: {name: context.currentUser.name, email:context.currentUser.email},
        initialErrors: {name: '', email: ''},
        formSelector: '.profile__form',
    });
    const [isEdit, setIsEdit] = React.useState(false);
    const [updateText, setUpdateText] = React.useState('');
    const [isSameData, setIsSameData] = React.useState(true);

    React.useEffect(() => {
        if (values.name === context.currentUser.name && values.email === context.currentUser.email) {
            setIsSameData(true);
        } else {
            setIsSameData(false);
        }
    }, [values, context.currentUser]);

    React.useEffect(() => {
        if (updateStatus) {
            if (updateStatus === STATUS_CODES.success) {
                setUpdateText(INFO_MESSAGES.successfulUpdate);
                setIsEdit(false);
                resetForm();
            } else if (updateStatus === STATUS_CODES.incorrectData) {
                setUpdateText(INFO_MESSAGES.incorrectData);
            } else if (updateStatus === STATUS_CODES.emailExistsError) {
                setUpdateText(INFO_MESSAGES.emailExistsError);
            } else if (updateStatus === STATUS_CODES.serverError) {
                setUpdateText(INFO_MESSAGES.serverError);
            } else {
                setUpdateText(INFO_MESSAGES.updateUserError);
            }    
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [updateStatus]);

    function enableEdit() {
        setIsEdit(true);
    }

    function updateUserInfo(e) {
        e.preventDefault();
        onUpdateUser({name: values.name, email: values.email});
    }

    return (
        <section className="profile">
            {isLoading ? (
                <Preloader />
            ) : (
                <>
                    <h2 className="profile__heading">Привет, {values.name}!</h2>
                    <form className="profile__form" name="profile" onSubmit={updateUserInfo}>
                        <label className={`profile__label ${errors.name ? 'profile__label_error' : ''}`}>
                            Имя
                            <input type="text" className={`profile__input ${errors.name ? 'profile__input_error' : ''}`} name="name" value={values.name} minLength="2" pattern={NAME_PATTERN} required onChange={handleValuesChange} disabled={!isEdit} placeholder="Имя" />
                            {errors.name && (
                                <span className="profile__input-error">{errors.name}</span>
                            )}
                        </label>
                        <label className={`profile__label ${errors.email ? 'profile__label_error' : ''}`}>
                            E-mail
                            <input type="email" className={`profile__input ${errors.email ? 'profile__input_error' : ''}`}  name="email" value={values.email} required onChange={handleValuesChange} disabled={!isEdit} placeholder="Email" />
                            {errors.email && (
                                <span className="profile__input-error">{errors.email}</span>
                            )}
                        </label>
                        {updateStatus !== 0 && <span className="profile__status">{updateText}</span>}
                        <button onClick={isEdit ? updateUserInfo : enableEdit} className={`profile__button profile__button_type_edit ${updateStatus !== 0 ? 'profile__button_status' : ''}`} type="button" disabled={(!isValid && isEdit) || (isSameData && isEdit) || isFormLoading}>{isEdit ? 'Сохранить' : 'Редактировать'}</button>
                        <button onClick={onSignOut} className="profile__button profile__button_type_exit" type="button" disabled={isFormLoading}>Выйти из аккаунта</button>
                    </form>
                </>
            )}
        </section>
    );
}

export default Profile;