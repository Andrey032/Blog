import spinerStyle from './Spiner.module.scss';

export default function Spiner() {
  return (
    <div className={spinerStyle.container}>
      <span className={spinerStyle.container__loader}>Load&nbsp;ng</span>
    </div>
  );
}
