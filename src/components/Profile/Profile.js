import React from 'react';
import './Profile.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useFormWithValidation } from '../../utils/useFormWithValidation';
import { NAME_PATTERN } from '../../utils/constants';
import Preloader from '../Preloader/Preloader';


function Profile({onUpdateUser, onSignOut, isLoading}) {
    const context = React.useContext(CurrentUserContext);
    const { values, errors, isValid, handleValuesChange, resetForm } = useFormWithValidation({
        initialValues: {name: context.currentUser.name, email:context.currentUser.email},
        initialErrors: {name: '', email: ''},
        formSelector: '.profile__form',
    });
    const [isEdit, setIsEdit] = React.useState(false);

    function enableEdit() {
        setIsEdit(true);
    }

    function updateUserInfo(e) {
        e.preventDefault();
        onUpdateUser({name: values.name, email: values.email});
        setIsEdit(false);
        resetForm();
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
                        <button onClick={isEdit ? updateUserInfo : enableEdit} className="profile__button profile__button_type_edit" type="button" disabled={!isValid && isEdit}>{isEdit ? 'Сохранить' : 'Редактировать'}</button>
                        <button onClick={onSignOut} className="profile__button profile__button_type_exit" type="button">Выйти из аккаунта</button>
                    </form>
                </>
            )}
        </section>
    );
}

export default Profile;