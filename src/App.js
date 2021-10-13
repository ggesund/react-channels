// import "./App.css";
import { Fragment } from 'react';

import { Switch, Route } from 'react-router-dom';

import CustomSnackbar from './components/CustomSnackbar';

import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Channels from './pages/Channels';
import AddChannel from './pages/AddChannel';
import AddImage from './pages/AddImage';
import Images from './pages/Images';

function App() {
  return (
    <Fragment>
      <Layout>
        <Switch>
          <Route exact path='/' component={Dashboard}></Route>
          <Route exact path='/channels' component={Channels}></Route>
          <Route exact path='/images' component={Images}></Route>
          <Route exact path='/add-channel' component={AddChannel}></Route>
          <Route exact path='/add-image' component={AddImage}></Route>
        </Switch>
      </Layout>
      <CustomSnackbar />
    </Fragment>
  );
}

export default App;
