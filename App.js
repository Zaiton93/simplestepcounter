import React from 'react';
import { Pedometer } from 'expo-sensors';
import { StyleSheet, Text, View, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import CircularProgress from './circularprogress';
import CountDown from 'react-native-countdown-component';
import moment from 'moment';

export default class App extends React.Component {
  state = {
    isPedometerAvailable: "checking",
    pastStepCount: 0,
    currentStepCount: 0,
     totalDuration: '',
  };
  
  componentDidMount() {
    this._subscribe();


       var date = moment()
      .utcOffset('+08:00')
      .format('YYYY-MM-DD hh:mm:ss');
    //Getting the current date-time with required formate and UTC   
    
    var expirydate = '2019-12-04 03:33:00';//You can set your own date-time
    //Let suppose we have to show the countdown for above date-time 

    var diffr = moment.duration(moment(expirydate).diff(moment(date)));
    //difference of the expiry date-time given and current date-time

    var hours = parseInt(diffr.asHours());
    var minutes = parseInt(diffr.minutes());
    var seconds = parseInt(diffr.seconds());
    
    var d = hours * 60 * 60 + minutes * 60 + seconds;
    //converting in seconds

    this.setState({ totalDuration: d });
    //Settign up the duration of countdown in seconds to re-render
  }

  

  componentWillUnmount() {
    this._unsubscribe();
  }

  _subscribe = () => {
    this._subscription = Pedometer.watchStepCount(result => {
      this.setState({
        currentStepCount: result.steps
      });
    });
    
   
    Pedometer.isAvailableAsync().then(
      result => {
        this.setState({
          isPedometerAvailable: String(result)
        });
      },
      error => {
        this.setState({
          isPedometerAvailable: "Could not get isPedometerAvailable: " + error
        });
      }
    );

    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 1);
    Pedometer.getStepCountAsync(start, end).then(
      result => {
        this.setState({ pastStepCount: result.steps });
      },
      error => {
        this.setState({
          pastStepCount: "Could not get stepCount: " + error
        });
      }
    );
  };
  
  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };

  render() {
    return (
      <View style={styles.container}>
       <Text> </Text>
       <Text> </Text>
       <CircularProgress progress={this.state.currentStepCount} />
      <Image source={require('./running.png')} style={{width:'33%', height:'25%', position: 'absolute', marginTop: 150, alignItems: 'center'}} />
     
      <Text> </Text>
        <Text style={{ fontSize: 80, fontFamily: 'Feather', color: 'white' }}>
          {this.state.currentStepCount}
        </Text>
        <Text style={{ fontSize: 20, fontFamily: 'Feather', color: 'white' }}>
          {' '}
          Walk as fast as you can Champ!{' '}
    
        </Text>
        <CountDown
          style={{marginTop:50}}
          
          until={this.state.totalDuration}
          //duration of countdown in seconds
          timetoShow={('M', 'S')}
          //formate to show
          onFinish={() => alert('finished')}
          //on Finish call
          onPress={() => alert('hello')}
          //on Press call
          size={20}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'teal',
    marginTop: 2,
    alignItems: 'center',
    //justifyContent: 'flex-start',
  },
});
