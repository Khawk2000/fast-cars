import PropTypes from 'prop-types';


function CarCard({carName}) {
  return (
    <div>
      This is car number {carName}
    </div>
  )
}

CarCard.propTypes = {
    carName: PropTypes.string
}

export default CarCard
