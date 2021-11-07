import './AboutProject.css';

function AboutProject() {
    return (
        <section className="about-project main__section">
            <h2 className="main__section-heading">О проекте</h2>
            <div className="about-project__description">
                <div>
                    <h3 className="about-project__column-heading">Дипломный проект включал 5 этапов</h3>
                    <p className="about-project__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                </div>
                <div>
                    <h3 className="about-project__column-heading">На выполнение диплома ушло 5 недель</h3>
                    <p className="about-project__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </div>
            </div>
            <div className="about-project__timeline">
                <div className="about-project__weeks about-project__weeks_dark">1 неделя</div>
                <div className="about-project__weeks">4 недели</div>
                <div className="about-project__timeline-caption">Back-end</div>
                <div className="about-project__timeline-caption">Front-end</div>
            </div>
        </section>
    );
}

export default AboutProject;