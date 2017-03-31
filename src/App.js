import React, { Component } from 'react';
import './App.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import getMuiTheme from 'material-ui/styles/getMuiTheme';// Needed for onTouchTap
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


injectTapEventPlugin();

const muiTheme = getMuiTheme({
  fontFamily: 'Questrial, sans-serif',
  palette: {
    textColor: '#4e4e4e',
    primary1Color: '#ff3434',
    accent1Color: '#ff3434',
    primary2Color: '#ff3434'
  },
  tabs: {
    backgroundColor: '#f7f7f7',
    textColor: '#8c8c8c',
    selectedTextColor: '#4e4e4e'
  }
});

class App extends Component {



  render() {
    const style = {
      mainCard: {
        marginTop: '20%',
        marginLeft: '20%',
        width: '40%',
        height: '70%',
      }
    }
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className="App">
          <Card style={style.mainCard}>
            <CardMedia
             overlay={<CardTitle title="Donate now!" />}
             >
             <img src="images/nature-600-337.jpg" />
             </CardMedia>

            <RaisedButton label="Monthly" style={{marginRight: '10px',
              marginTop: '10px'}}/>
            <RaisedButton label="One Time" style={{marginRight: '10px',
              marginTop: '10px'}}/>
            <CardTitle subtitle="you can cancel anytime!" />

            <CardTitle title="Amount" style={{textAlign: 'center'}} />

            <RaisedButton label="$50" style={{marginRight: '5px'}}/>
            <RaisedButton label="$100" style={{marginRight: '5px'}}/>
            <RaisedButton label="$1500" style={{marginRight: '5px'}}/>
            <RaisedButton label="Other" style={{marginRight: '5px'}}/>
            

           </Card>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
