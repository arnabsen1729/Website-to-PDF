import React from 'react';
import './App.css';
import axios from 'axios';
import Loader from './loader/Loader';

// Importing the SVGs
import urlSVG from './logos/urlSVG.svg';
import downSVG from './logos/downSVG.svg';
import webSVG from './logos/webSVG.svg';
import rightSVG from './logos/rightSVG.svg';
import pdfSVG from './logos/pdfSVG.svg';
import githubSVG from './logos/githubSVG.svg';
import linkedinSVG from './logos/linkedinSVG.svg';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            loading: false,
            valid: true,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
        const url = event.target.value;
        if (regexp.test(url)) {
            this.setState({ value: event.target.value, valid: true });
        } else {
            this.setState({ value: event.target.value, valid: false });
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.state.valid === false) {
            alert('Enter correct URL');
            return;
        }
        this.setState({
            loading: true,
        });
        const pageLink = encodeURI(this.state.value);
        const resp = axios.get(
            `https://website-to-pdf.onrender.com/api/?url=${pageLink}`,
            {
                responseType: 'arraybuffer',
                headers: {
                    Accept: 'application/pdf',
                },
            }
        );
        resp.then((response) => {
            this.setState({
                loading: false,
            });
            const blob = new Blob([response.data], { type: 'application/pdf' });
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = `file.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            console.log('Download Started....');
        }).catch((err) => {
            console.log(err);
            this.setState({
                loading: false,
            });
        });
    }
    render() {
        return (
            <div className="App">
                {this.state.loading ? <Loader /> : ''}
                <div className="form-div">
                    <div className="logo-wrapper">
                        <img alt="logo" className="logo" src={webSVG} />
                        <img alt="logo" className="logo" src={rightSVG} />
                        <img alt="logo" className="logo" src={pdfSVG} />
                    </div>
                    <div className="heading">Website to PDF</div>
                    <div className="sub-heading">
                        Paste the link of the website
                    </div>
                    <form onSubmit={this.handleSubmit}>
                        <div className="fields">
                            <div className="url">
                                <img
                                    alt="logo"
                                    className="svg-icons"
                                    src={urlSVG}
                                />
                                <input
                                    placeholder="Page URL"
                                    type="text"
                                    value={this.state.value}
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>
                        <div className="btn-wrapper">
                            <button className="download-btn" type="submit">
                                <img
                                    alt="logo"
                                    className="svg-icons"
                                    src={downSVG}
                                />
                                Download
                            </button>
                        </div>
                    </form>
                    <div className="logo-wrapper-2">
                        <a href="https://github.com/arnabsen1729">
                            <img alt="logo" className="logo" src={githubSVG} />
                        </a>
                        <a href="https://www.linkedin.com/in/arnab-sen-b6950a194/">
                            <img
                                alt="logo"
                                className="logo"
                                src={linkedinSVG}
                            />
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
