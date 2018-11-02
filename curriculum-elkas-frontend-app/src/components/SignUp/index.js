import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import api from '../../services/api';

class SignUp extends Component {
  state = {
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    error: '',
    loading: false,
  };

  handleSignUp = async (e) => {
    e.preventDefault();
    const {
      name, email, password, username, confirmPassword,
    } = this.state;
    if (!name || !email || !password || !username || !confirmPassword) {
      this.setState({ error: 'Preencha todos os dados para se cadastrar' });
    } else if (password !== confirmPassword) {
      this.setState({ error: 'As senhas não conferem' });
    } else {
      try {
        this.setState({ loading: true });
        const response = await api.post('/users', {
          name,
          username,
          email,
          password,
        });

        console.log(response);
        console.log('criado com sucesso');
        this.setState({ error: '' });
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
      <form onSubmit={this.handleSignUp}>
        <h4>
          <i className="material-icons">view_agenda</i>
          Cadastrar
        </h4>
        <div className="row">
          <div className="input-field col s12">
            <input
              id="name_inline"
              type="text"
              className="validate"
              onChange={e => this.setState({ name: e.target.value })}
            />
            <label htmlFor="name_inline">Nome completo</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input
              id="username_inline"
              type="text"
              className="validate"
              onChange={e => this.setState({ username: e.target.value })}
            />
            <label htmlFor="username_inline">Nome de usuário</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input
              id="email_inline"
              type="email"
              className="validate"
              onChange={e => this.setState({ email: e.target.value })}
            />
            <label htmlFor="email_inline">Email</label>
            <span className="helper-text" data-error="Algo está errado!" data-success="Ok." />
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input
              id="password"
              type="password"
              className="validate"
              onChange={e => this.setState({ password: e.target.value })}
            />
            <label htmlFor="password">Senha</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input
              id="confirmPassword"
              type="password"
              className="validate"
              onChange={e => this.setState({ confirmPassword: e.target.value })}
            />
            <label htmlFor="confirmPassword">Confirmar senha</label>
          </div>
        </div>

        <div className=" center-align">
          <button className="waves-effect waves-light btn indigo" type="submit" name="action">
            Cadastrar
            {' '}
            {!loading ? (
              <FontAwesomeIcon icon="user-plus" />
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
export default SignUp;
