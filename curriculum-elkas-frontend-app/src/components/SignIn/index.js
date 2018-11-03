import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withRouter } from 'react-router-dom';
import api from '../../services/api';
import { login, username } from '../../services/auth';

class SignIn extends Component {
  state = {
    email: '',
    password: '',
    loading: '',
    error: '',
  };

  handleSignIn = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;

    if (!email || !password) {
      this.setState({ error: 'Preencha todos os dados para entrar' });
    } else {
      try {
        this.setState({ loading: true });
        const response = await api.post('/users/signin', { email, password });
        login(response.data.token);
        username(response.data.user.username);
        const { history } = this.props;
        history.push('/app');
      } catch (error) {
        this.setState({ error: error.response.data.error });
      } finally {
        this.setState({ loading: false });
      }
    }
  };

  render() {
    const { error, loading } = this.state;

    return (
      <form onSubmit={this.handleSignIn}>
        <h4>
          <i className="material-icons">input</i>
          {' '}
Entrar
        </h4>
        <div className="row">
          <div className="input-field col s12">
            <input
              id="email_inline_input"
              type="email"
              className="validate"
              onChange={e => this.setState({ email: e.target.value })}
            />
            <label htmlFor="email_inline_input">Email</label>
            <span className="helper-text" data-error="Algo está errado!" data-success="Ok." />
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input
              id="password_input"
              type="password"
              className="validate"
              onChange={e => this.setState({ password: e.target.value })}
            />
            <label htmlFor="password_input">Senha</label>
          </div>
        </div>
        <div className=" center-align">
          <button className="waves-effect waves-light btn indigo" type="submit" name="action">
            Entrar
            {' '}
            {!loading ? (
              <FontAwesomeIcon icon="sign-in-alt" />
            ) : (
              <i className="fa fa-spinner fa-pulse" />
            )}
          </button>
        </div>

        {error && <p className="center-align red-text">{error}</p>}
      </form>
    );
  }
}

export default withRouter(SignIn);
