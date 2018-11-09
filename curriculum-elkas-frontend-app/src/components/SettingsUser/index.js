import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input } from "react-materialize";
import api from "../../services/api";
import { getUsername } from "../../services/auth";
import "./styles.css";

class SettingsUser extends Component {
  state = {
    user: {
      personalInformation: {
        dataOfBirth: "",
        maritalStatus: "",
        address: {
          publicArea: "",
          district: "",
          city: "",
          postalCode: "",
          country: "",
          state: ""
        }
      }
    },
    currentPassword: "",
    newPassword: "",
    error: "",
    loading: false,
    sucess: "",
    message: "",
    emails: [],
    newEmail: "",
    phones: ["", ""]
  };

  async componentDidMount() {
    try {
      const { phones } = this.state;
      const username = getUsername();
      const { data } = await api.get(`/users/${username}`);
      console.log(data);
      if (data.personalInformation.phones) {
        data.personalInformation.phones.forEach(phone => {
          if (phone) {
            phones.push(phone);
          }
        });
      }

      if (!data.personalInformation.dataOfBirth) {
        data.personalInformation.dateOfBirth = "";
      }

      if (!data.personalInformation.maritalStatus) {
        data.personalInformation.maritalStatus = "";
      }

      this.setState({
        user: data,
        emails: data.personalInformation.emails,
        phones
      });
    } catch (error) {
      console.log(error);
    }
  }

  handleAccount = async e => {
    e.preventDefault();

    this.setState({ loading: true });
    try {
      const { user, currentPassword, newPassword } = this.state;

      if (currentPassword && newPassword) {
        user.currentPassword = currentPassword;
        user.newPassword = newPassword;
      } else if (currentPassword) {
        this.setState({
          error: "Atualize a senha digitando uma nova no Campo 'Nova senha'"
        });
        return;
      } else if (newPassword) {
        this.setState({
          error: "Atualize a senha digitando a atual no Campo 'Senha atual'"
        });
        return;
      }

      const response = await api.put(`/users/${user.username}`, user);

      this.setState({
        user: response.data,
        sucess: "Atualização da conta realizada com sucesso."
      });

      setInterval(() => {
        this.setState({ sucess: "" });
      }, 10000);
      this.setState({ error: "", newPassword: "", currentPassword: "" });
    } catch (error) {
      this.setState({ error: error.response.data.error });
    } finally {
      this.setState({ loading: false });
    }
  };

  deleteEmail = (email, e) => {
    e.preventDefault();
    const { emails } = this.state;
    emails.splice(emails.indexOf(email), 1);
    this.setState({ emails });
  };

  addEmail = e => {
    e.preventDefault();
    const { emails, newEmail } = this.state;

    if (!newEmail || !newEmail.includes("@")) {
      this.setState({ message: "E-mail ínvalido" });
    } else {
      const isOnTheList = emails.includes(newEmail);
      if (isOnTheList) {
        this.setState({
          message: "Esse e-mail já foi adicionado."
        });
      } else {
        emails.push(newEmail);
        this.setState({
          emails,
          message: ""
        });
      }
    }
  };

