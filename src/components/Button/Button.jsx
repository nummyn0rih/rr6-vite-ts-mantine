import PropTypes from 'prop-types';
import './Button.css';

export const Button = (props) => {
  return (
    <button className='btn' onClick={props.handler}>
      {props.children}
    </button>
  )
};

Button.propTypes = {
  handler: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.elementType
  ])
};
