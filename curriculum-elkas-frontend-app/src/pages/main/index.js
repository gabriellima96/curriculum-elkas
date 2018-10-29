import React, { Fragment } from 'react';
import SignUp from '../../components/SignUp';
import SignIn from '../../components/SignIn';
import Header from '../../components/Header';
import './styles.css';

const Main = () => (
  <Fragment>
    <Header />
    <div className="container">
      <div className="row">
        <SignIn />
        <SignUp />
      </div>
    </div>
  </Fragment>
);

export default Main;
