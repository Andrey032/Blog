import PropTypes from 'prop-types';
import classNames from 'classnames';
import buttonStyle from './Button.module.scss';

export default function Button({ text, color = '' }) {
  const colorBtn = classNames(
    color ? `${buttonStyle.button} ${buttonStyle[color]}` : buttonStyle.button
  );

  return <button className={colorBtn}>{text}</button>;
}

Button.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
};
