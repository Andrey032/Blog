import { app } from './App.module.scss';
import Header from '../Header';
import Main from '../Main/Main';

//реалезовать лайк кустомный инпут

function App() {
  return (
    <div className={app}>
      <Header />
      <Main />
    </div>
  );
}

export default App;
