import React from "react";
import "./styles.css";
import { Input, Pagination } from "react-materialize";

const ListCurriculums = ({ curriculums }) => (
  <div className="row">
    {curriculums.map(curriculum => (
      <div className="col m4 s6" key={curriculum.id}>
        <div className="card">
          <div className="card-image waves-effect waves-block waves-light">
            <img
              className="activator"
              src="https://picsum.photos/250/250?image=1048"
              alt="tipoCurriculo"
            />
          </div>
          <div className="card-content">
            <span className="card-title activator grey-text text-darken-4">
              Título do currículo
              <i className="material-icons right">more_vert</i>
            </span>
            <h6>Criado em: {curriculum.createdAt}</h6>
            <div className="row acessarCurriculo">
              <div className="col s12 waves-effect waves-light btn btn-small indigo">
                <a
                  href="/curriculum/${curriculum.template}+${
          curriculum.id
        }"
                >
                  Acessar currículo
                </a>
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
                <a href="#">Editar</a>
              </div>
              <div className="col m12 s12 right-align waves-effect waves-light btn red darken-3">
                <a href="#">Excluir</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    ))}
    <div className="row">
      <div className="col s12">
        <div className="center-align">
          <ul className="pagination">
            <li className="disabled">
              <a href="#!">
                <i className="material-icons">chevron_left</i>
              </a>
            </li>
            <li className="active">
              <a href="#!">1</a>
            </li>
            <li className="waves-effect">
              <a href="#!">2</a>
            </li>
            <li className="waves-effect">
              <a href="#!">3</a>
            </li>
            <li className="waves-effect">
              <a href="#!">4</a>
            </li>
            <li className="waves-effect">
              <a href="#!">5</a>
            </li>
            <li className="waves-effect">
              <a href="#!">
                <i className="material-icons">chevron_right</i>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="fixed-action-btn">
        <a
          href="#"
          className="btn-floating btn-large purple waves-effect waves-light"
        >
          <i className="large material-icons">add</i>
        </a>
      </div>
    </div>
  </div>
);

export default ListCurriculums;
