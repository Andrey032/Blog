import style from './ButtonSubmit.module.scss';

const ButtonSubmit = ({ textBtn, isValid }) => {
  return (
    <button type='submit' className={style.button} disabled={!isValid}>
      {textBtn}
    </button>
  );
};

export default ButtonSubmit;
