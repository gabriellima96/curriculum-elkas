import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Cadastrar = () => (
    <cadastrar>        
                <div className="col m6">
                    <div className="card">                        
                        <form>   
                        <h4>Cadastrar</h4>                      
                            <div className="row">   
                                <div className="input-field col s12">
                                    <input id="email_inline" type="email" className="validate"></input>
                                    <label for="email_inline">Email</label>
                                    <span className="helper-text" data-error="Algo está errado!" data-success="Ok.">Verificação</span>
                                </div>                             
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                <input id="password" type="password" className="validate"></input>
                                <label for="password">Senha</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                <input id="password" type="password" className="validate"></input>
                                <label for="password">Repetir a senha</label>
                                </div>
                            </div>
                            <button className="btn waves-effect waves-light" type="submit" name="action" id="cadastrar">Cadastrar <FontAwesomeIcon icon="user-plus" />
                            </button>
                        </form>
                    </div>
                </div>

       </cadastrar>
    );    

export default Cadastrar;