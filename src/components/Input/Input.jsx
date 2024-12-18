import classnames from 'classnames';

import style from './Input.module.scss';

const Input = ({
  text,
  name,
  type = 'text',
  pattern = '',
  title,
  required = false,
  register,
  minLength,
  maxLength,
  errors = '',
  indent = false,
}) => {
  const input = classnames(
    type === 'checkbox'
      ? style.labelInput__checkboxInput
      : errors[name] && errors[name].message !== ''
        ? `${style.labelInput__input} ${style.labelInput__invalid}`
        : style.labelInput__input
  );

  const label = classnames(
    type === 'checkbox'
      ? style.labelCheckbox
      : `${style.labelInput} ${indent && style.labelInput__indent}`
  );

  return (
    <label className={label}>
      {text}
      <input
        className={input}
        type={type}
        placeholder={text}
        title={title}
        {...(register &&
          register(name, {
            required,
            pattern: {
              value: pattern,
              message: `Перепроверьте введённые данные`,
            },
            minLength: {
              value: minLength,
              message: `Минимум ${minLength} символа`,
            },
            maxLength: {
              value: maxLength,
              message: `Максимум ${maxLength} символов`,
            },
          }))}
      />
      {errors[name] && (
        <span
          className={
            name === 'checkbox' ? style.labelInput__errorCheckbox : style.labelInput__error
          }
        >
          {errors[name].message}
        </span>
      )}
      {type === 'checkbox' && <span className={style.labelInput__checkbox}></span>}
    </label>
  );
};

export default Input;
