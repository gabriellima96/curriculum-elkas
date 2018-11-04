import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withRouter } from 'react-router-dom';
import { getUsername, logout } from '../../services/auth';
import api from '../../services/api';
import "./styles.css";

const SettingsUser = () => (

    <div className="container">  
        <div className="row formSettings">
            <h4>Configurações da conta</h4>
            <form className="col s12">
            <div className="row">
                <div className="input-field col s6">
                <input placeholder="Placeholder" id="first_name" type="text" className="validate"></input>
                <label for="first_name">Nome</label>
                </div>
                <div className="input-field col s6">
                <input placeholder="Placeholder" id="first_name" type="text" className="validate"></input>
                <label for="first_name">Sobrenome</label>
                </div>
            </div>
            <div className="row">
                <div class="input-field col s12">
                <input disabled value="I am not editable" id="disabled" type="text" className="validate"></input>
                <label for="disabled">Disabled</label>
                </div>
            </div>
            <div className="row">
                <div className="input-field col s12">
                <input id="password" type="password" className="validate"></input>
                <label for="password">Password</label>
                </div>
            </div>
            <div className="row">
                <div className="input-field col s12">
                <input id="email" type="email" className="validate"></input>
                <label for="email">Email</label>
                </div>
            </div>
            <div className="row">
                <div className="col s12">
                This is an inline input field:
                <div className="input-field inline">
                    <input id="email_inline" type="email" className="validate"></input>
                    <label for="email_inline">Email</label>
                    <span className="helper-text" data-error="wrong" data-success="right">Helper text</span>
                </div>
                </div>
            </div>
            </form>
        </div>
    </div> 
);

export default SettingsUser;
