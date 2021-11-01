import './Promo.css';
import promoImagePath from '../../../images/promo.svg';

function Promo() {
    return (
        <section className="promo">
            <div className="promo__container">
                <h1 className="promo__heading">Учебный проект студента факультета Веб-разработки.</h1>
                <img className="promo__image" src={promoImagePath} alt="Учебный проект" />
            </div>
        </section>
    );
}

export default Promo;