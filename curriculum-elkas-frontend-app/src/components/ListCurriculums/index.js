import React from 'react';
import './styles.css';

const ListCurriculums = ({ curriculums }) => (
  <div className="row">
    {curriculums.map(curriculum => (
      <div className="col m2" key={curriculum.id}>
        <div className="card z-depth-2">
          <h3>{curriculum.template}</h3>
          <p>{curriculum.createdAt}</p>
          <p>Editar</p>
        </div>
        <p>{`Link: www.localhost:3000/curriculum/${curriculum.template}+${curriculum.id}`}</p>
      </div>
    ))}
  </div>
);

export default ListCurriculums;
