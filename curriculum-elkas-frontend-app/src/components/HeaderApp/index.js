import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withRouter } from 'react-router-dom';
import { getUsername, logout } from '../../services/auth';
import api from '../../services/api';

class HeaderApp extends Component {
  state = {
    loading: false,
    name: '',
  };

  async componentDidMount() {
    const username = getUsername();
    if (username) {
      try {
        this.setState({ loading: true });
        const response = await api.get(`/users/${username}`);
        this.setState({ name: response.data.name });
      } catch (error) {
        logout();
        this.props.history.push('/');
      } finally {
        this.setState({ loading: false });
      }
    }
  }

  handleLogout = () => {
    logout();
    this.props.history.push('/');
  };

  render() {
    const { name, loading } = this.state;
    return (
      <header>
        <nav>
          <div className="nav-wrapper grey darken-4">
            <a href="/" className="brand-logo">
              Gerador de Currículo
            </a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li>
                <a href="/">{loading ? <i className="fa fa-spinner fa-pulse" /> : name}</a>
              </li>
              <li>
                <a href="/app/settings">Configurações</a>
              </li>
              <li>
                <a href="/" onClick={this.handleLogout}>
                  Sair
                  {' '}
                  <FontAwesomeIcon icon="sign-in-alt" />
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}

export default withRouter(HeaderApp);
