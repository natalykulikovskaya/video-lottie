import React, { PureComponent } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class Home extends PureComponent{
  navigateToRecord = () => {
    this.navigate('Record');
  };

  navigateToVideos = () => {
    this.navigate('Videos');
  };

  navigate = (routeName, params = {}) => {
    const { navigation: { navigate } } = this.props;
    navigate(routeName, params);
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Home Screen</Text>
        <Button
          title="Go to record"
          onPress={this.navigateToRecord}
        />
        <Button
          title="Go to your videos"
          onPress={this.navigateToVideos}
        />
      </View>
    );
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
