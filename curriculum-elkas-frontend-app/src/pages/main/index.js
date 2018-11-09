import React, { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
      <div className="row">
        <div className="col s12 center-align footer">
          <h6>
            Instituto Federal de Alagoas - Sistema de geração de currículo
          </h6>
          <h6>Bacharelado em Sistemas de Informação</h6>
          <p>Desenvolvido por:</p>
          <h6>Gabriel Lima Silva</h6>
          <h6>Mayara Rysia de Assis Lima</h6>
          <h6>Filipe Esteves do Rego</h6>
        </div>
      </div>
    </div>
  </Fragment>
);

export default Main;
