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
    user: "",
    currentPassword: '',
    newPassword: '',
    error: '',
    loading: false,
    sucessAccount: '',
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

  handleAccount = async (e) => {
    e.preventDefault();
    try {
      const { user, currentPassword, newPassword } = this.state;
      this.setState({ loading: true });
      const username = getUsername();
      user.currentPassword = currentPassword;
      user.newPassword = newPassword;
      const response = await api.put(`/users/${username}`, user);
      this.setState({ user: response.data });
      this.setState({ sucess: 'Atualização da conta realizada com sucesso.' });
      setInterval(() => {
        this.setState({ sucess: '' });
      }, 10000);
      this.setState({ error: '', newPassword: '', currentPassword: '' });
    } catch (error) {
      this.setState({ error: error.response.data.error });
    } finally {
      this.setState({ loading: false });
    }
  }

  render() {
    const { addEmail, message, user, error, loading, sucess } = this.state;
    let { currentPassword, newPassword } = this.state;

    return (
      <div className="container">
        <div className="row titleForm">
          <div className="titleConfigs">
            <h5 className="valign-wrapper left-align title">
              {" "}
              Configurações da conta{" "}
            </h5>
            <h6 className="right-align">Informações da conta</h6>
          </div>
          <div className="container">
            <form onSubmit={this.handleAccount} className="col s12 formSettings">
              <div className="row">
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
                    onChange={e => {
                      currentPassword = e.target.value;
                      return this.setState({ currentPassword });
                    }}
                    value={currentPassword}
                  />
                  <label htmlFor="oldpassword'">Senha atual</label>
                </div>
                <div className="input-field col s6">
                  <input
                    id="newPassword"
                    type="password"
                    className="validate"
                    onChange={e => {
                      newPassword = e.target.value;
                      return this.setState({ newPassword });
                    }}
                    value={newPassword}
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
                  Salvar mudanças {!loading ? 
                  (<FontAwesomeIcon icon="sign-in-alt" />) : 
                  (
                    <i className="fa fa-spinner fa-pulse" />
                  )}
                </button>
              </div>
              {error && <p className="center-align red-text">{error}</p>}
              {sucess && <p className="center-align green-text">{sucess}</p>}
            </form>
          </div>
        </div>

        <div className="row titleForm">
          <div className="titleConfigs">
            <h6 className="right-align">Informações pessoais e acadêmicas</h6>
          </div>
          <div className="container">
            <form className="col s12 formSettings">
              <div className="row">
                <form
                  ref={input => {
                    this.addForm = input;
                  }}
                  onSubmit={e => {
                    this.addEmails(e);
                  }}
                >
                  <h5 className="title">Informações pessoais</h5>
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
                            {addEmail.map(email => {
                              return (
                                <tr key={email}>
                                  <td>{email}</td>
                                  <td className="right-align">
                                    <button
                                      onClick={e => this.deleteEmail(email)}
                                      className="waves-effect waves-light btn red darken-3"
                                      type="button"
                                    >
                                      Excluir
                                    </button>
                                  </td>
                                </tr>
                              );
                            })}
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
                      />
                      <label htmlFor="tel">Telefone 1</label>
                    </div>
                    <div className="input-field col s6">
                      <input
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
                        <option value="4">Divorciado</option>
                        <option value="5">Viúvo</option>
                      </Input>
                    </div>
                  </div>

                  <div className="row">
                    <div className="input-field col s4">
                      <input type="text" className="validate" />
                      <label>Logradouro</label>
                    </div>
                    <div className="input-field col s4">
                      <input type="text" className="validate" />
                      <label>Bairro</label>
                    </div>
                    <div className="input-field col s4">
                      <input type="text" className="validate" />
                      <label>Cidade</label>
                    </div>
                  </div>

                  <div className="row">
                    <div className="input-field col s4">
                      <input
                        id="tel2"
                        type="text"
                        className="validate"
                        pattern="^\d{5}-\d{3}$"
                        placeholder="xxxxx-xxx"
                      />
                      <label>C.E.P.</label>
                    </div>
                    <div className="input-field col s4">
                      <input type="text" className="validate" />
                      <label>Estado</label>
                    </div>
                    <div className="input-field col s4">
                      <input type="text" className="validate" />
                      <label>País</label>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col s12">
                      <h5 className="title">Formação acadêmica 1</h5>
                      <div className="row">
                        <div className="input-field col s12">
                          <input type="text" className="validate" />
                          <label>Instituição acadêmica</label>
                        </div>
                      </div>
                      <div className="row">
                        <div className="input-field col s4">
                          <input type="text" className="validate" />
                          <label>Curso</label>
                        </div>
                        <div className="col s4">
                          <Input
                            s={12}
                            type="select"
                            label="Grau acadêmico"
                            defaultValue="1"
                          >
                            <option value="1" />
                            <option value="2">Graduação</option>
                            <option value="3">Bacharelado</option>
                            <option value="4">Licenciatura</option>
                            <option value="5">Pós-graduação</option>
                            <option value="6">Mestrado</option>
                            <option value="7">Doutorado</option>
                          </Input>
                        </div>
                        <div className="input-field col s2">
                          <input
                            placeholder="Ano"
                            type="number"
                            className="validate"
                            min="1800"
                            max="2050"
                            value="2014"
                          />
                          <label>Ano de início</label>
                        </div>
                        <div className="input-field col s2">
                          <input
                            placeholder="Ano"
                            type="number"
                            className="validate"
                            min="1800"
                            max="2050"
                            value="2018"
                          />
                          <label>Ano de término</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col s12">
                      <h5 className="title">Formação acadêmica 2</h5>
                      <div className="row">
                        <div className="input-field col s12">
                          <input type="text" className="validate" />
                          <label>Instituição acadêmica</label>
                        </div>
                      </div>
                      <div className="row">
                        <div className="input-field col s4">
                          <input type="text" className="validate" />
                          <label>Curso</label>
                        </div>
                        <div className="col s4">
                          <Input
                            s={12}
                            type="select"
                            label="Grau acadêmico"
                            defaultValue="1"
                          >
                            <option value="1" />
                            <option value="2">Graduação</option>
                            <option value="3">Bacharelado</option>
                            <option value="4">Licenciatura</option>
                            <option value="5">Pós-graduação</option>
                            <option value="6">Mestrado</option>
                            <option value="7">Doutorado</option>
                          </Input>
                        </div>
                        <div className="input-field col s2">
                          <input
                            placeholder="Ano"
                            type="number"
                            className="validate"
                            min="1800"
                            max="2050"
                            value="2014"
                          />
                          <label>Ano de início</label>
                        </div>
                        <div className="input-field col s2">
                          <input
                            placeholder="Ano"
                            type="number"
                            className="validate"
                            min="1800"
                            max="2050"
                            value="2018"
                          />
                          <label>Ano de término</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col s12">
                      <h5 className="title">Formação acadêmica 3</h5>
                      <div className="row">
                        <div className="input-field col s12">
                          <input type="text" className="validate" />
                          <label>Instituição acadêmica</label>
                        </div>
                      </div>
                      <div className="row">
                        <div className="input-field col s4">
                          <input type="text" className="validate" />
                          <label>Curso</label>
                        </div>
                        <div className="col s4">
                          <Input
                            s={12}
                            type="select"
                            label="Grau acadêmico"
                            defaultValue="1"
                          >
                            <option value="1" />
                            <option value="2">Graduação</option>
                            <option value="3">Bacharelado</option>
                            <option value="4">Licenciatura</option>
                            <option value="5">Pós-graduação</option>
                            <option value="6">Mestrado</option>
                            <option value="7">Doutorado</option>
                          </Input>
                        </div>
                        <div className="input-field col s2">
                          <input
                            placeholder="Ano"
                            type="number"
                            className="validate"
                            min="1800"
                            max="2050"
                            value="2014"
                          />
                          <label>Ano de início</label>
                        </div>
                        <div className="input-field col s2">
                          <input
                            placeholder="Ano"
                            type="number"
                            className="validate"
                            min="1800"
                            max="2050"
                            value="2018"
                          />
                          <label>Ano de término</label>
                        </div>
                      </div>
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
