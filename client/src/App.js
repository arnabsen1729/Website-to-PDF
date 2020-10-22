import React from 'react';
import './App.css';
import axios from 'axios'
import Loader from './loader/Loader'
import urlSVG from './logos/urlSVG.svg'
import downSVG from './logos/downSVG.svg'
import webSVG from './logos/webSVG.svg'
import rightSVG from './logos/rightSVG.svg'
import pdfSVG from './logos/pdfSVG.svg'
import githubSVG from './logos/githubSVG.svg'
import linkedinSVG from './logos/linkedinSVG.svg'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '', loading: false};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {

    event.preventDefault();
    console.log('btn')
    this.setState({
      loading: true
    })
    const pageLink = encodeURI(this.state.value);
    const resp = axios.get(`http://localhost:5000?url=${pageLink}`, {
      responseType: 'arraybuffer',
      headers: {
        'Accept': 'application/pdf'
      }
    })
    resp.then((response) => {
      this.setState({
        loading: false
      })
      const blob = new Blob([response.data], { type: 'application/pdf' })
      const link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = `file.pdf`
      link.click()
    }).catch((err)=>{
      console.log(err)
      this.setState({
        loading: false
      })
    })
  }
  render() {
    return (
      <div className="App">
        {(this.state.loading? <Loader />:'')}
        <div className="form-div">
          <div className="logo-wrapper">
            <img alt="logo" className="logo" src={webSVG} />
            <img alt="logo" className="logo" src={rightSVG} />
            <img alt="logo" className="logo" src={pdfSVG} />
          </div>
          <div className="heading">Website to PDF</div>
          <div className="sub-heading">Paste the link of the website</div>
          <form onSubmit={this.handleSubmit}>
            <div className="fields">
              <div className="url" ><img alt="logo" className="svg-icons" src={urlSVG} /><input placeholder="Page URL" type="text" value={this.state.value} onChange={this.handleChange} /></div>
            </div>
            <div className="btn-wrapper">
              <button className="download-btn" type="submit"><img alt="logo" className="svg-icons" src={downSVG} />Download</button>
            </div>
          </form>
          <div className="logo-wrapper-2">
            <a href="https://github.com/arnabsen1729"><img alt="logo" className="logo" src={githubSVG}/></a>
            <a href="https://www.linkedin.com/in/arnab-sen-b6950a194/"><img alt="logo" className="logo" src={linkedinSVG}/></a>
          </div>
        </div>
      </div>
    );
  }

}

export default App;
