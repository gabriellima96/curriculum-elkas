import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSignInAlt, faUserPlus, faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons';
import './styles/styles.css';
import Routes from './routes';
import 'font-awesome/css/font-awesome.css';

library.add(faSignInAlt, faUserPlus, faArrowAltCircleRight);

const App = () => <Routes />;

export default App;
