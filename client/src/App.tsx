import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import Main from './Main';
import Styles from './Main/Styles';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Styles />
        <Main />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
