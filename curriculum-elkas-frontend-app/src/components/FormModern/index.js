/* eslint-disable react/button-has-type */
import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input } from "react-materialize";
import api from "../../services/api";
import { getUsername } from "../../services/auth";

class Form extends Component {
  state = {
    addEmail: [],
    addSkill: [],
    message: "",
    user: "",
    currentPassword: "",
    newPassword: "",
    error: "",
    loading: false,
    sucessAccount: ""
  };

  async componentDidMount() {
    try {
      const username = getUsername();
      const { data } = await api.get(`/users/${username}`);
      const { emails, phones } = data.personalInformation;
      console.log(data);

      if (!phones || (phones && phones.length === 0)) {
        data.personalInformation.phones = ["", ""];
      } else if (phones === 1) {
        data.personalInformation.phones[1] = "";
      }
      this.setState({ user: data, addEmail: emails });
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Adiciona E-mails
   */
  addEmails(e) {
    e.preventDefault();
    const { addEmail } = this.state;
    const newEmail = this.newEmail.value;
    const isOnTheList = addEmail.includes(newEmail);

    if (isOnTheList) {
      this.setState({ message: "Esse email já foi adicionado." });
    } else if (newEmail !== "") {
      this.setState({ addEmail: [...addEmail, newEmail], message: "" });
    }
    this.addForm.reset();
  }
  /**
   * Deleta E-mail
   */
  deleteEmail(email) {
    const { addEmail } = this.state;
    const newaddEmail = addEmail.filter(
      individualEmail => individualEmail !== email
    );
    this.setState({ addEmail: [...newaddEmail] });
  }

  /**
   * Adiciona Skills
   */
  addSkills(e) {
    e.preventDefault();
    const { addSkill } = this.state;
    const newSkill = this.newSkill.value;
    const isOnTheList = addSkill.includes(newSkill);

    if (isOnTheList) {
      this.setState({ message: "Essa competência já foi adicionada!" });
    } else if (newSkill !== "") {
      this.setState({ addSkill: [...addSkill, newSkill], message: "" });
    }
    this.addForm.reset();
  }
  /**
   * Deleta Skill
   */
  deleteSkill(skill) {
    const { addSkill } = this.state;
    const newaddSkill = addSkill.filter(
      individualSkill => individualSkill !== skill
    );
    this.setState({ addSkill: [...newaddSkill] });
  }

  handleAccount = async e => {
    e.preventDefault();
    try {
      const { user, currentPassword, newPassword } = this.state;
      this.setState({ loading: true });
      const username = getUsername();
      user.currentPassword = currentPassword;
      user.newPassword = newPassword;
      const response = await api.put(`/users/${username}`, user);
      this.setState({ user: response.data });
      this.setState({ sucess: "Atualização da conta realizada com sucesso." });
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

  render() {
    const {
      addEmail,
      addSkill,
      message,
      user,
      error,
      loading,
      sucess
    } = this.state;

    return (
      <div className="container">
        <div className="row titleForm">
          <div className="titleConfigs">
            <h5 className="valign-wrapper left-align title">
              {" "}
              Preencha o formulário para montarmos o seu currículo{" "}
            </h5>
            <h6 className="right-align">
              Informações pessoais e acadêmicas/experiências
            </h6>
          </div>
          <div className="container">
            <form
              className="col m12 formSettings"
              ref={input => {
                this.addForm = input;
              }}
              onSubmit={e => {
                this.addEmails(e);
              }}
            >
              <div className="row">
                <div className="input-field col s12">
                  <p>Título do currículo</p>

                  <input id="title" type="text" className="validate" />
                </div>
              </div>

              <div className="row">
                <h5 className="title">Informações pessoais</h5>
              </div>

              <div className="row">
                <div className="input-field col s12">
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
                    <label htmlFor="email">E-mail</label>
                  </div>
                  {message !== "" && <p className="red-text">{message}</p>}
                  {addEmail.length > 0 && (
                    <div className="row">
                      <div className="col s12">
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
                                      type="button"
                                      className="waves-effect waves-light btn red darken-3"
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
                    </div>
                  )}
                </div>
                <div className="col s1">
                  <button className="btn-floating btn-small waves-effect waves-light purple">
                    <i className="material-icons">add</i>
                  </button>
                </div>
              </div>

              <div className="row">
                <div className="input-field col m6 s12">
                  <p htmlFor="tel">Telefone 1</p>
                  <input
                    type="tel"
                    className="validate"
                    pattern="^\d{2}\d{5}\d{4}$"
                    placeholder="ddxxxxxxxxx"
                  />
                </div>
                <div className="input-field col m6 s12">
                  <p htmlFor="tel2">Telefone 2</p>
                  <input
                    type="tel"
                    className="validate"
                    pattern="^\d{2}\d{5}\d{4}$"
                    placeholder="ddxxxxxxxxx"
                  />
                </div>
              </div>

              <div className="row">
                <div className="col m6 s12">
                  <label htmlFor="dataofbirth">Data de nascimento</label>
                  <input
                    id="dataofbirth"
                    type="date"
                    name="bday"
                    className="datapicker"
                  />
                </div>

                <div className="col m6 s12">
                  <Input
                    s={12}
                    type="select"
                    label="Estado Civil"
                    defaultValue="1"
                  >
                    <option value="1">Solteiro(a)</option>
                    <option value="2">Casado(a)</option>
                    <option value="3">Separado(a)</option>
                    <option value="4">Divorciado(a)</option>
                    <option value="5">Viúvo(a)</option>
                  </Input>
                </div>
              </div>
              <div className="row">
                <div className="input-field col m4 s12">
                  <p>Logradouro</p>
                  <input type="text" className="validate" />
                </div>
                <div className="input-field col m4 s12">
                  <p>Bairro</p>
                  <input type="text" className="validate" />
                </div>
                <div className="input-field col m4 s12">
                  <p>Cidade</p>
                  <input type="text" className="validate" />
                </div>
              </div>

              <div className="row">
                <div className="input-field col m4 s12">
                  <p>C.E.P.</p>
                  <input
                    id="tel2"
                    type="text"
                    className="validate"
                    pattern="^\d{5}-\d{3}$"
                    placeholder="xxxxx-xxx"
                  />
                </div>
                <div className="input-field col m4 s12">
                  <p>Estado</p>
                  <input type="text" className="validate" />
                </div>
                <div className="input-field col m4 s12">
                  <p>País</p>
                  <input type="text" className="validate" />
                </div>
              </div>
              <div className="row">
                <div className="col s12">
                  <h5 className="title">Experiências Profissionais</h5>
                </div>
              </div>
              <div className="row">
                <div className="col s12">
                  <h5 className="title right-align">Formação acadêmica 1</h5>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <p>Instituição acadêmica</p>
                  <input type="text" className="validate" />
                </div>
              </div>
              <div className="row">
                <div className="input-field col m4 s12">
                  <p>Curso</p>
                  <input type="text" className="validate" />
                </div>
                <div className="col m4 s12">
                  <p>Grau acadêmico</p>
                  <Input s={12} type="select" defaultValue="1">
                    <option value="1" />
                    <option value="2">Graduação</option>
                    <option value="3">Bacharelado</option>
                    <option value="4">Licenciatura</option>
                    <option value="5">Pós-graduação</option>
                    <option value="6">Mestrado</option>
                    <option value="7">Doutorado</option>
                  </Input>
                </div>
                <div className="input-field col m2 s12">
                  <p>Início</p>
                  <input
                    placeholder="Ano"
                    type="number"
                    className="validate"
                    min="1800"
                    max="2050"
                  />
                </div>
                <div className="input-field col m2 s12">
                  <p>Término</p>
                  <input
                    placeholder="Ano"
                    type="number"
                    className="validate"
                    min="1800"
                    max="2050"
                  />
                </div>
              </div>
              <div className="s12">
                <h6 className="orange-text">
                  Deixe o campo de término vazio para ser considerado como
                  "atual"
                </h6>
              </div>

              <div className="row">
                <div className="col s12">
                  <h5 className="title right-align">Formação acadêmica 2</h5>
                  <div className="row">
                    <div className="input-field col s12">
                      <p>Instituição acadêmica</p>
                      <input type="text" className="validate" />
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col m4 s12">
                      <p>Curso</p>
                      <input type="text" className="validate" />
                    </div>

                    <div className="col m4 s12">
                      <p>Grau acadêmico</p>
                      <Input s={12} type="select" defaultValue="1">
                        <option value="1" />
                        <option value="2">Graduação</option>
                        <option value="3">Bacharelado</option>
                        <option value="4">Licenciatura</option>
                        <option value="5">Pós-graduação</option>
                        <option value="6">Mestrado</option>
                        <option value="7">Doutorado</option>
                      </Input>
                    </div>
                    <div className="input-field col m2 s12">
                      <p>Início</p>
                      <input
                        placeholder="Ano"
                        type="number"
                        className="validate"
                        min="1800"
                        max="2050"
                      />
                    </div>
                    <div className="input-field col m2 s12">
                      <p>Término</p>
                      <input
                        placeholder="Ano"
                        type="number"
                        className="validate"
                        min="1800"
                        max="2050"
                      />
                    </div>
                  </div>
                  <div className="s12">
                    <h6 className="orange-text">
                      Deixe o campo de término vazio para ser considerado como
                      "atual"
                    </h6>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col s12">
                  <h5 className="title right-align">Formação acadêmica 3</h5>
                  <div className="row">
                    <div className="input-field col s12">
                      <p>Instituição acadêmica</p>
                      <input type="text" className="validate" />
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col m4 s12">
                      <p>Curso</p>
                      <input type="text" className="validate" />
                    </div>
                    <div className="col s4">
                      <p>Grau acadêmico</p>
                      <Input s={12} type="select" defaultValue="1">
                        <option value="1" />
                        <option value="2">Graduação</option>
                        <option value="3">Bacharelado</option>
                        <option value="4">Licenciatura</option>
                        <option value="5">Pós-graduação</option>
                        <option value="6">Mestrado</option>
                        <option value="7">Doutorado</option>
                      </Input>
                    </div>
                    <div className="input-field col m2 s12">
                      <p>Início</p>
                      <input
                        placeholder="Ano"
                        type="number"
                        className="validate"
                        min="1800"
                        max="2050"
                      />
                    </div>
                    <div className="input-field col m2 s12">
                      <p>Término</p>
                      <input
                        placeholder="Ano"
                        type="number"
                        className="validate"
                        min="1800"
                        max="2050"
                      />
                    </div>
                    <div className="s12">
                      <h6 className="orange-text">
                        Deixe o campo de término vazio para ser considerado como
                        "atual"
                      </h6>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <h5 className="title right-align">Participação 1</h5>
                <div className="row">
                  <div className="input-field col m6 s12">
                    <p>Empresa</p>
                    <input type="text" className="validate" />
                  </div>
                  <div className="input-field col m6 s12">
                    <p>Localização</p>
                    <input type="text" className="validate" />
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col m12 s12">
                    <p>Descrição</p>

                    <textarea id="textarea1" className="materialize-textarea" />
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col m4 s12">
                    <p>Cargo</p>
                    <input type="text" className="validate" />
                  </div>
                  <div className="input-field col m4 s12">
                    <p>Ano de início</p>
                    <input
                      placeholder="Ano"
                      type="number"
                      className="validate"
                      min="1800"
                      max="2050"
                    />
                  </div>
                  <div className="input-field col m4 s12">
                    <p>Ano de término</p>
                    <input
                      placeholder="Ano"
                      type="number"
                      className="validate"
                      min="1800"
                      max="2050"
                    />
                  </div>
                  <div className="s12">
                    <h6 className="orange-text">
                      Deixe o campo de término vazio para ser considerado como
                      "atual"
                    </h6>
                  </div>
                </div>
              </div>
              <div className="row">
                <h5 className="title right-align">Participação 2</h5>
                <div className="row">
                  <div className="input-field col m6 s12">
                    <p>Empresa</p>
                    <input type="text" className="validate" />
                  </div>
                  <div className="input-field col m6 s12">
                    <p>Localização</p>
                    <input type="text" className="validate" />
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <p>Descrição</p>
                    <textarea id="textarea1" className="materialize-textarea" />
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col m4 s12">
                    <p>Cargo</p>
                    <input type="text" className="validate" />
                  </div>
                  <div className="input-field col m4 s12">
                    <p>Ano de início</p>
                    <input
                      placeholder="Ano"
                      type="number"
                      className="validate"
                      min="1800"
                      max="2050"
                    />
                  </div>
                  <div className="input-field col m4 s12">
                    <p>Ano de término</p>
                    <input
                      placeholder="Ano"
                      type="number"
                      className="validate"
                      min="1800"
                      max="2050"
                    />
                  </div>
                  <div className="s12">
                    <h6 className="orange-text">
                      Deixe o campo de término vazio para ser considerado como
                      "atual"
                    </h6>
                  </div>
                </div>
              </div>
              <div className="row">
                <h5 className="title right-align">Participação 3</h5>
                <div className="row">
                  <div className="input-field col m6 s12">
                    <p>Empresa</p>
                    <input type="text" className="validate" />
                  </div>
                  <div className="input-field col m6 s12">
                    <p>Localização</p>
                    <input type="text" className="validate" />
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <p>Descrição</p>
                    <textarea id="textarea1" className="materialize-textarea" />
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col m4 s12">
                    <p>Cargo</p>
                    <input type="text" className="validate" />
                  </div>
                  <div className="input-field col m4 s12">
                    <p>Ano de início</p>
                    <input
                      placeholder="Ano"
                      type="number"
                      className="validate"
                      min="1800"
                      max="2050"
                    />
                  </div>
                  <div className="input-field col m4 s12">
                    <p>Ano de término</p>
                    <input
                      placeholder="Ano"
                      type="number"
                      className="validate"
                      min="1800"
                      max="2050"
                    />
                  </div>
                  <div className="s12">
                    <h6 className="orange-text">
                      Deixe o campo de término vazio para ser considerado como
                      "atual"
                    </h6>
                  </div>
                </div>
              </div>

              <div className="row">
                <h5 className="title">Idiomas</h5>
                <div className="row">
                  <div className="col m6 s12">
                    <p>Idiomas</p>
                    <Input s={12} type="select" defaultValue="1">
                      <option value="1" />
                      <option value="2">Inglês</option>
                      <option value="3">Português</option>
                      <option value="4">Espanhol</option>
                      <option value="5">Francês</option>
                      <option value="6">Alemão</option>
                      <option value="7">Mandarim</option>
                      <option value="8">Japonês</option>
                      <option value="9">Coreano</option>
                      <option value="10">Árabe</option>
                    </Input>
                  </div>
                  <div className="col m6 s12">
                    <p>Nível</p>
                    <Input s={12} type="select" defaultValue="1">
                      <option value="1" />
                      <option value="2">Básico</option>
                      <option value="3">Intermediário</option>
                      <option value="4">Avançado</option>
                      <option value="5">Nativo</option>
                    </Input>
                  </div>
                </div>
                <div className="row">
                  <div className="col m6 s12">
                    <p>Idiomas</p>
                    <Input s={12} type="select" defaultValue="1">
                      <option value="1" />
                      <option value="2">Inglês</option>
                      <option value="3">Português</option>
                      <option value="4">Espanhol</option>
                      <option value="5">Francês</option>
                      <option value="6">Alemão</option>
                      <option value="7">Mandarim</option>
                      <option value="8">Japonês</option>
                      <option value="9">Coreano</option>
                      <option value="10">Árabe</option>
                    </Input>
                  </div>
                  <div className="col m6 s12">
                    <p>Nível</p>
                    <Input s={12} type="select" defaultValue="1">
                      <option value="1" />
                      <option value="2">Básico</option>
                      <option value="3">Intermediário</option>
                      <option value="4">Avançado</option>
                      <option value="5">Nativo</option>
                    </Input>
                  </div>
                </div>
                <div className="row">
                  <div className="col m6 s12">
                    <p>Idiomas</p>
                    <Input s={12} type="select" defaultValue="1">
                      <option value="1" />
                      <option value="2">Inglês</option>
                      <option value="3">Português</option>
                      <option value="4">Espanhol</option>
                      <option value="5">Francês</option>
                      <option value="6">Alemão</option>
                      <option value="7">Mandarim</option>
                      <option value="8">Japonês</option>
                      <option value="9">Coreano</option>
                      <option value="10">Árabe</option>
                    </Input>
                  </div>
                  <div className="col m6 s12">
                    <p>Nível</p>
                    <Input s={12} type="select" defaultValue="1">
                      <option value="1" />
                      <option value="2">Básico</option>
                      <option value="3">Intermediário</option>
                      <option value="4">Avançado</option>
                      <option value="5">Nativo</option>
                    </Input>
                  </div>
                </div>
                <div className="row">
                  <div className="col m6 s12">
                    <p>Idiomas</p>
                    <Input s={12} type="select" defaultValue="1">
                      <option value="1" />
                      <option value="2">Inglês</option>
                      <option value="3">Português</option>
                      <option value="4">Espanhol</option>
                      <option value="5">Francês</option>
                      <option value="6">Alemão</option>
                      <option value="7">Mandarim</option>
                      <option value="8">Japonês</option>
                      <option value="9">Coreano</option>
                      <option value="10">Árabe</option>
                    </Input>
                  </div>
                  <div className="col m6 s12">
                    <p>Nível</p>
                    <Input s={12} type="select" defaultValue="1">
                      <option value="1" />
                      <option value="2">Básico</option>
                      <option value="3">Intermediário</option>
                      <option value="4">Avançado</option>
                      <option value="5">Nativo</option>
                    </Input>
                  </div>
                </div>
                <div className="row">
                  <div className="col m6 s12">
                    <p>Idiomas</p>
                    <Input s={12} type="select" defaultValue="1">
                      <option value="1" />
                      <option value="2">Inglês</option>
                      <option value="3">Português</option>
                      <option value="4">Espanhol</option>
                      <option value="5">Francês</option>
                      <option value="6">Alemão</option>
                      <option value="7">Mandarim</option>
                      <option value="8">Japonês</option>
                      <option value="9">Coreano</option>
                      <option value="10">Árabe</option>
                    </Input>
                  </div>
                  <div className="col m6 s12">
                    <p>Nível</p>
                    <Input s={12} type="select" defaultValue="1">
                      <option value="1" />
                      <option value="2">Básico</option>
                      <option value="3">Intermediário</option>
                      <option value="4">Avançado</option>
                      <option value="5">Nativo</option>
                    </Input>
                  </div>
                </div>
                <div className="s12">
                  <h6 className="orange-text">
                    Deixe os campos vazios caso não utilize todos os campos de
                    idioma
                  </h6>
                </div>
              </div>

              <div className="row">
                <div className="col s12">
                  <h5 className="title">Habilidades</h5>

                  <div className="input-field col s11">
                    <div className="row">
                      <p htmlFor="skill">
                        Competências (ex.: análises, bigdata, inteligência
                        artificial, C#, Python)
                      </p>
                      <input
                        ref={input => {
                          this.newSkill = input;
                        }}
                        id="skill"
                        type="text"
                        className="validate"
                      />
                    </div>
                    {message !== "" && <p className="red-text">{message}</p>}
                    {addSkill.length > 0 && (
                      <div>
                        <table>
                          <thead>
                            <tr>
                              <th>Suas habilidades</th>
                            </tr>
                          </thead>
                          <tbody>
                            {addSkill.map(skill => {
                              return (
                                <tr key={skill}>
                                  <td>{skill}</td>
                                  <td className="right-align">
                                    <button
                                      onClick={e => this.deleteSkill(skill)}
                                      type="button"
                                      className="waves-effect waves-light btn red darken-3"
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
                    <button
                      className="btn-floating btn-small waves-effect waves-light purple"
                      onClick={e => this.addSkills(e)}
                    >
                      <i className="material-icons">add</i>
                    </button>
                  </div>
                </div>
              </div>

              <div className="center-align">
                <button
                  className="waves-effect waves-light btn indigo"
                  type="submit"
                  name="action"
                >
                  Gerar Currículo <FontAwesomeIcon icon="link" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default Form;
