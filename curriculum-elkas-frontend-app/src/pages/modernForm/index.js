import React, { Fragment } from 'react';
import Header from '../../components/Header';
import CurriculumGenerated from '../../components/CurriculumGenerated';
import './styles.css';

const ModernForm = props => (
  <Fragment>
    <Header />
    <div className="header">
      <CurriculumGenerated propsM={props} />
    </div>
  </Fragment>
);
export default ModernForm;
