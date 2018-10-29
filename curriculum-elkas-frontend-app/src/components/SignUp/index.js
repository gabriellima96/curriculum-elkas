import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SignUp = () => (
  <div className="col m6">
    <div className="card">
      <form>
        <h4>Cadastrar</h4>
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
        <div className="row">
          <div className="input-field col s12">
            <input id="password" type="password" className="validate" />
            <label htmlFor="password">Repetir a senha</label>
          </div>
        </div>
        <button className="btn waves-effect waves-light" type="submit" name="action" id="cadastrar">
          Cadastrar
          {' '}
          <FontAwesomeIcon icon="user-plus" />
        </button>
      </form>
    </div>
  </div>
);

export default SignUp;
