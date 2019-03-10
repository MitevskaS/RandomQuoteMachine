import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import colors from './resources/colors';
import './style/App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // empty object where fetched data will be stored
      data: {},
      isLoading: false,
      error: null
    }
    this.generateRandomQuote = this.generateRandomQuote.bind(this)
  }

  componentWillMount() {
    // calling function generateRandomQuote
    this.generateRandomQuote();
  }

  render() {
    const { data, isLoading, error } = this.state;
    // link for sharing quote text on twitter
    const link = "https://twitter.com/intent/tweet?text="+data.quoteText+" - "+data.quoteAuthor;

    return (
      <div 
        className="App" 
        style={{
          backgroundColor: data.color
        }}>
        {
          isLoading ? (
            <Loader/>
          ):(
            error != null ? (
              <p>{error}</p>
            ):( 
              <div 
                id="quote-box"
                className="App-wrapper"
                style={{
                  color: data.color
                }}>
                <h2
                  id="text">
                  <i 
                    className="fa fa-quote-left"
                    style={{marginRight: 10}}></i>
                  {data.quoteText}
                </h2>
                <p
                  id="author">
                  - {data.quoteAuthor}
                </p>
                <a
                  id="tweet-quote"
                  className="btn share"
                  style={{backgroundColor: data.color}}
                  target="_blank"
                  href={link}>
                  <i className="fa fa-twitter"></i>
                </a>

                <a
                  className="btn share"
                  href="https://www.tumblr.com"
                  target="_blank"
                  style={{backgroundColor: data.color}}>
                  <i className="fa fa-tumblr"></i>
                </a>
                <button
                  id="new-quote"
                  className="btn"
                  style={{backgroundColor: data.color}}
                  onClick={this.generateRandomQuote}>
                  New quote
                </button>
              </div>
            )
          )
        }
        <span
          className="creator">
          by Mitevska
        </span>
        {/*<div 
          ref={el => (this.instance = el)} />*/}
      </div>
    );
  }

  // this function generates random quote
  generateRandomQuote = () => {
    this.setState({ 
      isLoading: true 
    });
    // fetch random quote from API
    fetch('https://quota.glitch.me/random')
    .then(response => 
      response.json()
    )
    .then(data => {
      // get random index number from 0-9 
      var index = Math.floor(Math.random() * 10)
      // add key color to the data object with value of the color from array of colors with the random index 
      data["color"] = colors.colors[index];
      // set fetched data to state
      this.setState({
        data: data,
        isLoading: false 
      })
    })
    .catch(error => 
      this.setState({ 
        error, 
        isLoading: false 
      })
    );
  }

  componentDidMount() {
    // adding script tag to document
    // const s = document.createElement('script');
    // s.type = 'text/javascript';
    // s.async = true;
    // s.src = "https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js";
    // this.instance.appendChild(s);
  }

  componentWillUnmount() {

  }

}

// stateless Loader component 
class Loader extends Component {
  render(){
    return (
      <div>
        <i 
          className="fa fa-circle-o-notch fa-spin fa-lg loader">
        </i>
        <p
          className="loader">
          Loading ... Please wait
        </p>
      </div>
    )
  }
}

export default App;