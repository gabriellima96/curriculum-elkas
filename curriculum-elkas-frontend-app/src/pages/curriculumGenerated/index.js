import React, { Fragment } from "react";
import HeaderApp from "../../components/HeaderApp";
import CurriculumGenerated from "../../components/CurriculumGenerated";
 const ModernForm = props => (
  <Fragment>
    <HeaderApp />
    <CurriculumGenerated propsM={props} />
  </Fragment>
);
export default ModernForm;
