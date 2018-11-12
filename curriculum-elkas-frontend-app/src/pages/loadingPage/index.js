import React, { Fragment } from "react";
import { Preloader } from "react-materialize";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HeaderApp from "../../components/HeaderApp";
import "./style.css";

const LoadingPage = ({ location }) => (
  <Fragment>
    <HeaderApp />
    <div className="content">
      <div className="row">
        <div className="col s12 alert2">
          <h4>Seu currículo está sendo gerado!</h4>
          <h5>Relaxa aí, já já fica pronto ;)</h5>
          <br />
          <Preloader size="big" flashing />
        </div>
      </div>
    </div>
  </Fragment>
);
export default LoadingPage;
