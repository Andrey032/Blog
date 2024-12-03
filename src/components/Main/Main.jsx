import Card from '../Card/Card';
import { content } from './Main.module.scss';

export default function Main() {
  return (
    <main className={content}>
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
    </main>
  );
}
