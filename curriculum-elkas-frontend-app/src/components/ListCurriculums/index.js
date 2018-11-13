import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon } from 'react-materialize';
import api from '../../services/api';
import './styles.css';

class ListCurriculums extends Component {
  state = { curriculums: [] };

  componentDidMount() {
    const { curriculums } = this.props;
    console.log(this.props);
    this.setState({ curriculums });
  }

  handleDelete = async (e) => {
    const response = await api.delete(`/curriculums/${e.id}`);
  };

  render() {
    const { curriculums } = this.state;
    return (
      <div className="row">
        {curriculums.map(curriculum => (
          <div className="col m4 s6" key={curriculum._id}>
            <div className="card hoverable">
              <div className="card-image waves-effect waves-block waves-light">
                <img
                  className="activator"
                  src="https://picsum.photos/250/250?image=1048"
                  alt="tipoCurriculo"
                />
              </div>
              <div className="card-content">
                <span className="card-title activator grey-text text-darken-4">
                  {curriculum.title}
                  <i className="material-icons right">more_vert</i>
                </span>
                <h6>{`Criado em: ${new Date(curriculum.createdAt).toLocaleString()}`}</h6>
                <div className="row acessarCurriculo">
                  <div className="col s12 waves-effect waves-light btn btn-small indigo">
                    <Link
                      className="curriculumAccess"
                      to={`/${curriculum.template}${curriculum._id}`}
                    >
                      Acessar currículo
                    </Link>
                  </div>
                </div>
              </div>
              <div className="card-reveal">
                <span className="card-title grey-text text-darken-4 curriculumTitle">
                  Título do currículo
                  <i className="material-icons right">close</i>
                </span>
                <div className="row">
                  <div className="col m12 s12 left-align waves-effect waves-light center darken-4">
                    <Button className="btn  yellow">
                      Editar
                      {' '}
                      <i className="material-icons center">edit</i>
                    </Button>
                  </div>

                  <form
                    onSubmit={(e) => {
                      e.id = curriculum._id;
                      this.handleDelete(e);
                    }}
                    className="col m12 s12 right-align waves-effect waves-light darken-3 center"
                  >
                    <Button type="submit" className="red buttonCards">
                      Excluir
                      <Icon center>delete</Icon>
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default ListCurriculums;
