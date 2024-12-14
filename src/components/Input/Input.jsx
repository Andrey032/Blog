import inputStyle from './Input.module.scss';

export default function Input({
  text,
  name,
  type = 'text',
  pattern,
  required = false,
  register,
  errors,
  minLength,
  maxLength,
}) {
  return (
    <label className={type === 'checkbox' ? inputStyle.labelCheckbox : inputStyle.labelInput}>
      {text}
      <input
        className={
          type === 'checkbox' ? inputStyle.labelInput__checkboxInput : inputStyle.labelInput__input
        }
        type={type}
        name={text}
        placeholder={text}
        {...(register &&
          register(name, {
            required,
            pattern,
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
            name === 'checkbox'
              ? inputStyle.labelInput__errorCheckbox
              : inputStyle.labelInput__error
          }
        >
          {errors[name].message}
        </span>
      )}

      {type === 'checkbox' && <span className={inputStyle.labelInput__checkbox}></span>}
    </label>
  );
}
