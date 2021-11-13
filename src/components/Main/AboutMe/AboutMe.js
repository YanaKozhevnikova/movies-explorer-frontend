import './AboutMe.css';
import profilePicturePath from '../../../images/about-me.jpg';

function AboutMe() {
    return (
        <section className="about-me main__section">
            <h2 className="main__section-heading">Студент</h2>
            <div className="about-me__container">
                <div className="about-me__description">
                    <h3 className="about-me__name">Яна</h3>
                    <h4 className="about-me__job">Фронтенд-разработчик, 22 года</h4>
                    <p className="about-me__about">Я родилась и живу в Москве, сейчас заканчиваю медицинский факультет МГУ. С января учусь веб-разработке, с конца лета работаю на позиции джуниор фронтенд-разработчика параллельно с учебой.</p>
                    <div className="about-me__links">
                        <a className="about-me__link" href="https://t.me/kozhevnikovayana" target="_blank" rel="noreferrer">Telegram</a>
                        <a className="about-me__link" href="https://github.com/YanaKozhevnikova" target="_blank" rel="noreferrer">Github</a>
                    </div>
                </div>
                <img className="about-me__image" src={profilePicturePath} alt="Студент" />
            </div>
        </section>
    );
}

export default AboutMe;