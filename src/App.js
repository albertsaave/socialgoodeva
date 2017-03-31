import React, { Component } from 'react';
import './App.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText, FlatButton} from 'material-ui/Card';
import getMuiTheme from 'material-ui/styles/getMuiTheme';// Needed for onTouchTap
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';

import StripeCheckout from 'react-stripe-checkout';

injectTapEventPlugin();

const muiTheme = getMuiTheme({
  fontFamily: 'Questrial, sans-serif',
  palette: {
    textColor: '#3eb1c8',
    primary1Color: '#3eb1c8',
    accent1Color: '#3eb1c8',
    primary2Color: '#3eb1c8'
  },
  tabs: {
    backgroundColor: '#f7f7f7',
    textColor: '#8c8c8c',
    selectedTextColor: '#3eb1c8'
  }
});

class App extends Component {

  onToken = (token) => {
    fetch('/save-stripe-token', {
      method: 'POST',
      body: JSON.stringify(token),
    }).then(response => {
      response.json().then(data => {
        alert(`We are in business, ${data.email}`);
      });
    });
  }

  constructor(props){
    super(props);
    this.state = {showCustomAmount: false};
  }

  handleClick = () => {
    this.setState({showCustomAmount: true});
  }

  render() {
    const style = {
      mainCard: {
        marginTop: '20px',
        width: '300px'
      }
    }
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className="App">
          <div className='row'>
            <h2>Help End Youth Homelessness.</h2>
          </div>
          <Card style={style.mainCard}>

            <RaisedButton label="Monthly" primary={true} style={{marginRight: '10px',
              marginTop: '10px'}}/>
            <RaisedButton label="One Time" style={{marginRight: '10px',
              marginTop: '10px'}}/>
            <CardTitle subtitle="you can cancel anytime!" />

            <CardTitle title="Amount" style={{textAlign: 'center'}} />

            <RaisedButton label="$50" style={{marginRight: '5px'}}/>
            <RaisedButton label="$100" style={{marginRight: '5px'}}/>
            <RaisedButton label="$150" style={{marginRight: '5px'}}/>
            <RaisedButton label="Other" style={{marginRight: '5px'}} onClick={this.handleClick}/>
            {  this.state.showCustomAmount &&
              <TextField
                defaultValue="$500"
                floatingLabelText="Floating Label Text"
              />
            }

            <div className='row'>
              <RaisedButton primary={true} label="Submit" style={{width: '100%', marginTop: '10px', backgroundColor: '#3eb1c8'}}
                label={<span>
                  <StripeCheckout
                    token={this.onToken}
                    stripeKey="pk_test_dZTC0BYbhboAzM3HuSRAd3RC"
                  />
                  <span style={{position: 'absolute', marginTop: '-36px', marginLeft: '-29px', zIndex: '-1'}}> Donate </span>
                  </span>}
                />
            </div>

           </Card>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
