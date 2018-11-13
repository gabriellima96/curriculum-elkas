import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const ListCurriculums = ({ curriculums }) => (
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
                <Link className="curriculumAccess" to={`/${curriculum.template}${curriculum._id}`}>
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
              <div className="col m12 s12 left-align waves-effect waves-light btn  yellow darken-4">
                <Link to="/" className="buttonCards">
                  Editar
                  {' '}
                  <i className="material-icons center">edit</i>
                </Link>
              </div>
              <div className="col m12 s12 right-align waves-effect waves-light btn red darken-3">
                <a href="/" className="buttonCards">
                  Excluir
                  {' '}
                  <i className="material-icons center">delete</i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default ListCurriculums;
