import React, { Component } from 'react';
import './App.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText, FlatButton} from 'material-ui/Card';
import getMuiTheme from 'material-ui/styles/getMuiTheme';// Needed for onTouchTap
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import {
  ShareButtons,
  generateShareIcon
} from 'react-share';

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

const {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton
} = ShareButtons;

const FacebookIcon = generateShareIcon('facebook');

const TwitterIcon = generateShareIcon('twitter');

const LinkedinIcon = generateShareIcon('linkedin');

class App extends Component {

  onToken = (token) => {
        this.setState({ showThankYouPage: true, showPaymentPage: false })
  }

  constructor(props){
    super(props);
    this.state = {showCustomAmount: false, donationAmount: 50,
      monthlyPayments: true, oneTimePayments: false, fiftyDollars: true,
      hundredDollars: false, hundredFiftyPayments: false, otherPayments: false,
      showPaymentPage: true, showThankYouPage:false, fiftyBucks: false, twentyBucks: true,
      onHundred: false, TwoFiddyHundred: false, fiveHundoDollas: false};
  }

  componentDidMount() {

    window.Stripe.setPublishableKey('pk_test_dZTC0BYbhboAzM3HuSRAd3RC');

    window.Stripe.applePay.checkAvailability(function(available) {
    if (available) {
      document.getElementById('apple-pay-button').style.display = 'block';
    }
    });

  }

  handleClick = () => {
    this.setState({showCustomAmount: true});
  }

  handleChange = (event) => {
    this.setState({donationAmount: event.target.value});
    if (event.target.value <= 50) {
      this.setState({fiftyBucks: false, twentyBucks: true, onHundred: false,
      TwoFiddyHundred: false, fiveHundoDollas: false});
    }
    if (event.target.value > 50 && event.target.value <= 100) {
      this.setState({fiftyBucks: true, twentyBucks: false, onHundred: false,
      TwoFiddyHundred: false, fiveHundoDollas: false});
    }
    if (event.target.value > 100 && event.target.value <= 250) {
      this.setState({fiftyBucks: false, twentyBucks: false, onHundred: true,
      TwoFiddyHundred: false, fiveHundoDollas: false});
    }
    if (event.target.value > 250 && event.target.value <= 500) {
      this.setState({fiftyBucks: false, twentyBucks: false, onHundred: false,
      TwoFiddyHundred: true, fiveHundoDollas: false});
    }
    if (event.target.value > 500) {
      this.setState({fiftyBucks: false, twentyBucks: false, onHundred: false,
      TwoFiddyHundred: false, fiveHundoDollas: true});
    }
  }

  showIfMonthly = () => {
    if (this.state.monthlyPayments) {
      return ' per month'
    }
  }

