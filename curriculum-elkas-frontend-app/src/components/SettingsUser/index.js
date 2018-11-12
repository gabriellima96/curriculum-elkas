import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input } from "react-materialize";
import api from "../../services/api";
import { getUsername, username } from "../../services/auth";
import "./styles.css";

class SettingsUser extends Component {
  state = {
    user: {
      personalInformation: {
        phones: ["", ""],
        dateOfBirth: "",
        maritalStatus: "",
        address: {
          publicArea: "",
          district: "",
          city: "",
          postalCode: "",
          country: "",
          state: ""
        },
        academicDegree: [
          {
            institution: "",
            degree: "",
            course: "",
            initialization: "",
            conclusion: ""
          },
          {
            institution: "",
            degree: "",
            course: "",
            initialization: "",
            conclusion: ""
          },
          {
            institution: "",
            degree: "",
            course: "",
            initialization: "",
            conclusion: ""
          }
        ]
      }
    },
    currentPassword: "",
    newPassword: "",
    errorAccount: "",
    loading: false,
    sucessAccount: "",
    errorInformation: "",
    sucessInformation: "",
    message: "",
    emails: [],
    usernameAccount: "",
    dateOfBirth: ""
  };

  async componentDidMount() {
    try {
      const { phones } = this.state;
      let { dateOfBirth } = this.state;
      const usernameAccount = getUsername();
      const { data } = await api.get(`/users/${usernameAccount}`);
      console.log(data);
      console.log("Data: ", data.personalInformation.dateOfBirth);

      if (
        !data.personalInformation.phones ||
        data.personalInformation.phones.length === 0
      ) {
        data.personalInformation.phones = this.state.user.personalInformation.phones;
      }

      if (!data.personalInformation.dateOfBirth) {
        data.personalInformation.dateOfBirth = "";
      } else {
        dateOfBirth = data.personalInformation.dateOfBirth.split("T")[0];
      }

      if (!data.personalInformation.maritalStatus) {
        data.personalInformation.maritalStatus = "";
      }

      if (
        !data.personalInformation.academicDegree ||
        data.personalInformation.academicDegree.length === 0
      ) {
        data.personalInformation.academicDegree = this.state.user.personalInformation.academicDegree;
      }

      this.setState({
        user: data,
        emails: data.personalInformation.emails,
        phones,
        usernameAccount,
        dateOfBirth
      });
    } catch (error) {
      console.log(error);
    }
  }

  handleAccount = async e => {
    e.preventDefault();

    this.setState({ loading: true });
    try {
      const {
        user,
        currentPassword,
        newPassword,
        usernameAccount
      } = this.state;

      if (currentPassword && newPassword) {
        user.currentPassword = currentPassword;
        user.newPassword = newPassword;
      } else if (currentPassword) {
        this.setState({
          errorAccount:
            "Atualize a senha digitando uma nova no Campo 'Nova senha'"
        });
        return;
      } else if (newPassword) {
        this.setState({
          errorAccount:
            "Atualize a senha digitando a atual no Campo 'Senha atual'"
        });
        return;
      }

      const response = await api.put(`/users/${usernameAccount}`, user);

      if (response.data.username !== usernameAccount) {
        username(response.data.username);
      }

      this.setState({
        user: response.data,
        sucessAccount: "Atualização da conta realizada com sucesso.",
        usernameAccount: response.data.username
      });

      setInterval(() => {
        this.setState({ sucessAccount: "" });
      }, 10000);
      this.setState({ errorAccount: "", newPassword: "", currentPassword: "" });
    } catch (error) {
      this.setState({ errorAccount: error.response.data.error });
    } finally {
      this.setState({ loading: false });
    }
  };

