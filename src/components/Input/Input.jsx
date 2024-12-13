import inputStyle from './Input.module.scss';

export default function Input({ text, type = 'text' }) {
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
      />
      {type === 'checkbox' && <span className={inputStyle.labelInput__checkbox}></span>}
    </label>
  );
}
