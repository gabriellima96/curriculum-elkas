import React from "react";
import "./styles.css";

const CurriculumGenerated = props => (
  <div className="container">
    <div className="row backgroundCurriculo">
      <div className="col s12 backgroundCurriculo">
        <div className="col m5 s12 painelPerfil z-depth-4">
          <div className="row perfil center-align ">
            <img
              alt="imagemCE"
              className="circulo"
              src={require("../../images/icon7.png")}
            />
          </div>
          <div className="row center-align ">
            <h5 className="nameUser">{props.curriculum.name}</h5>
            <h6 className="dataUser">{props.curriculum.dataOfbirth}</h6>
          </div>
          <div className="row contactBar center-align">
            <div className="col s12">
              <h5 className="contactDiv">
                <img
                  alt="imagemCE"
                  src={require("../../images/icon4.png")}
                  width="30"
                />
                &nbsp;&nbsp;CONTATOS
              </h5>
            </div>
          </div>
          {props.curriculum &&
            props.curriculum.emails &&
            props.curriculum.emails.length > 0 &&
            props.curriculum.emails.map(email => (
              <div className="row">
                <div className="container">
                  <div className="col s12 contactsBar">
                    <h5 className="emailUser">
                      <img
                        alt="imagemCE"
                        src={require("../../images/icon3.png")}
                        width="22"
                      />
                      {email}
                    </h5>
                  </div>
                </div>
              </div>
            ))}
          {props.curriculum &&
            props.curriculum.phones &&
            props.curriculum.phones.length > 0 &&
            props.curriculum.phones.map(phone => (
              <div className="row">
                <div className="container">
                  <div className="col s12 contactsBar">
                    <h5 className="emailUser">
                      <img
                        alt="imagemCE"
                        src={require("../../images/icon5.png")}
                        width="22"
                      />
                      {phone}
                    </h5>
                  </div>
                </div>
              </div>
            ))}

          <div className="row">
            <div className="container">
              <div className="col s12 contactsBar">
                <h5 className="emailUser">
                  <img
                    alt="imagemCE"
                    src={require("../../images/icon2.png")}
                    width="22"
                  />
                  {props.curriculum &&
                    props.curriculum.address &&
                    props.curriculum.address.publicArea}
                  ,{" "}
                  {props.curriculum &&
                    props.curriculum.address &&
                    props.curriculum.address.district}
                  ,{" "}
                  {props.curriculum &&
                    props.curriculum.address &&
                    props.curriculum.address.postalCode}
                  ,{" "}
                  {props.curriculum &&
                    props.curriculum.address &&
                    props.curriculum.address.city}
                  ,{" "}
                  {props.curriculum &&
                    props.curriculum.address &&
                    props.curriculum.address.state}
                  ,{" "}
                  {props.curriculum &&
                    props.curriculum.address &&
                    props.curriculum.address.country}
                </h5>
              </div>
            </div>
          </div>
          <div className="row contactBar center-align">
            <div className="col s12">
              <h5 className="contactDiv">
                <img
                  alt="imagemCE"
                  src={require("../../images/icon1.png")}
                  width="35"
                />
                &nbsp;&nbsp;OBJETIVOS
              </h5>
            </div>
          </div>
          <div className="row">
            <div className="container">
              <div className="col s12">
                <p className="objetiveText center-align">
                  {props.curriculum && props.curriculum.goals}
                </p>
              </div>
            </div>
          </div>
          <div className="row contactBar center-align">
            <div className="col s12">
              <h5 className="contactDiv">
                <img
                  alt="imagemCE"
                  src={require("../../images/icon6.png")}
                  width="35"
                />
                &nbsp;&nbsp;IDIOMAS
              </h5>
            </div>
          </div>
          <div className="row">
            <div className="container">
              <div className="col m6 s12">
                <h5 className="idioma">LÍNGUA</h5>
                {props.curriculum &&
                  props.curriculum.languages &&
                  props.curriculum.languages.length > 0 &&
                  props.curriculum.languages.map(language => (
                    <p className="objetiveText">{language.language}</p>
                  ))}
              </div>
              <div className="col m6 s12">
                <h5 className="idioma">FLUÊNCIA</h5>
                {props.curriculum &&
                  props.curriculum.languages &&
                  props.curriculum.languages.length > 0 &&
                  props.curriculum.languages.map(language => (
                    <p className="objetiveText">{language.fluency}</p>
                  ))}
              </div>
            </div>
          </div>
          <div className="row contactBar center-align">
            <div className="col s12">
              <h5 className="contactDiv">
                <img
                  alt="imagemCE"
                  src={require("../../images/icon8.png")}
                  width="35"
                />
                &nbsp;&nbsp;HABILIDADES
              </h5>
            </div>
            <div className="col s12 painelPerfil">
              {props.curriculum &&
                props.curriculum.skills &&
                props.curriculum.skills.length > 0 &&
                props.curriculum.skills.map(skill => (
                  <div className="col s4">
                    <p className="habilidades">{skill}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="col m7 s12">
          <div className="row">
            <div className="painelFormacao right-align z-depth-3">FORMAÇÃO</div>
          </div>
          {props.curriculum &&
            props.curriculum.academicDegree &&
            props.curriculum.academicDegree.length > 0 &&
            props.curriculum.academicDegree.map(degree => (
              <div className="row">
                <div className="col s12 painelFormacoes right-align">
                  <div className="row">
                    <div className="col m6 s12 left-align">
                      <h5 className="dateFormacao">{degree.initialization}</h5>
                    </div>
                    <div className="col m6 s12 right-align">
                      <h5 className="dateFormacao">
                        {!degree.conclusion ? "atual" : degree.conclusion}
                      </h5>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col s12 right-align">
                      <h5 className="instituteFormacao">
                        {degree.institution}
                      </h5>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col s12 right-align">
                      <h5 className="curseFormacao">{degree.course}</h5>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col s12 right-align">
                      <h5 className="curseFormacao blue-text">
                        {degree.degree}
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            ))}

          {props.curriculum &&
          props.curriculum.experiences &&
          props.curriculum.experiences.length > 0 ? (
            <div className="row">
              <div className="painelFormacao right-align z-depth-3">
                EXPERIÊNCIAS
              </div>
              {props.curriculum.experiences.map(experience => (
                <div className="col s12 painelFormacoes right-align">
                  {!experience.company ? (
                    ""
                  ) : (
                    <div>
                      <div className="row">
                        <div className="col s12 right-align">
                          <h5 className="dateFormacao">{experience.company}</h5>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col s12 right-align">
                          <h5 className="officeEx orange-text">
                            {experience.office}
                          </h5>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col s12 right-align">
                          <h5 className="instituteFormacao">
                            {experience.location}
                          </h5>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col s12 right-align">
                          <h5 className="instituteFormacao">
                            {experience.initialization} -{" "}
                            {!experience.conclusion
                              ? "atual"
                              : experience.conclusion}
                          </h5>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col s12 left-align">
                          <p className="descEx">{experience.description}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  </div>
);
export default CurriculumGenerated;
