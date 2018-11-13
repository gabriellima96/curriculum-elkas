import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withRouter } from "react-router-dom";
import { getUsername, logout } from "../../services/auth";
import api from "../../services/api";
import "./styles.css";

class HeaderApp extends Component {
  state = {
    loading: false,
    name: ""
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
        const { history } = this.props;
        history.push("/app");
      } finally {
        this.setState({ loading: false });
      }
    }
  }

  handleLogout = () => {
    logout();
    this.props.history.push("/");
  };

  render() {
    const { name, loading } = this.state;
    return (
      <header>
        <nav>
          <div className="nav-wrapper blue darken-3">
            <a href="/" className="brand-logo left headerApp">
              CurriculumElkas.com
            </a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li>
                <a href="/">
                  Seja bem vindo(a),{" "}
                  {loading ? <i className="fa fa-spinner fa-pulse" /> : name}!
                </a>
              </li>
              <li>
                <a href="/app/settings">
                  <i className="material-icons">settings</i>
                </a>
              </li>
              <li>
                <a href="/" onClick={this.handleLogout}>
                  Sair <FontAwesomeIcon icon="sign-in-alt" />
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
