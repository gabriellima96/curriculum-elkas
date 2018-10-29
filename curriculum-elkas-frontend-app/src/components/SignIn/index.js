import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SignIn = () => (
  <div className="col m6">
    <div className="card">
      <form>
        <h4>Entrar</h4>
        <div className="row">
          <div className="input-field col s12">
            <input id="email_inline" type="email" className="validate" />
            <label htmlFor="email_inline">Email</label>
            <span className="helper-text" data-error="Algo está errado!" data-success="Ok.">
              Verificação
            </span>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input id="password" type="password" className="validate" />
            <label htmlFor="password">Senha</label>
          </div>
        </div>
        <button className="btn waves-effect waves-light" type="submit" name="action" id="entrar">
          Entrar
          {' '}
          <FontAwesomeIcon icon="sign-in-alt" />
        </button>
      </form>
    </div>
  </div>
);

export default SignIn;
