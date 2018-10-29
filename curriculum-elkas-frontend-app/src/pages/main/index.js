import React, { Fragment } from 'react';
import Cadastrar from '../../components/Cadastrar';
import Entrar from '../../components/Entrar';
import Header from '../../components/Header';
import './styles.css';

const Content = () => (
  <Fragment>
    <Header />
    <content>
      <div className="container">
        <div className="row">
          <Entrar />
          <Cadastrar />
        </div>
      </div>
    </content>
  </Fragment>
);

export default Content;
