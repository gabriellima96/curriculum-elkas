import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import ListCurriculums from '../ListCurriculums';
import './styles.css';

class ContentDash extends Component {
  state = {
    curriculums: [],
    loading: false,
    pageActive: 1,
    totalPagesArray: [],
  };

  async componentDidMount() {
    let { pageActive } = this.state;
    const {
      location: { search },
    } = this.props;

    const totalPagesArray = [];

    if (search) {
      const parts = search.split('=');
      if (parts[0] === '?page') {
        if (parts[1] && +parts[1]) {
          pageActive = +parts[1];
        }
      }
    }

    try {
      this.setState({ loading: true });
      const response = await api.get(`/curriculums?page=${pageActive}`);
      if (response.status === 204) {
        this.setState({ curriculums: [] });
      } else {
        const { curriculums, totalPages } = response.data;
        for (let i = 1; i <= totalPages; i += 1) {
          totalPagesArray.push(i);
        }

        this.setState({ curriculums, totalPagesArray, pageActive });
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ loading: false });
    }
  }

  async componentDidUpdate() {
    let { pageActive } = this.state;
    const {
      location: { search },
    } = this.props;

    if (search) {
      const parts = search.split('=');
      if (parts[0] === '?page') {
        if (parts[1] && +parts[1] && pageActive !== +parts[1]) {
          pageActive = +parts[1];
          console.log('Aqui');
          const response = await api.get(`/curriculums?page=${pageActive}`);
          if (response.status === 204) {
            this.setState({ curriculums: [] });
          } else {
            const { curriculums } = response.data;

            this.setState({ curriculums, pageActive });
          }
        }
      }
    }
  }

  render() {
    const {
      curriculums, pageActive, loading, totalPagesArray,
    } = this.state;
    return (
      <div className="container">
        {loading ? <div>Carregando..</div> : ''}
        {curriculums.length === 0 && pageActive === 1 ? (
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
          <Fragment>
            <ListCurriculums curriculums={curriculums} />
            <div className="row">
              <div className="col s12">
                <div className="center-align">
                  <ul className="pagination">
                    <li className="disabled">
                      <a href="#!">
                        <i className="material-icons">chevron_left</i>
                      </a>
                    </li>
                    {totalPagesArray
                      && totalPagesArray.length !== 0
                      && totalPagesArray.map(page => (
                        <li className={pageActive === page ? 'active' : 'waves-effect'}>
                          <Link to={`/app?page=${page}`}>{page}</Link>
                        </li>
                      ))}
                    <li className="disabled">
                      <a href="#!">
                        <i className="material-icons">chevron_right</i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="fixed-action-btn">
                <Link
                  to="/app/templates"
                  className="btn-floating btn-large purple waves-effect waves-light"
                >
                  <i className="large material-icons">add</i>
                </Link>
              </div>
            </div>
          </Fragment>
        )}
      </div>
    );
  }
}

export default ContentDash;
