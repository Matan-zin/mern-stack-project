import './styles/App.css';
import * as ROUTE from './constants/routes';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AuthenticatedRoute from './halpers/AuthenticatedRoute';

import Login     from './pages/login';
import Signup    from './pages/signup';
import Notfound  from './pages/not-found';
import Dashboard from './pages/dashboard';

function App() {
  return (
    <BrowserRouter>
    <Switch>
    <Route exact path={ ROUTE.LOGIN }   component={ Login }  />
    <Route exact path={ ROUTE.SIGN_UP } component={ Signup } />
    <AuthenticatedRoute strict path={ ROUTE.DASHBOARD } redirect={ROUTE.LOGIN}>
      <Dashboard />
    </AuthenticatedRoute>
    <Route path="*" component={ Notfound } />
    </Switch>
    </BrowserRouter>
  );
}

export default App;
