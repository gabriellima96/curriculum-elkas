import React, { Fragment, Component } from 'react';
import Header from '../../components/Header';
import CurriculumGenerated from '../../components/CurriculumGenerated';
import './styles.css';

class ModernForm extends Component {
  state = { curriculum: '' };

  render() {
    const curriculum = this.state;
    return (
      <Fragment>
        <Header />
        <div className="header">
          <CurriculumGenerated curriculum={curriculum} />
        </div>
      </Fragment>
    );
  }
}
export default ModernForm;
