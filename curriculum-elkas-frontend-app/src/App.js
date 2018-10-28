import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons'
import Header from './components/Header';
import Content from './components/Content';
import './styles.css';

library.add(faSignInAlt)

const App = () => (
    <div className="App">
        <Header/>
        <Content/>
    </div>
  );

export default App;
