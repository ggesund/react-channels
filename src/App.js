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
import AddChannelList from './pages/AddChannelList';
import ChannelLists from './pages/ChannelLists';
import UpdateImage from './pages/UpdateImage';

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
          <Route
            exact
            path='/add-channel-list'
            component={AddChannelList}
          ></Route>
          <Route exact path='/channellists' component={ChannelLists}></Route>
          <Route exact path='/image/:imageId' component={UpdateImage}></Route>
        </Switch>
      </Layout>
      <CustomSnackbar />
    </Fragment>
  );
}

export default App;