  handlePersonalInformation = async e => {
    e.preventDefault();

    this.setState({ loading: true });
    try {
      const { user, usernameAccount, emails } = this.state;

      if (user.username !== usernameAccount) {
        user.username = usernameAccount;
      }

      user.personalInformation.emails = emails;

      const response = await api.put(`/users/${usernameAccount}`, user);

      this.setState({
        user: response.data,
        sucessInformation: "Atualização das informações realizada com sucesso."
      });

      setInterval(() => {
        this.setState({ sucessInformation: "" });
      }, 10000);
      this.setState({ errorInformation: "" });
    } catch (error) {
      console.log(error.response);
      console.log(error);
      //this.setState({ errorInformation: error.response.data.error });
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
      errorAccount,
      loading,
      sucessAccount,
      message,
      emails,
      errorInformation,
      sucessInformation
    } = this.state;
    let { currentPassword, newPassword, dateOfBirth } = this.state;

    return (
      <div className="container">
        <div className="row titleForm">
          <div className="titleConfigs">
            <h5 className="valign-wrapper left-align title">
              {` Configurações da conta `}
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
                  <p htmlFor="oldpassword'">Senha atual</p>
                  <input
                    id="oldpassword"
                    type="password"
                    className="validate"
                    onChange={e => {
                      currentPassword = e.target.value;
                      if (!newPassword) {
                        this.setState({
                          errorAccount:
                            "Atualize a senha digitando uma nova no Campo 'Nova senha'"
                        });
                      }
                      return this.setState({ currentPassword });
                    }}
                    value={currentPassword}
                  />
                </div>
                <div className="input-field col s6">
                  <p htmlFor="newPassword">Nova senha</p>
                  <input
                    id="newPassword"
                    type="password"
                    className="validate"
                    onChange={e => {
                      newPassword = e.target.value;
                      if (!currentPassword) {
                        this.setState({
                          errorAccount:
                            "Atualize a senha digitando a atual no Campo 'Senha atual'"
                        });
                      }
                      return this.setState({ newPassword });
                    }}
                    value={newPassword}
                  />
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
              {errorAccount && (
                <p className="center-align red-text">{errorAccount}</p>
              )}
              {sucessAccount && (
                <p className="center-align green-text">{sucessAccount}</p>
              )}
            </form>
          </div>
        </div>
        <div className="row titleForm">
          <div className="titleConfigs">
            <h5 className="title">Informações pessoais</h5>
            <h6 className="right-align">Informações pessoais e acadêmicas</h6>
          </div>
          <div className="container">
            <form
              onSubmit={this.handlePersonalInformation}
              className="col s12 formSettings"
            >
              <div className="row">
                <div className="input-field col s11">
                  <div className="row">
                    <p htmlFor="email">Email</p>
                    <input
                      onChange={e =>
                        this.setState({ newEmail: e.target.value })
                      }
                      id="email"
                      type="email"
                      className="validate email"
                    />
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
                <div className="col s1 ">
                  <button
                    type="button"
                    onClick={e => this.addEmail(e)}
                    className="btn-floating btn-small waves-effect waves-light purple"
                  >
                    <i className="material-icons">add</i>
                  </button>
                </div>
                <div className="row">
                  {user.personalInformation.phones &&
                    user.personalInformation.phones.map((phone, index) => (
                      <div className="input-field col s6">
                        <p htmlFor="tel">
                          Telefone
                          {` ${index + 1}`}
                        </p>
                        <input
                          type="tel"
                          className="validate"
                          pattern="^\d{2}\d{5}\d{4}$"
                          placeholder="ddxxxxxxxxx"
                          value={phone}
                          onChange={e => {
                            user.personalInformation.phones[index] =
                              e.target.value;
                            this.setState({ user });
                          }}
                        />
                      </div>
                    ))}
                </div>
                <div className="row">
                  <div className="col s6">
                    <p htmlFor="dataofbirth">Data de nascimento</p>
                    <input
                      id="dataofbirth"
                      type="date"
                      name="bday"
                      className="datapicker"
                      value={dateOfBirth}
                      onChange={e => {
                        dateOfBirth = e.target.value;

                        user.personalInformation.dateOfBirth =
                          e.target.valueAsNumber;

                        this.setState({ dateOfBirth, user });
                      }}
                    />
                  </div>
                  <div className="col s6">
                    <p>Estado civil</p>
                    <Input
                      s={12}
                      type="select"
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
                    <p htmlFor="logradouro">Logradouro</p>
                    <input
                      type="text"
                      className="validate"
                      placeholder="Rua, nº, Complemento"
                      value={user.personalInformation.address.publicArea}
                      onChange={e => {
                        user.personalInformation.address.publicArea =
                          e.target.value;
                        this.setState({ user });
                      }}
                    />
                  </div>
                  <div id="bairro" className="input-field col s4">
                    <p htmlFor="bairro">Bairro</p>
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
                  </div>
                  <div id="cidade" className="input-field col s4">
                    <p htmlFor="cidade">Cidade</p>
                    <input
                      type="text"
                      className="validate"
                      value={user.personalInformation.address.city}
                      onChange={e => {
                        user.personalInformation.address.city = e.target.value;
                        this.setState({ user });
                      }}
                    />
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
                  {user.personalInformation.academicDegree &&
                    user.personalInformation.academicDegree.map(
                      (academicDegree, index) => (
                        <div className="row">
                          <div className="col s12">
                            <h5 className="title">{`Formação acadêmica ${index +
                              1}`}</h5>
                            <div className="row">
                              <div className="input-field col s12">
                                <p>Instituição acadêmica</p>
                                <input
                                  type="text"
                                  className="validate"
                                  value={academicDegree.institution}
                                  onChange={e => {
                                    user.personalInformation.academicDegree[
                                      index
                                    ].institution = e.target.value;
                                    this.setState({ user });
                                  }}
                                />
                              </div>
                            </div>
                            <div className="row">
                              <div className="input-field col s4">
                                <p>Curso</p>
                                <input
                                  type="text"
                                  className="validate"
                                  value={academicDegree.course}
                                  onChange={e => {
                                    user.personalInformation.academicDegree[
                                      index
                                    ].course = e.target.value;
                                    this.setState({ user });
                                  }}
                                />
                              </div>
                              <div className="col s4">
                                <p>Grau acadêmico</p>
                                <Input
                                  s={12}
                                  type="select"
                                  defaultValue="1"
                                  value={academicDegree.degree}
                                  onChange={e => {
                                    user.personalInformation.academicDegree[
                                      index
                                    ].degree = e.target.value;
                                    this.setState({ user });
                                  }}
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
                                <p>Início</p>
                                <input
                                  placeholder="Ano"
                                  type="number"
                                  className="validate"
                                  min="1800"
                                  max="2050"
                                  value={academicDegree.initialization}
                                  onChange={e => {
                                    user.personalInformation.academicDegree[
                                      index
                                    ].initialization = e.target.value;
                                    this.setState({ user });
                                  }}
                                />
                              </div>
                              <div className="input-field col s2">
                                <p>Término</p>
                                <input
                                  placeholder="Ano"
                                  type="number"
                                  className="validate"
                                  min="1800"
                                  max="2050"
                                  value={academicDegree.conclusion}
                                  onChange={e => {
                                    user.personalInformation.academicDegree[
                                      index
                                    ].conclusion = e.target.value;
                                    this.setState({ user });
                                  }}
                                />
                              </div>
                              <div className="s12">
                                <h6 className="orange-text">
                                  Deixe o campo de término vazio para ser
                                  considerado como "atual"
                                </h6>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    )}
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
              {errorInformation && (
                <p className="center-align red-text">{errorInformation}</p>
              )}
              {sucessInformation && (
                <p className="center-align green-text">{sucessInformation}</p>
              )}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SettingsUser;
