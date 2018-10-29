import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import Content from './pages/main';
import './styles/styles.css';

library.add(faSignInAlt, faUserPlus);

const App = () => (
  <div className="App">
    <Content />
  </div>
);

export default App;
