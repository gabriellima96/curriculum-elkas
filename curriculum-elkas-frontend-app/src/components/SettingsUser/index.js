/* eslint-disable react/button-has-type */
import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input } from "react-materialize";
import api from "../../services/api";
import { getUsername } from "../../services/auth";

import "./styles.css";

class SettingsUser extends Component {
  state = {
    addEmail: [],
    message: "",
    user: ""
  };

  async componentDidMount() {
    try {
      const username = getUsername();
      const { data } = await api.get(`/users/${username}`);
      this.setState({ user: data });
    } catch (error) {
      console.log(error);
    }
  }

  addEmails(e) {
    e.preventDefault();
    const { addEmail } = this.state;
    const newEmail = this.newEmail.value;

    const isOnTheList = addEmail.includes(newEmail);

    if (isOnTheList) {
      this.setState({
        message: "Esse email já foi adicionado."
      });
    } else if (newEmail !== "") {
      this.setState({
        addEmail: [...addEmail, newEmail],
        message: ""
      });
    }

    this.addForm.reset();
  }

  deleteEmail(email) {
    const { addEmail } = this.state;
    const newaddEmail = addEmail.filter(
      individualEmail => individualEmail !== email
    );

    this.setState({
      addEmail: [...newaddEmail]
    });
  }

  render() {
    const { addEmail, message, user } = this.state;

    return (
      <div className="container">
        <div className="row titleForm">
          <h5 className="titleConfigs">Configurações da conta</h5>
          <div className="container">
            <form className="col s12 formSettings">
              <div className="row">
                <h5 className="subtitle center-align">
                  Informações da conta
                  <hr />
                </h5>
                <div className="input-field col s6">
                  <p>Nome de usuário</p>
                  <input
                    id="user_name"
                    type="text"
                    className="validate"
                    value={user.username}
                    onChange={e => {
                      user.username = e.target.value;
                      return this.setState({ user });
                    }}
                  />
                </div>
                <div className="input-field col s6">
                  <p>Nome completo</p>
                  <input
                    id="first_name"
                    type="text"
                    className="validate"
                    value={user.name}
                    onChange={e => {
                      user.name = e.target.value;
                      return this.setState({ user });
                    }}
                  />
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <p htmlFor="disabled">Email</p>
                  <input
                    disabled
                    id="disabled"
                    type="text"
                    className="validate"
                    value={user.email}
                    onChange={e => {
                      user.email = e.target.value;
                      return this.setState({ user });
                    }}
                  />
                </div>
              </div>
              <div className="row">
                <div className="input-field col s6">
                  <input
                    id="oldpassword"
                    type="password"
                    className="validate"
                  />
                  <label htmlFor="oldpassword'">Senha atual</label>
                </div>
                <div className="input-field col s6">
                  <input
                    id="newPassword"
                    type="password"
                    className="validate"
                  />
                  <label htmlFor="newPassword">Nova senha</label>
                </div>
              </div>

              <div className=" center-align">
                <button
                  className="waves-effect waves-light btn indigo"
                  type="submit"
                  name="action"
                >
                  Salvar mudanças <FontAwesomeIcon icon="sign-in-alt" />
                </button>
              </div>
            </form>

            <form className="col s12 formSettings">
              <div className="row">
                <h5 className="subtitle center-align">
                  Informações pessoais
                  <hr />
                </h5>
                <form
                  ref={input => {
                    this.addForm = input;
                  }}
                  onSubmit={e => {
                    this.addEmails(e);
                  }}
                >
                  <div className="input-field col s11">
                    <div className="row">
                      <input
                        ref={input => {
                          this.newEmail = input;
                        }}
                        id="email"
                        type="email"
                        className="validate email"
                      />
                      <label htmlFor="email">Email</label>
                    </div>

                    {message !== "" && <p className="red-text">{message}</p>}

                    {addEmail.length > 0 && (
                      <div>
                        <table>
                          <thead>
                            <tr>
                              <th>Seus emails</th>
                            </tr>
                          </thead>

                          <tbody>
                            {addEmail.map(email => (
                              <tr key={email}>
                                <td>{email}</td>
                                <td className="right-align">
                                  <button
                                    onClick={this.deleteEmail(email)}
                                    className="waves-effect waves-light btn red darken-3"
                                    type="button"
                                  >
                                    Excluir
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                  <div className="col s1">
                    <button className="btn-floating btn-small waves-effect waves-light purple">
                      <i className="material-icons">add</i>
                    </button>
                  </div>
                  <div className="row">
                    <div className="input-field col s6">
                      <input
                        type="tel"
                        className="validate"
                        pattern="^\d{2}\d{5}\d{4}$"
                        placeholder="ddxxxxxxxxx"
                        id="tel"
                      />
                      <label htmlFor="tel">Telefone 1</label>
                    </div>
                    <div className="input-field col s6">
                      <input
                        id="tel2"
                        type="tel"
                        className="validate"
                        pattern="^\d{2}\d{5}\d{4}$"
                        placeholder="ddxxxxxxxxx"
                      />
                      <label htmlFor="tel2">Telefone 2</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col s6">
                      <label htmlFor="dataofbirth">Data de nascimento</label>
                      <input
                        id="dataofbirth"
                        type="date"
                        name="bday"
                        className="datapicker"
                      />
                    </div>
                    <div className="col s6">
                      <Input
                        s={12}
                        type="select"
                        label="Estado Civil"
                        defaultValue="1"
                      >
                        <option value="1">Solteiro</option>
                        <option value="2">Casado</option>
                        <option value="3">Separado</option>
                        <option value="3">Divorciado</option>
                        <option value="3">Viúvo</option>
                      </Input>
                    </div>
                  </div>
                </form>
              </div>
              <div className=" center-align">
                <button
                  className="waves-effect waves-light btn indigo"
                  type="submit"
                  name="action"
                >
                  Salvar mudanças <FontAwesomeIcon icon="sign-in-alt" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SettingsUser;
