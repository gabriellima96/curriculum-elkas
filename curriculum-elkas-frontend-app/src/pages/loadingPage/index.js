import React from 'react';
import { Preloader } from 'react-materialize';
import './style.css';

const LoadingPage = () => (
  <div className="content">
    <div className="row">
      <div className="col s12 alert2">
        <h4>buscando o currículo...</h4>
        <h5>Relaxa aí, estamos procurando... ;)</h5>
        <br />
        <Preloader size="big" flashing />
      </div>
    </div>
  </div>
);
export default LoadingPage;
