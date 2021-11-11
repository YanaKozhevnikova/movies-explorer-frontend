import React from 'react';
import './Profile.css';

function Profile({onSignOut}) {
    const [userName, setUserName] = React.useState('Виталий');
    const [email, setEmail] = React.useState('pochta@yandex.ru');
    const [isEdit, setIsEdit] = React.useState(false);

    function handleToggleEdit() {
        setIsEdit(isEdit ? false : true);
    }


    function handleNameChange(e) {
        setUserName(e.target.value);
    }

    function handleEmailChange(e) {
        setEmail(e.target.value);
    }


    return (
        <section className="profile">
            <h2 className="profile__heading">Привет, {userName}!</h2>
            <form className="profile__form" name="profile">
                <label className="profile__label">
                    Имя
                    <input type="text" className="profile__input" name="name" value={userName} onChange={handleNameChange} disabled={!isEdit} placeholder="Имя" />
                </label>
                <label className="profile__label">
                    E-mail
                    <input type="text" className="profile__input"  name="email" value={email} onChange={handleEmailChange} disabled={!isEdit} placeholder="Email" />
                </label>
                <button onClick={handleToggleEdit} className="profile__button profile__button_type_edit" type="button">{isEdit ? 'Сохранить' : 'Редактировать'}</button>
                <button onClick={onSignOut} className="profile__button profile__button_type_exit" type="button">Выйти из аккаунта</button>
            </form>
        </section>
    );
}

export default Profile;