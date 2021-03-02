import React, { Component } from 'react';
import './Loader.css';
export class Loader extends Component {
    render() {
        return (
            <div className="Loader">
                <div className="loader-wrapper">
                    <div className="lds-ripple">
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Loader;
