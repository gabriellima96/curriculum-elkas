import React, { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithubAlt } from "@fortawesome/free-brands-svg-icons";
import SignUp from "../../components/SignUp";
import SignIn from "../../components/SignIn";
import Header from "../../components/Header";

import "./styles.css";

const Main = () => (
  <Fragment>
    <Header />

    <div className="container">
      <div className="row">
        <div className="col m8 push-m2 s12 collap">
          <ul className="collapsible popout">
            <li>
              <div className="collapsible-header entrar">
                <i className="material-icons">input</i>
                Entrar
              </div>
              <div className="collapsible-body">
                <SignIn />
              </div>
            </li>
            <li>
              <div className="collapsible-header cadastrar">
                <i className="material-icons">view_agenda</i>
                Cadastrar
              </div>
              <div className="collapsible-body">
                <SignUp />
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="row footer">
        <div className="col s6 right-align">
          <a href="http://ifal.edu.br" target="_blank">
            <img
              src={require("../../images/logo-horizontal.png")}
              width="140"
            />
          </a>
          <h6>
            Instituto Federal de Alagoas - Sistema de geração de currículo
          </h6>
          <h6>Bacharelado em Sistemas de Informação</h6>
        </div>
        <div className="col s6 left-align">
          <p>Desenvolvido por:</p>
          <h6>Gabriel Lima Silva</h6>
          <h6>Mayara Rysia de Assis Lima</h6>
          <h6>Filipe Esteves do Rego</h6>
        </div>
      </div>
      <div className="githubIcon center-align">
        <a
          href="https://github.com/gabriellima96/curriculum-elkas"
          target="_blank"
        >
          <FontAwesomeIcon icon={faGithubAlt} size="3x" spin />
        </a>
      </div>
    </div>
  </Fragment>
);

export default Main;
