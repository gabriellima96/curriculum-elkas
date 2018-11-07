import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./styles.css";

const ContentTemplate = () => (
  <div className="container">
    <div className="row">
      <div className="col s12 m6">
        <div className="card z-depth-2">
          <div className="card-image">
            <div className="shadowImg">
              <img
                src="https://picsum.photos/450/300?image=1048"
                alt="Template moderno"
              />
            </div>
            <span className="card-title">Moderno</span>
          </div>
          <div className="card-content">
            <p className="descCard">
              Neste tema, você gerará um currículo mais atual, com informações
              mais precisas, detalhadas e focadas ao cargo pelo qual você
              pretende concorrer.
            </p>
          </div>
          <div className="card-action grey darken-4">
            <a className="white-text" href="/">
              Ecolher este tema{" "}
              <FontAwesomeIcon icon="arrow-alt-circle-right" />
            </a>
          </div>
        </div>
      </div>
      <div className="col s12 m6">
        <div className="card z-depth-2">
          <div className="card-image">
            <img
              src="https://picsum.photos/450/300?image=979"
              alt="Template Clássico"
            />
            <span className="card-title">Clássico</span>
          </div>
          <div className="card-content">
            <p className="descCard">
              Com informações menos detalhadas e menos precisas você poderá
              utilizar para entrevistas de emprego que não necessitem de tanta
              especialização para o cargo.
            </p>
          </div>
          <div className="card-action grey darken-4">
            <a className="white-text" href="/">
              Ecolher este tema{" "}
              <FontAwesomeIcon icon="arrow-alt-circle-right" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ContentTemplate;
