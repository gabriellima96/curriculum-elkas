import React from 'react';
import './styles.css';

const ContentDash = () => (

    <div className="container">
        <div className="row">            
            <div className="center-align alert">
                <h4>Você ainda não adicionou nenhum currículo :(</h4>
                <h5>Clique no botão para adicionar!</h5>
                <br></br>
                <a className="btn-floating btn-large purple waves-effect waves-light red" href="/app/templates"><i className="material-icons">add</i></a>
            </div>
        </div>        
    </div>
);

export default ContentDash;
