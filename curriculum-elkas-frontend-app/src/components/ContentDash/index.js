import React, { Component } from 'react';
import api from '../../services/api';
import ListCurriculums from '../ListCurriculums';
import './styles.css';

class ContentDash extends Component {
  state = {
    curriculums: [],
    loading: false,
    page: 1,
    totalPages: 0,
  };

  async componentDidMount() {
    try {
      this.setState({ loading: true });
      const { page } = this.state;
      const response = await api.get(`/curriculums?page=${page}`);
      if (response.status === 204) {
        this.setState({ curriculums: [] });
      } else {
        const { curriculums, totalPages } = response.data;
        this.setState({ curriculums, totalPages });
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ loading: false });
    }
  }

  render() {
    const { curriculums, page, loading } = this.state;
    return (
      <div className="container">
        {loading ? <div>Carregando..</div> : ''}
        {curriculums.length === 0 && page === 1 ? (
          <div className="row">
            <div className="center-align alert">
              <h4>Você ainda não adicionou nenhum currículo :(</h4>
              <h5>Clique no botão para adicionar!</h5>
              <br />
              <a
                className="btn-floating btn-large purple waves-effect waves-light red"
                href="/app/templates"
              >
                <i className="material-icons">add</i>
              </a>
            </div>
          </div>
        ) : (
          <ListCurriculums curriculums={curriculums} />
        )}
      </div>
    );
  }
}

export default ContentDash;
