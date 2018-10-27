import React from 'react';
import './styles.css';

const Header = () => (
        <content id="main-header">
        
        <div className="container">
            <div className="row">

                <div className="col-md-6"> 
                    <div className="card mt-5">                        
                        <form>
                            <h2>Entrar</h2>
                            <div className="form-group">
                                <label for="exampleInputEmail1">Endereço de e-mail</label>
                                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Digite seu e-mail"></input>
                            </div>
                            <div className="form-group">
                                <label for="exampleInputPassword1">Senha</label>
                                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Senha"></input>
                            </div>
                            <button type="submit" className="btn btn-primary" id="entrar">Entrar</button>
                        </form>
                    </div>
                </div>

                <div className="linhVertical"></div>

                <div className="col-md-6">
                    <div className="card mt-5">
                        <form>
                            <h2>Cadastrar</h2>
                            <div className="form-group">
                                <label for="exampleInputEmail1">Endereço de e-mail</label>
                                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Digite seu e-mail"></input>
                            </div>
                            <div className="form-group">
                                <label for="exampleInputPassword1">Senha</label>
                                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Senha"></input>
                            </div>
                            <div className="form-group">
                                <label for="exampleInputPassword1">Confirmar senha</label>
                                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Confirme a sua senha"></input>
                            </div>
                            <button type="submit" className="btn btn-primary" id="cadastrar">Cadastrar</button>
                        </form>
                    </div>
                </div>

            </div>        
        </div>
        
        </content>
    );    

export default Header;