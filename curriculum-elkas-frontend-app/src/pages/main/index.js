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
        <div class="col m7 push-m3 collap">
          <ul class="collapsible popout">
            <li>
              <div class="collapsible-header"><i class="material-icons">input</i>Entrar</div>
              <div class="collapsible-body">
              <SignIn /> 
              </div>
            </li>
            <li>
              <div class="collapsible-header"><i class="material-icons">view_agenda</i>Cadastrar</div>
              <div class="collapsible-body">
              <SignUp />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </Fragment>
);

export default Main;
