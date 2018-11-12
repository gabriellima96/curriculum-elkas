import React, { Fragment } from "react";
import HeaderApp from "../../components/HeaderApp";
import FormModern from "../../components/FormModern";

const ModernFormulario = props => (
  <Fragment>
    <HeaderApp />
    <FormModern propsM={props} />
  </Fragment>
);

export default ModernFormulario;
