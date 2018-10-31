import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SignIn = () => (
      <form>
        <h4><i class="material-icons">input</i> Entrar</h4>
        <div className="row">
          <div className="input-field col s12">
            <input id="email_inline" type="email" className="validate" />
            <label htmlFor="email_inline">Email</label>
            <span className="helper-text" data-error="Algo está errado!" data-success="Ok.">
            </span>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input id="password" type="password" className="validate" />
            <label htmlFor="password">Senha</label>
          </div>
        </div>
        <div className=" center-align">
          <button className="waves-effect waves-light btn indigo" type="submit" name="action">
            Entrar
            {' '}
            <FontAwesomeIcon icon="sign-in-alt" />
          </button>
        </div>
      </form>
);

export default SignIn;
