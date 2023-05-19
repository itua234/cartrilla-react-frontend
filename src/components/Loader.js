import React, {useState} from 'react';
import axios from 'axios'; 
import {useNavigate} from 'react-router-dom';

const Loader = (props) => {
    return (
        <>
            <div className="newsletter-animation pos-absolute rounded-end" style={props.view}>
                <div className="wave"></div>
                <div className="wave"></div>
                <div className="wave"></div>
                <div className="wave"></div>
                <div className="wave"></div>
            </div>
        </>
    );
}

export default Loader;
