import style from './Spiner.module.scss';

const Spiner = () => {
  return (
    <div className={style.container}>
      <span className={style.container__loader}>Load&nbsp;ng</span>
    </div>
  );
};

export default Spiner;
