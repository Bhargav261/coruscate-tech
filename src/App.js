import React from 'react'
import Blog from './Blog/blog'
import BolgDetails from './Blog/blogDetails'
import PostDetails from './Blog/postDetails'
import {Switch, Route, Redirect} from 'react-router-dom';
import TemporaryDrawer from './Blog/drawer'

function App() {
  
  return (
    <>
      <TemporaryDrawer/>
      <Switch>
        <Route exact path="/" component={Blog} />
        <Route exact path="/authorDetails/:id" component={BolgDetails} />
        {/* <Route exact path="/authorDetails/:id/:name" component={BolgDetails} /> */}
        <Route exact path="/postDetails/:id" component={PostDetails} />
        <Redirect to="/" />
      </Switch>
    </>
  );
}

export default App;
