import React, { Component } from "react";

class App extends Component {

  state = {
    username: ''
  }

  //Function gets called in LoginForm but state is being set in App
  onSubmit = (usernameFromBelow) => {
    this.setState({ username: usernameFromBelow })
  }

  render() {
    return (
      <div className="App">
        <h1>Logged in as:{ this.state.username }</h1>
        <LoginForm onSubmitFromAbove={this.onSubmit}/>
      </div>
    );
  }
}

class LoginForm extends Component {

  state = {
    username: '',
    password: '',
    error: false
  }

  onChange = (e) => {
    this.setState({ [e.target.name] : e.target.value })
  }

  onSubmit = (e) => {
    e.preventDefault();
    if(this.state.username && this.state.password){
      this.setState({ error: false})
    }else{
      this.setState({ error: true });
    }
    //The local onSubmit function calls the .onSubmit from <App />
    this.props.onSubmitFromAbove(this.state.username);
  }

  render(){
    const errorMessage = this.state.error ? <p> Error </p> : '';
    const hasError = this.state.error ? 'has-danger' : '';
    return(
      <div style={{maxWidth: "50%", margin: "5rem auto"}}>
        <form onSubmit={this.onSubmit}>
            { errorMessage }
            <div className={`form-group ${hasError}`}>
              <label htmlFor="username">
                  Username
              </label>
              <input 
                type="text" 
                className="form-control" 
                name="username"
                onChange={this.onChange}
                value={this.state.username}  />
                { this.state.error && 
                  <div className="form-control-feedback"> Error! You failed!</div>
                }
            </div>
            <div className={`form-group ${hasError}`}>
              <label htmlFor="password">
                Password
              </label>
              <input 
                type="password" 
                className="form-control" 
                name="password"
                onChange={this.onChange}
                value={this.state.password} />
            </div>
            <input  type="submit" 
                    className="btn btn-primary" 
                    value="Login" />
        </form>
      </div>
    );
  }
}  