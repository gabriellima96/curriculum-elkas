import React, { Fragment, Component } from 'react';
import Header from '../../components/Header';
import CurriculumGenerated from '../../components/CurriculumGenerated';
import './styles.css';
import api from '../../services/api';
import LoadingPage from '../loadingPage';

class ModernForm extends Component {
  state = { curriculum: '', loading: false, error: false };

  async componentDidMount() {
    const { id } = this.props;
    this.setState({ loading: true });
    try {
      const response = await api.get(`/curriculums/${id}`);
      console.log(response.data);
      this.setState({ curriculum: response.data });
    } catch (error) {
      this.setState({ error: true });
    } finally {
      this.setState({ loading: false });
    }
  }

  render() {
    const { curriculum, loading, error } = this.state;
    return (
      <Fragment>
        <Header />
        {error && (
          <div className="content loading">
            <div className="row">
              <div className="col s12 alert2">
                <h4>Ops, parece que não achamos nenhum currículo..</h4>
                <h5>... ;(</h5>
              </div>
            </div>
          </div>
        )}
        {!error
          && (loading ? (
            <div className="loading">
              <LoadingPage />
            </div>
          ) : (
            <div className="header">
              <CurriculumGenerated curriculum={curriculum} />
            </div>
          ))}
      </Fragment>
    );
  }
}
export default ModernForm;
