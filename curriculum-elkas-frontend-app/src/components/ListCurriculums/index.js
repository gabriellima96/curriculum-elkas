import React from "react";
import "./styles.css";

const ListCurriculums = ({ curriculums }) => (
  <div className="row">
    <h4 className="center-align">Seus currículos</h4>
    {curriculums.map(curriculum => (
      <div className="col m4 s6" key={curriculum.id}>
        <div class="card">
          <div class="card-image waves-effect waves-block waves-light">
            <img
              class="activator"
              src="https://picsum.photos/250/250?image=1048"
            />
          </div>
          <div class="card-content">
            <span class="card-title activator grey-text text-darken-4">
              Título do currículo
              <i class="material-icons right">more_vert</i>
            </span>
            <h6>Criado em: {curriculum.createdAt}</h6>
            <div className="card-action left-align">
              <p>
                <a
                  href="www.localhost:3000/curriculum/${curriculum.template}+${
          curriculum.id
        }"
                  className="purple-text"
                >
                  Acessar currículo
                </a>
              </p>
            </div>
          </div>
          <div class="card-reveal">
            <span class="card-title grey-text text-darken-4">
              Título do currículo
              <i class="material-icons right">close</i>
            </span>
            <p>Resumo do currículo</p>
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default ListCurriculums;
