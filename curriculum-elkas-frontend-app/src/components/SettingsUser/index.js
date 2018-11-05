import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withRouter } from 'react-router-dom';
import api from '../../services/api';
import { login, username } from '../../services/auth';
import './styles.css';

class SettingsUser extends Component {

    addEmail = () => 
        <div className="row">
            <div className="input-field col s12">
            <input id="email" type="email" className="validate"></input>
            <label for="email">Email</label>
            </div>
        </div>;

    render() {

        return(
            <div className="container">  
                <div className="row titleForm">
                    <h4>Configurações da conta</h4>
                    <div className="container">
                        <form className="col s12 formSettings">
                            <div className="row">
                                <h5 className="subtitle center-align" >Informações da conta<hr></hr></h5>
                                <div className="input-field col s12">
                                    <input id="user_name" type="text" className="validate"></input>
                                    <label for="user_name">Nome de usuário</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s6">
                                    <input id="first_name" type="text" className="validate"></input>
                                    <label for="first_name">Nome</label>
                                </div>
                                <div className="input-field col s6">
                                    <input id="last_name" type="text" className="validate"></input>
                                    <label for="last_name">Sobrenome</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                <input disabled value="example@example.com" id="disabled" type="text" className="validate"></input>
                                <label for="disabled">Email</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s6">
                                <input id="password" type="password" className="validate"></input>
                                <label for="password">Senha atual</label>
                                </div>
                                <div className="input-field col s6">
                                <input id="password" type="password" className="validate"></input>
                                <label for="password">Nova senha</label>
                                </div>
                            </div>

                            <div className=" center-align">
                                <button className="waves-effect waves-light btn indigo" type="submit" name="action">
                                    Salvar mudanças
                                    {' '}    
                                    <FontAwesomeIcon icon="sign-in-alt" />                    
                                </button>
                            </div>                               
                        </form>

                        <form className="col s12 formSettings">
                            {this.addEmail()}
                            <div className="row">
                                <div className="input-field col s6">
                                <input id="password" type="password" className="validate"></input>
                                <label for="password">Nova senha</label>
                                </div>
                                <div className="input-field col s6">
                                <input id="password" type="password" className="validate"></input>
                                <label for="password">Repetir nova senha</label>
                                </div>
                            </div>

                            <div className=" center-align">
                                <button className="waves-effect waves-light btn indigo" type="submit" name="action">
                                    Salvar mudanças
                                    {' '}    
                                    <FontAwesomeIcon icon="sign-in-alt" />                    
                                </button>
                            </div>   
                        </form>
                    </div>
                </div>
            </div> 
        );
    }
};

export default SettingsUser;