  render() {
    const {
      user,
      error,
      loading,
      sucess,
      message,
      emails,
      phones
    } = this.state;
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
            <form
              onSubmit={this.handleAccount}
              className="col s12 formSettings"
            >
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
                  <p htmlFor="emailAccount">Email</p>
                  <input
                    id="emailAccount"
                    type="email"
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
                      if (!newPassword) {
                        this.setState({
                          error:
                            "Atualize a senha digitando uma nova no Campo 'Nova senha'"
                        });
                      }
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
                      if (!currentPassword) {
                        this.setState({
                          error:
                            "Atualize a senha digitando a atual no Campo 'Senha atual'"
                        });
                      }
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
                  Salvar mudanças{" "}
                  {!loading ? (
                    <FontAwesomeIcon icon="sign-in-alt" />
                  ) : (
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
            <h5 className="title">Informações pessoais</h5>
            <h6 className="right-align">Informações pessoais e acadêmicas</h6>
          </div>
          <div className="container">
            <form className="col s12 formSettings">
              <div className="row">
                <div className="input-field col s11">
                  <div className="row">
                    <input
                      onChange={e =>
                        this.setState({ newEmail: e.target.value })
                      }
                      id="email"
                      type="email"
                      className="validate email"
                    />
                    <label htmlFor="email">Email</label>
                  </div>
                  {message !== "" && <p className="red-text">{message}</p>}
                  {emails && emails.length > 0 && (
                    <div>
                      <table>
                        <thead>
                          <tr>
                            <th>Seus emails</th>
                          </tr>
                        </thead>

                        <tbody>
                          {user.personalInformation.emails.map(email => (
                            <tr key={email}>
                              <td>{email}</td>
                              <td className="right-align">
                                <button
                                  onClick={e => this.deleteEmail(email, e)}
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
                  <button
                    type="button"
                    onClick={e => this.addEmail(e)}
                    className="btn-floating btn-small waves-effect waves-light purple"
                  >
                    <i className="material-icons">add</i>
                  </button>
                </div>
                <div className="row">
                  {phones &&
                    phones.map((phone, index) => (
                      <div className="input-field col s6">
                        <input
                          type="tel"
                          className="validate"
                          pattern="^\d{2}\d{5}\d{4}$"
                          placeholder="ddxxxxxxxxx"
                          value={phone}
                          onChange={e => {
                            phones.splice(index, 1, e.target.value);
                            this.setState({ phones });
                          }}
                        />
                        <label htmlFor="tel">
                          Telefone
                          {` ${index + 1}`}
                        </label>
                      </div>
                    ))}
                </div>
                <div className="row">
                  <div className="col s6">
                    <label htmlFor="dataofbirth">Data de nascimento</label>
                    <input
                      id="dataofbirth"
                      type="date"
                      name="bday"
                      className="datapicker"
                      value={user.personalInformation.dataOfBirth}
                      onChange={e => {
                        user.personalInformation.dataOfBirth = e.target.value;
                        this.setState({ user });
                      }}
                    />
                  </div>
                  <div className="col s6">
                    <Input
                      s={12}
                      type="select"
                      label="Estado Civil"
                      defaultValue="1"
                      value={user.personalInformation.maritalStatus}
                      onChange={e => {
                        user.personalInformation.maritalStatus = e.target.value;
                        this.setState({ user });
                      }}
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
                  <div id="logradouro" className="input-field col s4">
                    <input
                      type="text"
                      className="validate"
                      value={user.personalInformation.address.publicArea}
                      onChange={e => {
                        user.personalInformation.address.publicArea =
                          e.target.value;
                        this.setState({ user });
                      }}
                    />
                    <label htmlFor="logradouro">Logradouro</label>
                  </div>
                  <div id="bairro" className="input-field col s4">
                    <input
                      type="text"
                      className="validate"
                      value={user.personalInformation.address.district}
                      onChange={e => {
                        user.personalInformation.address.district =
                          e.target.value;
                        this.setState({ user });
                      }}
                    />
                    <label htmlFor="bairro">Bairro</label>
                  </div>
                  <div id="cidade" className="input-field col s4">
                    <input
                      type="text"
                      className="validate"
                      value={user.personalInformation.address.city}
                      onChange={e => {
                        user.personalInformation.address.city = e.target.value;
                        this.setState({ user });
                      }}
                    />
                    <label htmlFor="cidade">Cidade</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s4">
                    <p htmlFor="cep">C.E.P.</p>
                    <input
                      id="cep"
                      type="text"
                      className="validate"
                      pattern="^\d{5}-\d{3}$"
                      placeholder="xxxxx-xxx"
                      value={user.personalInformation.address.postalCode}
                      onChange={e => {
                        user.personalInformation.address.postalCode =
                          e.target.value;
                        this.setState({ user });
                      }}
                    />
                  </div>
                  <div className="input-field col s4">
                    <p htmlFor="estado">Estado</p>
                    <input
                      id="estado"
                      type="text"
                      className="validate"
                      value={user.personalInformation.address.state}
                      onChange={e => {
                        user.personalInformation.address.state = e.target.value;
                        this.setState({ user });
                      }}
                    />
                  </div>

                  <div className="input-field col s4">
                    <p>País</p>
                    <input
                      type="text"
                      className="validate"
                      value={user.personalInformation.address.country}
                      onChange={e => {
                        user.personalInformation.address.country =
                          e.target.value;
                        this.setState({ user });
                      }}
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SettingsUser;
