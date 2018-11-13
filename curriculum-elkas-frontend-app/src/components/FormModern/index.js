import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import { Input } from "react-materialize";
import api from "../../services/api";
import { getUsername } from "../../services/auth";

class FormModern extends Component {
  state = {
    curriculum: {
      template: "1m",
      title: "",
      name: "",
      emails: [],
      phones: ["", ""],
      dateOfbirth: "",
      maritalStatus: "",
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
      ],
      address: {
        publicArea: "",
        district: "",
        city: "",
        postalCode: "",
        country: "",
        state: ""
      },
      goals: "",
      languages: [
        {
          language: "",
          fluency: ""
        },
        {
          language: "",
          fluency: ""
        },
        {
          language: "",
          fluency: ""
        }
      ],
      experiences: [
        {
          office: "",
          location: "",
          company: "",
          description: "",
          initialization: "",
          conclusion: ""
        },
        {
          office: "",
          location: "",
          company: "",
          description: "",
          initialization: "",
          conclusion: ""
        },
        {
          office: "",
          location: "",
          company: "",
          description: "",
          initialization: "",
          conclusion: ""
        }
      ],
      skills: []
    },
    loading: false,
    messageEmail: "",
    messageSkill: "",
    newEmail: "",
    emails: [],
    date: "",
    newSkill: "",
    skills: [],
    button: false,
    error: "",
    success: ""
  };

  async componentDidMount() {
    const username = getUsername();

    this.setState({ loading: true });
    try {
      const { curriculum } = this.state;
      const { data } = await api.get(`/users/${username}`);
      const { phones, emails, academicDegree } = data.personalInformation;

      if (phones) {
        phones.map((phone, index) => (curriculum.phones[index] = phone));
      }

      if (emails) {
        emails.map(email => curriculum.emails.push(email));
      }

      if (academicDegree) {
        academicDegree.map(
          (academic, index) => (curriculum.academicDegree[index] = academic)
        );
      }

      if (data.personalInformation.dateOfBirth) {
        curriculum.dateOfbirth = data.personalInformation.dateOfBirth;
        this.setState({
          date: data.personalInformation.dateOfBirth.split("T")[0]
        });
      }

      curriculum.name = data.name;
      curriculum.address = data.personalInformation.address;
      curriculum.maritalStatus = data.personalInformation.maritalStatus;

      console.log(curriculum);

      this.setState({ curriculum, emails: data.personalInformation.emails });
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ loading: false });
    }
  }

  addEmail = e => {
    e.preventDefault();
    const { emails, newEmail } = this.state;

    if (!newEmail || !newEmail.includes("@")) {
      this.setState({ messageEmail: "E-mail ínvalido" });
    } else {
      const isOnTheList = emails.includes(newEmail);
      if (isOnTheList) {
        this.setState({
          messageEmail: "Esse e-mail já foi adicionado."
        });
      } else {
        emails.push(newEmail);
        this.setState({
          emails,
          messageEmail: ""
        });
      }
    }
  };

  addSkills = e => {
    e.preventDefault();
    const { skills, newSkill } = this.state;
    if (skills) {
      const isOnTheList = skills.includes(newSkill);

      if (isOnTheList) {
        this.setState({ messageSkill: "Essa competência já foi adicionada!" });
      } else if (newSkill !== "") {
        skills.push(newSkill);
        this.setState({ skills, messageSkill: "" });
      }
    } else {
      const skillsnew = [];
      skillsnew.push(newSkill);
      this.setState({ skills: skillsnew });
    }
  };

  deleteSkill = (skill, e) => {
    e.preventDefault();
    const { skills } = this.state;
    skills.splice(skills.indexOf(skill), 1);
    this.setState({ skills });
  };

  deleteEmail = (email, e) => {
    e.preventDefault();
    const { emails } = this.state;
    emails.splice(emails.indexOf(email), 1);
    this.setState({ emails });
  };

  handleCurriculum = async e => {
    this.setState({ button: true });
    e.preventDefault();
    const { curriculum, skills, emails } = this.state;
    curriculum.skills = skills;
    curriculum.emails = emails;

    this.setState({ loading: true });
    try {
      const curriculum = await api.post("/curriculums", { curriculum });
      console.log(curriculum._id);
      this.setState({ success: "Curriculo gerado com sucesso" });
    } catch (error) {
      this.setState({ error: error.response.data.error });
      console.log(error.response.data.error);
    } finally {
      this.setState({ loading: false, button: false });
    }
  };

  render() {
    const {
      curriculum,
      messageEmail,
      messageSkill,
      emails,
      skills,
      loading,
      button,
      error,
      sucess
    } = this.state;
    let { date } = this.state;
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
            <form onSubmit={this.handleCurriculum}>
              <div className="row">
                <div className="input-field col s12">
                  <p>Título do currículo</p>

                  <input
                    id="title"
                    type="text"
                    className="validate"
                    value={curriculum.title}
                    onChange={e =>
                      this.setState({ curriculum: { title: e.target.value } })
                    }
                  />
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
                      value={curriculum.name}
                      onChange={e =>
                        this.setState({ curriculum: { name: e.target.value } })
                      }
                    />
                  </div>
                </div>
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
                    {messageEmail !== "" && (
                      <p className="red-text">{messageEmail}</p>
                    )}
                    {emails && emails.length > 0 && (
                      <div>
                        <table>
                          <thead>
                            <tr>
                              <th>Seus emails</th>
                            </tr>
                          </thead>

                          <tbody>
                            {emails.map(email => (
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
                </div>

                <div className="row">
                  {curriculum.phones &&
                    curriculum.phones.map((phone, index) => (
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
                            curriculum.phones[index] = e.target.value;
                            this.setState({ curriculum });
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
                      value={date}
                      onChange={e => {
                        date = e.target.value;
                        curriculum.dateOfBirth = e.target.valueAsNumber;
                        this.setState({ date, curriculum });
                      }}
                    />
                  </div>
                  <div className="col s6">
                    <p>Estado civil</p>
                    <Input
                      s={12}
                      type="select"
                      defaultValue="1"
                      value={curriculum.maritalStatus}
                      onChange={e =>
                        this.setState({
                          curriculum: { maritalStatus: e.target.value }
                        })
                      }
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
                      value={curriculum.address.publicArea}
                      onChange={e =>
                        this.setState({
                          curriculum: {
                            address: { publicArea: e.target.value }
                          }
                        })
                      }
                    />
                  </div>
                  <div id="bairro" className="input-field col s4">
                    <p htmlFor="bairro">Bairro</p>
                    <input
                      type="text"
                      className="validate"
                      value={curriculum.address.district}
                      onChange={e =>
                        this.setState({
                          curriculum: { address: { district: e.target.value } }
                        })
                      }
                    />
                  </div>
                  <div id="cidade" className="input-field col s4">
                    <p htmlFor="cidade">Cidade</p>
                    <input
                      type="text"
                      className="validate"
                      value={curriculum.address.city}
                      onChange={e =>
                        this.setState({
                          curriculum: { address: { city: e.target.value } }
                        })
                      }
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
                      value={curriculum.address.postalCode}
                      onChange={e =>
                        this.setState({
                          curriculum: {
                            address: { postalCode: e.target.value }
                          }
                        })
                      }
                    />
                  </div>
                  <div className="input-field col s4">
                    <p htmlFor="estado">Estado</p>
                    <input
                      id="estado"
                      type="text"
                      className="validate"
                      value={curriculum.address.state}
                      onChange={e =>
                        this.setState({
                          curriculum: { address: { state: e.target.value } }
                        })
                      }
                    />
                  </div>

                  <div className="input-field col s4">
                    <p>País</p>
                    <input
                      type="text"
                      className="validate"
                      value={curriculum.address.country}
                      onChange={e =>
                        this.setState({
                          curriculum: { address: { country: e.target.value } }
                        })
                      }
                    />
                  </div>
                  <div className="input-field col m12 s12">
                    <p>
                      Objetivos (digite os objetivos que você pretende alcançar
                      detalhadamente)
                    </p>

                    <textarea id="textarea1" className="materialize-textarea" />
                  </div>
                </div>
                <div className="row">
                  {curriculum.academicDegree &&
                    curriculum.academicDegree.map((academicDegree, index) => (
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
                                  curriculum.academicDegree[index].institution =
                                    e.target.value;
                                  this.setState({ curriculum });
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
                                  curriculum.academicDegree[index].course =
                                    e.target.value;
                                  this.setState({ curriculum });
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
                                  curriculum.academicDegree[index].degree =
                                    e.target.value;
                                  this.setState({ curriculum });
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
                                  curriculum.academicDegree[
                                    index
                                  ].initialization = e.target.value;
                                  this.setState({ curriculum });
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
                                  curriculum.academicDegree[index].conclusion =
                                    e.target.value;
                                  this.setState({ curriculum });
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
                    ))}
                </div>
                {curriculum.experiences &&
                  curriculum.experiences.map((experience, index) => (
                    <div className="row">
                      <h5 className="title right-align">
                        Experiência profissional {index + 1}
                      </h5>
                      <div className="row">
                        <div className="input-field col m6 s12">
                          <p>Empresa</p>
                          <input
                            type="text"
                            className="validate"
                            value={experience.company}
                            onChange={e => {
                              curriculum.experiences[index].company =
                                e.target.value;
                              this.setState({ curriculum });
                            }}
                          />
                        </div>
                        <div className="input-field col m6 s12">
                          <p>Localização</p>
                          <input
                            type="text"
                            className="validate"
                            value={experience.location}
                            onChange={e => {
                              curriculum.experiences[index].location =
                                e.target.value;
                              this.setState({ curriculum });
                            }}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="input-field col m12 s12">
                          <p>Descrição</p>

                          <textarea
                            id="textarea1"
                            className="materialize-textarea"
                            value={experience.description}
                            onChange={e => {
                              curriculum.experiences[index].description =
                                e.target.value;
                              this.setState({ curriculum });
                            }}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="input-field col m4 s12">
                          <p>Cargo</p>
                          <input
                            type="text"
                            className="validate"
                            value={experience.office}
                            onChange={e => {
                              curriculum.experiences[index].office =
                                e.target.value;
                              this.setState({ curriculum });
                            }}
                          />
                        </div>
                        <div className="input-field col m4 s12">
                          <p>Ano de início</p>
                          <input
                            placeholder="Ano"
                            type="number"
                            className="validate"
                            min="1800"
                            max="2050"
                            value={experience.initialization}
                            onChange={e => {
                              curriculum.experiences[index].initialization =
                                e.target.value;
                              this.setState({ curriculum });
                            }}
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
                            value={experience.conclusion}
                            onChange={e => {
                              curriculum.experiences[index].conclusion =
                                e.target.value;
                              this.setState({ curriculum });
                            }}
                          />
                        </div>
                        <div className="s12">
                          <h6 className="orange-text">
                            Deixe o campo de término vazio para ser considerado
                            como "atual"
                          </h6>
                        </div>
                      </div>
                    </div>
                  ))}
                {curriculum.languages &&
                  curriculum.languages.map((language, index) => (
                    <div className="row">
                      <h5 className="title">Idiomas</h5>
                      <div className="row">
                        <div className="col m6 s12">
                          <p>Idiomas</p>
                          <Input
                            s={12}
                            type="select"
                            defaultValue="1"
                            value={language.language}
                            onChange={e => {
                              curriculum.languages[index].language =
                                e.target.value;
                              this.setState({ curriculum });
                            }}
                          >
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
                          <Input
                            s={12}
                            type="select"
                            defaultValue="1"
                            value={language.fluency}
                            onChange={e => {
                              curriculum.languages[index].fluency =
                                e.target.value;
                              this.setState({ curriculum });
                            }}
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
                  ))}

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
                          id="skill"
                          type="text"
                          className="validate"
                          onChange={e =>
                            this.setState({ newSkill: e.target.value })
                          }
                        />
                      </div>
                      {messageSkill !== "" && (
                        <p className="red-text">{messageSkill}</p>
                      )}
                      {skills && skills.length > 0 && (
                        <div>
                          <table>
                            <thead>
                              <tr>
                                <th>Suas habilidades</th>
                              </tr>
                            </thead>
                            <tbody>
                              {skills.map(skill => {
                                return (
                                  <tr key={skill}>
                                    <td>{skill}</td>
                                    <td className="right-align">
                                      <button
                                        onClick={e =>
                                          this.deleteSkill(skill, e)
                                        }
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
                        type="button"
                        onClick={e => this.addSkills(e)}
                        className="btn-floating btn-small waves-effect waves-light purple"
                      >
                        <i className="material-icons">add</i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="center-align">
                <button
                  className="waves-effect waves-light btn indigo"
                  type="submit"
                  name="action"
                  disabled={button}
                >
                  Gerar Currículo
                  {!loading ? (
                    <FontAwesomeIcon icon="link" />
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
      </div>
    );
  }
}

export default FormModern;
