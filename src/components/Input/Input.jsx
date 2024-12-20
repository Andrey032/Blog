import classnames from 'classnames';
import { useFormContext } from 'react-hook-form';

import style from './Input.module.scss';

const Input = ({
  text,
  name,
  type = 'text',
  pattern = '',
  title,
  required = false,
  minLength,
  maxLength,
  indent = false,
}) => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const password = watch('password');

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

  const validationRules = {
    required,
    pattern: pattern
      ? {
          value: pattern,
          message: 'Перепроверьте введённые данные',
        }
      : undefined,
    minLength: minLength
      ? {
          value: minLength,
          message: `Минимум ${minLength} символов`,
        }
      : undefined,
    maxLength: maxLength
      ? {
          value: maxLength,
          message: `Максимум ${maxLength} символов`,
        }
      : undefined,
  };

  if (name === 'confirmPassword') {
    validationRules.validate = (value) => value === password || 'Пароли не совпадают';
  }

  return (
    <label className={label}>
      {text}
      <input
        className={input}
        type={type}
        placeholder={text}
        title={title}
        {...register(name, validationRules)}
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
