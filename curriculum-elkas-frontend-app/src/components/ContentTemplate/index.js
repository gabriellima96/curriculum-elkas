import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withRouter } from 'react-router-dom';
import { getUsername, logout } from '../../services/auth';
import api from '../../services/api';

const ContentTemplate = () => (

    <div className="container">
        <div className="row">            
            <h3>
                Templates
            </h3>
        </div>        
    </div>
);

export default ContentTemplate;
