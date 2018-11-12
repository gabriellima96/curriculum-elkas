import React from 'react';

export const verifyCurriculum = ({ match }) => {
  const {
    params: { id },
  } = match;

  if (id.startsWith('1m')) {
    return <h1>Template moderno</h1>;
  }

  if (id.startsWith('1c')) {
    return <h1>Template clássico</h1>;
  }

  return <h1>Não existe curriculo com esse id</h1>;
};