  beginApplePay = () => {
  var paymentRequest = {
    countryCode: 'CA',
    currencyCode: 'CAD',
    total: {
      label: 'Evas',
      amount: this.state.donationAmount
      }
    };
    showSuccessPage = () => {
      this.setState({ showThankYouPage: true, showPaymentPage: false }, function () {
          console.log(this.state.value);
      });
    }
    var session = window.Stripe.applePay.buildSession(paymentRequest,
        function(result, completion) {
        completion(window.ApplePaySession.STATUS_SUCCESS);
        showSuccessPage();

      }, function(error) {
        console.log(error.message);
      });

      session.oncancel = function() {
        console.log("User hit the cancel button in the payment window");
      };

      session.begin();
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
            <img src='https://tmpeva.s3.amazonaws.com/eva-logo.svg' style={{height: '40px', marginTop: '6%', marginBottom: '-10px'}}/>
            { this.state.showPaymentPage &&
              <div>
                <h2 style={{color: '#404040', fontSize: '40px', marginBottom: '0px'}}>Help end</h2>
                <h2 style={{color: '#404040', fontSize: '40px', marginBottom: '0px', marginTop: '0'}}>youth homelessness</h2>
                <p style={{color: '#404040', fontSize: '20px', margin: 'auto', marginTop: '8px', marginBottom: '20px', maxWidth: '500px'}}>Provide them with the skills and support they need.</p>

              </div>


            }

            { this.state.showThankYouPage &&
              <h2 style={{color: '#404040', fontSize: '40px', marginBottom: '5px'}}>Thank you for your donation!</h2>
            }

          </div>

          <div style={{width: '300px', margin: 'auto', marginBottom: '30px'}}>
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
                    <p style={{color: '#f68d2e'}}>  </p>
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

                { this.state.twentyBucks &&
                  <span><img src='images/hygeine.png' style={{height: '33px', display: 'inline-flex', verticalAlign: 'middle', marginRight: '10px'}}/><p style={{color: '#404040', display:'inline-flex'}}> can provide personal hygiene supplies. </p></span>
                }
                { this.state.fiftyBucks &&
                  <span><img src='images/food.png' style={{height: '33px', display: 'inline-flex', verticalAlign: 'middle', marginRight: '10px'}}/><p style={{color: '#404040', display:'inline-flex'}}> can provide nourishment for two weeks. </p></span>
                }
                { this.state.onHundred &&
                  <span><img src='images/tttc.png' style={{height: '33px', display: 'inline-flex', verticalAlign: 'middle', marginRight: '10px'}}/><p style={{color: '#404040', display:'inline-flex'}}> can provide three weeks of TTC access. </p></span>
                }
                { this.state.TwoFiddyHundred &&
                  <span><img src='images/eduction.png' style={{height: '33px', display: 'inline-flex', verticalAlign: 'middle', marginRight: '10px'}}/><p style={{color: '#404040', display:'inline-flex'}}> can provide educational counselling. </p></span>
                }
                { this.state.fiveHundoDollas &&
                  <span><img src='images/shelter.png' style={{height: '33px', display: 'inline-flex', verticalAlign: 'middle', marginRight: '10px'}}/><p style={{color: '#404040', display:'inline-flex'}}> can provide safe shelter for two weeks. </p></span>
                }

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
                  <button id="apple-pay-button" onTouchTap={this.beginApplePay.bind(this)}></button>
                </div>
              }

              { this.state.showThankYouPage &&
                <div style={{margin: 'auto', marginTop: '15px', maxWidth: '500px'}}>
                  <img src='./images/thankyoushare.jpg' style={{marginLeft: '-7px', height: '300px', width:'300px', marginTop: '10px', marginBottom: '15px'}}/>

                 <div style={{width: '100%', color: '#404040'}}>
                  Share the pledge with your friends
                 </div>
                 <div style={{marginLeft: '27%'}}>
                   <div style={{marginTop: '20px', float: 'left', width: '50px'}}>
                     <FacebookShareButton title={'I just supported Eva\'s in their work to end youth homelessness!'} description={'Please join me in helping Eva\'s get homeless and at-risk youth off the streets, find housing and community supports, and begin to rebuild their futures!'} url={'http://evas.ca'}>
                       <FacebookIcon size={40} round={true}/>
                     </FacebookShareButton>
                   </div>

                   <div style={{marginTop: '20px', float: 'left', width: '50px'}}>
                     <TwitterShareButton title={'Please join me in helping Eva\'s to prevent, reduce and end youth homelessness. @evasinitiatives'} hashtag={'#youth'} url={'http://evas.ca'}>
                       <TwitterIcon size={40} round={true}/>
                     </TwitterShareButton>
                   </div>

                   <div style={{marginTop: '20px', float: 'left', width: '50px'}}>
                     <LinkedinShareButton title={'Please join me in helping Eva\'s to prevent, reduce and end youth homelessness.'} hashtag={'#youth'} url={'http://evas.ca'}>
                       <LinkedinIcon size={40} round={true}/>
                     </LinkedinShareButton>
                   </div>
                 </div>
                 <br/><br/>
                 <div style={{marginTop: '60px', color: '#404040'}}>
                    Interested in furthering your impact?
                    <br/>Checkout our events page.
                 </div>
                  <div style={{marginTop: '5px', marginBottom: '15px'}}>
                    <a href="http://www.evas.ca/our-events/">
                    <RaisedButton secondary={true} label="Submit" style={{width: '50%', marginTop: '12px', backgroundColor: '#3eb1c8', height: '46px'}}
                      label={<span>
                        <p style={{zIndex: '-1', margin: '-6px', fontSize: '19px'}}> OUR EVENTS </p>
                        </span>}
                      labelStyle={{height: 0}}
                      />
                    </a>
                  </div>

                </div>
              }

             </Card>
           </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
