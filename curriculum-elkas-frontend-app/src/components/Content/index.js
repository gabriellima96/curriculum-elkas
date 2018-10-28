import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Cadastrar from './Cadastrar';
import Entrar from './Entrar';
import './styles.css';

const Content = () => (
        <content>
            
            <div className="container">
                <div className="row">

                    <Entrar/>
                    <Cadastrar/> 

                </div>        
            </div>    
        
        </content>
    );    

export default Content;