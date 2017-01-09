/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Animated,
  ScrollView,
} from 'react-native';

import wheather from './app/api/wheather'
import weatherIcon from "./app/utils/icons"

export default class AwesomeProject extends Component {
  constructor(props) {
    super(props)
    this.state = {
      city: "São Paulo",
      country: "Brazil",
      weatherType: "Clear",
      temperature: 28,
      searchedCity: "Sao Paulo",
      val: new Animated.Value(0),
      currentColor: "rgba(255,255,255,0.5)",
      nextColor: this._randomColor(),
      icon: weatherIcon(),
      hours: []
    }

    this.getWeather()
  }

  getWeather() {
    console.log(this.state);
    wheather(this.state.searchedCity).then((obj) => {
      var current = this.state.nextColor;
      this.state.val.setValue(0);

      this.setState({
        temperature: obj.day.temp,
        city: obj.day.city,
        country: obj.day.country,
        weatherType: obj.day.description,
        currentColor: current,
        nextColor: this._randomColor(),
        icon: weatherIcon(obj.day.icon),
        hours: obj.hours
      });

    });
  }

  render() {
    // Start the animation
    Animated.spring(this.state.val, {
      tension: 1,
      friction: 20,
      toValue: 1
    }).start();

    var TempHours = this.state.hours.map((x, i) => (
      <View key={i}>
        <Text>{x.time.substring(10)} - {x.temp_c}°C</Text>
      </View>
    ))

    return (
      <Animated.View style={{
          flex: 1,
          alignItems: "stretch",
          justifyContent: "center"}}>
          <ScrollView>
          <View style={{marginBottom: this.state.keyboardSpace}}>
            <View style={[styles.animatedContainer]}>
              <Text style={styles.icon}>
                {this.state.icon}
              </Text>
              <Text style={styles.temperature}>
              {Math.round(this.state.temperature) + "°C"}
            </Text>
             <Text style={styles.location}>
              {this.state.city}, {this.state.country}
            </Text>
            <Text style={styles.weatherType}>
              {this.state.weatherType}
            </Text>
              <TextInput style={styles.input}
                  onChangeText={(searchedCity) => this.setState({searchedCity})}
                  onSubmitEditing={(ev) => this.getWeather()}
                  clearButtonMode={"always"}
                  clearTextOnFocus={true}
                  enablesReturnKeyAutomatically={true}
                  value={this.state.searchedCity}
                  returnKeyType={"search"}/>
              <Text></Text>
                {TempHours}
              </View>
            </View>
            </ScrollView>
        </Animated.View>
    );
  }

  _randomColor() {
      var colors = [0, 1, 2].map(() => Math.ceil(Math.random() * 255));
      return "rgba(" + colors.join(",") + ",0.6)"
  }
}

var styles = StyleSheet.create({
  animatedContainer: {
     alignItems: "center",
    justifyContent: "center"
  },
  temperature: {
    fontSize: 62,
    fontWeight: "100",
    margin: 0
  },
  location: {
    fontSize: 14,
    fontWeight: "100",
    marginBottom: 20,
  },
  weatherType: {
    fontSize: 34,
    fontWeight: "500"
  },
  input: {
    alignSelf: 'stretch',
    textAlign: 'center',
  },
  icon: {
    fontFamily: 'weathericons-regular',
    fontSize: 100,
    padding: 0
  }
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);