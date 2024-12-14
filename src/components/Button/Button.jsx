import PropTypes from 'prop-types';
import classNames from 'classnames';
import buttonStyle from './Button.module.scss';

export default function Button({ text, color = '', size = '' }) {
  const colorBtn = classNames(
    color ? `${buttonStyle.button} ${buttonStyle[color]} ${buttonStyle[size]}` : buttonStyle.button
  );

  return <button className={colorBtn}>{text}</button>;
}

Button.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
};
