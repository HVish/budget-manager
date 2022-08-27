import { BrowserRouter } from 'react-router-dom';

import Main from './Main';
import Styles from './Main/Styles';

function App() {
  return (
    <BrowserRouter>
      <Styles />
      <Main />
    </BrowserRouter>
  );
}

export default App;
