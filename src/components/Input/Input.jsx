import inputStyle from './Input.module.scss';

export default function Input({ text, type = 'text', pattern, required = false }) {
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
        pattern={pattern}
        required={required}
      />
      {type !== 'checkbox' && (
        <span className={inputStyle.labelInput__error}>
          Your password needs to be at least 6 characters.
        </span>
      )}
      {type === 'checkbox' && <span className={inputStyle.labelInput__checkbox}></span>}
    </label>
  );
}
