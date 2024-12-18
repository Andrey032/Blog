import PropTypes from 'prop-types';
import classNames from 'classnames';

import style from './Button.module.scss';

const Button = ({ text, color = '', size = '', onClick, type = 'button', disabled = false }) => {
  const colorBtn = classNames(
    color ? `${style.button} ${style[color]} ${style[size]}` : style.button
  );

  return (
    <button onClick={onClick} className={colorBtn} type={type} disabled={disabled}>
      {text}
    </button>
  );
};

export default Button;

Button.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
};
