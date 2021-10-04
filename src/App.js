// import "./App.css";
import { Fragment } from 'react';

import { Switch, Route } from 'react-router-dom';

import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Channels from './pages/Channels';
import AddChannel from './pages/AddChannel';

function App() {
  return (
    <Fragment>
      <Layout>
        <Switch>
          <Route exact path='/' component={Dashboard}></Route>
          <Route exact path='/channels' component={Channels}></Route>
          <Route exact path='/add-channel' component={AddChannel}></Route>
        </Switch>
      </Layout>
    </Fragment>
  );
}

export default App;
