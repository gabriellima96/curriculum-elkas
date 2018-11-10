/* eslint-disable react/button-has-type */
import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input } from "react-materialize";
import api from "../../services/api";
import { getUsername } from "../../services/auth";
import "./styles.css";

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
    //e.preventDefault();
    const { addSkill } = e.data;
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
    let { currentPassword, newPassword } = this.state;

    console.log("addEmail: " + addEmail);
    console.log("addSkill" + addSkill);

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

                  <div className="row">
                    <div className="input-field col s6">
                      <p>Título do Currículo</p>
                      <input id="title" type="text" className="validate" />
                    </div>

                    <div className="row" />
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
                        <option value="1">Solteiro(a)</option>
                        <option value="2">Casado(a)</option>
                        <option value="3">Separado(a)</option>
                        <option value="4">Divorciado(a)</option>
                        <option value="5">Viúvo(a)</option>
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
                          />
                          <label>Ano de término</label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col s12">
                      <h5 className="title">Experiência Profissional</h5>

                      <div className="row">
                        <div className="input-field col s4">
                          <input type="text" className="validate" />
                          <label>Empresa</label>
                        </div>
                      </div>
                      <div className="row">
                        <div className="input-field col s4">
                          <input type="text" className="validate" />
                          <label>Descrição</label>
                        </div>
                      </div>
                      <div className="row">
                        <div className="input-field col s4">
                          <input type="text" className="validate" />
                          <label>Localização</label>
                        </div>
                      </div>
                      <div className="row">
                        <div className="input-field col s4">
                          <input type="text" className="validate" />
                          <label>Cargo</label>
                        </div>
                        <div className="input-field col s2">
                          <input
                            placeholder="Ano"
                            type="number"
                            className="validate"
                            min="1800"
                            max="2050"
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
                          />
                          <label>Ano de término</label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="input-field col s11">
                    <div className="row">
                      <div className="col s12">
                        <h5 className="title">Idiomas</h5>
                        <div className="col s4">
                          <Input
                            s={12}
                            type="select"
                            label="Idiomas"
                            defaultValue="1"
                          >
                            <option value="1" />
                            <option value="2">Inglês</option>
                            <option value="3">Português</option>
                            <option value="4">Espanhol</option>
                            <option value="5">Francês</option>
                            <option value="6">Alemão</option>
                            <option value="7">Mandarim</option>
                            <option value="8">Japonês</option>
                            <option value="7">Coreano</option>
                            <option value="7">Árabe</option>
                          </Input>
                        </div>
                        <div className="col s4">
                          <Input
                            s={12}
                            type="select"
                            label="Nível"
                            defaultValue="1"
                          >
                            <option value="1" />
                            <option value="2">Básico</option>
                            <option value="3">Intermediário</option>
                            <option value="4">Avançado</option>
                            <option value="5">Nativo</option>
                          </Input>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col s12">
                        <h5 className="title">Habilidades</h5>
                      </div>

                      <div className="input-field col s11">
                        <div className="row">
                          <input
                            ref={input => {
                              this.newSkill = input;
                            }}
                            id="skill"
                            type="text"
                            className="validate"
                          />
                          <label>Competência (ex.: Análises)</label>
                        </div>
                        {message !== "" && (
                          <p className="red-text">{message}</p>
                        )}
                        {addSkill.length > 0 && (
                          <div>
                            <table>
                              <thead>
                                <tr>
                                  <th>Suas competências</th>
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
                    </div>
                    <div className="col s1">
                      <button className="btn-floating btn-small waves-effect waves-light purple">
                        <i className="material-icons">add</i>
                      </button>
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
                  Gerar Currículo <FontAwesomeIcon icon="sign-in-alt" />
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
