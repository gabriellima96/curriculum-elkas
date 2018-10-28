import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Entrar = () => (     
    <entrar>
        <div className="container">
            <div className="row">
                <div className="col m6"> 
                    <div className="card">                        
                        <form>   
                        <h4>Entrar</h4>                      
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
                            <button className="btn waves-effect waves-light" type="submit" name="action" id="entrar">Entrar <FontAwesomeIcon icon="sign-in-alt" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>        
        </div>
    </entrar>        
    );    

export default Entrar;