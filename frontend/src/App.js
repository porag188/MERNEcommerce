import React, { Component } from 'react';
import AppNavbar from './components/AppNavbar';
import ShoppingList from './components/ShoppingList';
import ItemModal from './components/ItemModal';
import { Container } from 'reactstrap';
import { Provider } from 'react-redux';
import { loadUser } from './actions/authActions';
import store from './store';
import './App.css';

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {
    return (
      <Provider store={store}>
        <div className='App'>
          <AppNavbar />
          <Container>
            <ItemModal />
            <ShoppingList />
          </Container>
        </div>
      </Provider>
    );
  }
}

export default App;

//rm -rf node_modules && npm cache clean --force && npm install
// "frontend-install": "npm install --prefix client",
// "start": "node server.js",
// "server": "nodemon server.js",
// "frontend": "npm start --prefix frontend",
// "dev": "concurrently \"npm run server\" \"npm run frontend\""
