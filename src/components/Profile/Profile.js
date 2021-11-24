import React from 'react';
import './Profile.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useFormWithValidation } from '../../utils/useFormWithValidation';
import { NAME_PATTERN, INFO_MESSAGES } from '../../utils/constants';
import Preloader from '../Preloader/Preloader';


function Profile({onUpdateUser, onSignOut, isLoading, isFormLoading, updateMessage, setUpdateMessage}) {
    const context = React.useContext(CurrentUserContext);
    const { values, errors, isValid, handleValuesChange, resetForm } = useFormWithValidation({
        initialValues: {name: context.currentUser.name, email:context.currentUser.email},
        initialErrors: {name: '', email: ''},
        formSelector: '.profile__form',
    });
    const [isEdit, setIsEdit] = React.useState(false);
    const [isSameData, setIsSameData] = React.useState(true);

    React.useEffect(() => {
        if (values.name === context.currentUser.name && values.email === context.currentUser.email) {
            setIsSameData(true);
        } else {
            setIsSameData(false);
        }
    }, [values, context.currentUser]);

    React.useEffect(() => {
        if (updateMessage === INFO_MESSAGES.successfulUpdate) {
            setIsEdit(false);
            resetForm();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [updateMessage]);

    function enableEdit() {
        setIsEdit(true);
        setUpdateMessage('');
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
                            <input type="text" className={`profile__input ${errors.name ? 'profile__input_error' : ''}`} name="name" value={values.name} minLength="2" maxLength="30" pattern={NAME_PATTERN} required onChange={handleValuesChange} disabled={!isEdit} placeholder="Имя" />
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
                        {updateMessage && <span className="profile__status">{updateMessage}</span>}
                        <button onClick={isEdit ? updateUserInfo : enableEdit} className={`profile__button profile__button_type_edit ${updateMessage ? 'profile__button_status' : ''}`} type="button" disabled={(!isValid && isEdit) || (isSameData && isEdit) || isFormLoading}>{isEdit ? 'Сохранить' : 'Редактировать'}</button>
                        <button onClick={onSignOut} className="profile__button profile__button_type_exit" type="button" disabled={isFormLoading}>Выйти из аккаунта</button>
                    </form>
                </>
            )}
        </section>
    );
}

export default Profile;