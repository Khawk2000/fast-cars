import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function CarCard(props) {
  return (
    <>
      <li className='car-card'>
        <Link className='car-card-link' to={props.path}>
          <figure className='car-card__pic-wrap' data-category={props.label}>
            <img src={props.src} alt='Car-image' className='car-card-image'/>
          </figure>
          <div className="car-card-info">
            <h5 className="car-card-text">{props.year} {props.make} {props.model}</h5>
          </div>
        </Link>
      </li>
    </>
  )
}

CarCard.propTypes = {
    make: PropTypes.string,
    model: PropTypes.string,
    year: PropTypes.string,
    src: PropTypes.string,
    label: PropTypes.string,
    path: PropTypes.string
}

export default CarCard
