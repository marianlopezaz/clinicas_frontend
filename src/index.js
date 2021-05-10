import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import './index.css?v=2';
// Componentes y Utilities
import App from './App';
// Router
import { BrowserRouter, withRouter} from 'react-router-dom';
// Import Dependencias
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import esLocale from "date-fns/locale/es";
// Redux
import configureStore from './Redux/configureStore';
import { Provider } from 'react-redux';

const AppContainer = withRouter(props => <App {...props} />)

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
        <AppContainer />
      </MuiPickersUtilsProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);


serviceWorker.unregister();
