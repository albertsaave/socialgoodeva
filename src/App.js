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
  fontFamily: 'Archivo Narrow, sans-serif',
  palette: {
    textColor: '#3eb1c8',
    primary1Color: '#3eb1c8',
    accent1Color: '#3eb1c8',
    accent1Color: '#f68d2e'
  },
  tabs: {
    backgroundColor: '#f7f7f7',
    textColor: '#8c8c8c',
    selectedTextColor: '#3eb1c8'
  }
});

class App extends Component {

  onToken = (token) => {
        this.setState({ showThankYouPage: true, showPaymentPage: false })
  }

  constructor(props){
    super(props);
    this.state = {showCustomAmount: false, donationAmount: 50,
      monthlyPayments: true, oneTimePayments: false, fiftyDollars: true,
      hundredDollars: false, hundredFiftyPayments: false, otherPayments: false,
      showPaymentPage: true, showThankYouPage:false};
  }

  handleClick = () => {
    this.setState({showCustomAmount: true});
  }

  handleChange = (event) => {
    this.setState({donationAmount: event.target.value});
  }

  showIfMonthly = () => {
    if (this.state.monthlyPayments) {
      return ' per month'
    }
  }

  render() {
    const style = {
      mainCard: {
        marginTop: '5px',
        width: '300px',
        boxShadow: 'none',
        padding: '7px'
      }
    }
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className="App">
          <div className='row'>
            <img src='https://tmpeva.s3.amazonaws.com/eva-logo.svg' style={{height: '40px', marginTop: '25px', marginBottom: '-10px'}}/>
            { this.state.showPaymentPage &&
              <h2 style={{color: '#404040', fontSize: '40px', marginBottom: '5px'}}>Help End Youth Homelessness.</h2>
            }

            { this.state.showThankYouPage &&
              <h2 style={{color: '#404040', fontSize: '40px', marginBottom: '5px'}}>Thank you for your donation.</h2>
            }

          </div>

          <div style={{width: '300px', margin: 'auto'}}>
            <Card style={style.mainCard}>
              { this.state.showPaymentPage &&
                <div>
                <div>
                <RaisedButton label="Monthly"
                  primary={this.state.monthlyPayments}
                  onTouchTap={() => this.setState({monthlyPayments: true, oneTimePayments: false})}
                  style={{marginRight: '10px', border: '1px solid #3eb1c8', boxShadow: 'none', borderRadius: '0',
                  marginTop: '10px', borderRadius: '3px'}}
                  />
                <RaisedButton label="One Time" primary={this.state.oneTimePayments}
                  primary={this.state.oneTimePayments}
                  onTouchTap={() => this.setState({oneTimePayments: true, monthlyPayments: false})}
                  style={{marginRight: '0px', border: '1px solid #3eb1c8', boxShadow: 'none',
                  marginTop: '10px', borderRadius: '3px'}}/>
                  { this.state.monthlyPayments &&
                    <p style={{color: '#f68d2e'}}> Receive an appreciation gift, cancel anytime. </p>
                  }
                  { this.state.oneTimePayments &&
                    <p style={{color: '#f68d2e'}}> Thank you! </p>
                  }
                <h5 style={{color:'#585858', margin: '0 0 10px 0', fontSize: '25px'}}> Amount </h5>
                  <div>
                    <span style={{color:'#585858', fontSize: '25px', verticalAlign: 'text-bottom'}}>$</span>
                    <TextField
                      style={{color: 'black', marginTop: '-20px', fontSize: '35px', width: '260px', padding: '5px'}}
                      value={this.state.donationAmount}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>

                <div className='row'>
                  <RaisedButton secondary={true} label="Submit" style={{width: '100%', marginTop: '12px', backgroundColor: '#3eb1c8', height: '46px'}}
                    label={<span>
                      <p style={{zIndex: '-1', margin: '-6px', fontSize: '19px'}}> Donate ${this.state.donationAmount}{this.showIfMonthly()} </p>
                      <StripeCheckout
                        token={this.onToken}
                        stripeKey="pk_test_dZTC0BYbhboAzM3HuSRAd3RC"
                        amount={this.state.donationAmount*100}
                        currency="CAD"
                      />
                      </span>}
                    labelStyle={{height: 0}}
                    />
                </div>
                </div>
              }
             </Card>
           </div>
           { this.state.showPaymentPage &&
             <p style={{color: '#404040', fontSize: '18px', margin: 'auto', marginTop: '15px', maxWidth: '500px'}}>When you give to Eva’s, you help homeless youth get the skills and support they need for a better future.</p>
           }

           { this.state.showThankYouPage &&
             <div>
              IMAGE & share
             </div>
           }
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
