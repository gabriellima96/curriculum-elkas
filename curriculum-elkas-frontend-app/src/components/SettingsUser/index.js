import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withRouter } from 'react-router-dom';
import api from '../../services/api';
import { login, username } from '../../services/auth';
import './styles.css';

class SettingsUser extends Component {

    constructor(props){
        super(props);

        this.state = {
            addEmail: []
        }
    }

    addEmails(e){
        e.preventDefault();
        const {addEmail} = this.state;
        const newEmail = this.newEmail.value;

        const isOnTheList = addEmail.includes(newEmail);

        if(isOnTheList){
            this.setState({
                message: 'Esse email já foi adicionado.'
            })
        }
        else{
            newEmail !== '' && this.setState({
                addEmail: [...this.state.addEmail, newEmail],
                message: ''
            })
        }        

        this.addForm.reset();
    }

    deleteEmail(email){
        const newaddEmail = this.state.addEmail.filter(individualEmail => {
            return individualEmail !== email;
        })

        this.setState({
            addEmail:[...newaddEmail]
        })
    }

    render() {
        const {addEmail, message} = this.state;

        return(
            <div className="container">  
                <div className="row titleForm">
                    <h4>Configurações da conta</h4>
                    <div className="container">
                        <form className="col s12 formSettings" >
                            <div className="row">
                                <h5 className="subtitle center-align" >Informações da conta<hr></hr></h5>
                                <div className="input-field col s6">
                                    <input id="user_name" type="text" className="validate"></input>
                                    <label for="user_name">Nome de usuário</label>
                                </div>
                                <div className="input-field col s6">
                                    <input id="first_name" type="text" className="validate"></input>
                                    <label for="first_name">Nome completo</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                <input disabled value="example@example.com" id="disabled" type="text" className="validate"></input>
                                <label or="disabled">Email</label>
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

                        <form className="col s12 formSettings" > 
                            <div className="row">
                                <h5 className="subtitle center-align" >Informações pessoais<hr></hr></h5>
                                <form ref={input => this.addForm = input} onSubmit={(e) => {this.addEmails(e)}}>
                                    <div className="input-field col s11">
                                        <div className="row">            
                                            <input ref={input => this.newEmail = input} id="email" type="email" className="validate email"></input>
                                            <label for="email">Email</label>            
                                        </div>

                                        {
                                            message !== '' && <p className="red-text">{message}</p>
                                        }

                                        {
                                            addEmail.length > 0 && 
                                            <div>
                                                <table>
                                                    <thead>
                                                        <tr>
                                                            <th>Seus emails</th>
                                                        </tr>
                                                    </thead>

                                                    <tbody>
                                                        {
                                                            addEmail.map(email => {
                                                                return (
                                                                    <tr key={email}>
                                                                        <td>{email}</td>
                                                                        <td className="right-align">
                                                                            <button onClick={(e) => this.deleteEmail(email)} className="waves-effect waves-light btn red darken-3" type="button">
                                                                                Excluir                   
                                                                            </button>
                                                                        </td>
                                                                    </tr>
                                                                );
                                                            })
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                        }                                        
                                    </div> 
                                    <div className="col s1">            
                                    <button className="btn-floating btn-small waves-effect waves-light purple">
                                        <i className="material-icons">add</i>
                                    </button>
                                </div> 
                                </form>
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
