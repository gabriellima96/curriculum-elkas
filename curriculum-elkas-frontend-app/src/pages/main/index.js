import React, { Fragment } from 'react';
import SignUp from '../../components/SignUp';
import SignIn from '../../components/SignIn';
import Header from '../../components/Header';
import './styles.css';

const Main = () => (
  <Fragment>    
    <Header /> 
    <div className="container">    
      <div className="row collap">
        <div class="col m12 s12">
          <ul class="collapsible popout">
            <li>
              <div class="collapsible-header"><i class="material-icons">input</i>Entrar</div>
              <div class="collapsible-body">
                        
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
