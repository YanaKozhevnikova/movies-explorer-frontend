import './Footer.css';

function Footer() {
    return (
        <footer className="footer main__section">
            <p className="footer__heading">Учебный проект Яндекс.Практикум х BeatFilm.</p>
            <div className="footer__container">
                <p className="footer__copyright">&copy; 2021</p>
                <ul className="footer__links">
                    <li className="footer__links-item">
                        <a className="footer__link" href="https://practicum.yandex.ru/" target="_blank" rel="noreferrer">Яндекс.Практикум</a>
                    </li>
                    <li className="footer__links-item">
                        <a className="footer__link" href="https://github.com/YanaKozhevnikova" target="_blank" rel="noreferrer">Github</a>
                    </li>
                    <li className="footer__links-item">
                        <a className="footer__link" href="https://t.me/kozhevnikovayana" target="_blank" rel="noreferrer">Telegram</a>
                    </li>
                </ul>
            </div>
        </footer>
    );
}

export default Footer;