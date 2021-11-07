import './Portfolio.css';

function Portfolio() {
    return (
        <section className="portfolio main__section">
            <h3 className="portfolio__heading">Портфолио</h3>
            <ul className="portfolio__links-list">
                <li className="portfolio__item">
                    <a className="portfolio__link-text" href="https://yanakozhevnikova.github.io/how-to-learn/" target="_blank" rel="noreferrer">
                        Статичный сайт
                        <span className="portfolio__link-icon">&#8599;</span>
                    </a>
                </li>
                <li className="portfolio__item">
                    <a className="portfolio__link-text" href="https://yanakozhevnikova.github.io/russian-travel/" target="_blank" rel="noreferrer">
                        Адаптивный сайт
                        <span className="portfolio__link-icon">&#8599;</span>
                    </a>
                </li>
                <li className="portfolio__item">
                    <a className="portfolio__link-text" href="https://yanakozhevnikova.github.io/mesto/" target="_blank" rel="noreferrer">
                        Одностраничное приложение
                        <span className="portfolio__link-icon">&#8599;</span>
                    </a>
                </li>
            </ul>
        </section>
    );
}

export default Portfolio;