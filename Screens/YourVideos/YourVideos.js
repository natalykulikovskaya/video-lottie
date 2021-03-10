import React, { PureComponent } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { AsyncStorage } from 'react-native';


export default class YourVideos extends PureComponent {
  constructor(props){
    super(props);
    this.state = {
      videos: null,
    };
  };

  async componentDidMount() {
    const StorageVideos = await AsyncStorage.getItem('Videos');
    await this.setState({videos: JSON.parse(StorageVideos)})
  };

  render() {
    const { videos } = this.state;
    return (
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scroll}
        >
          {videos && videos.map((url, i) => (
            <TouchableOpacity
              key={url}
              onPress={() => this.props.navigation.navigate('VideoScreen', { url })}
              style={styles.listElement}
            >
              <Text>New video {videos.length - i}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
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
  scroll: {
    width: '100%',
    backgroundColor: '#eee',
  },
  listElement: {
    height: 60,
    borderRadius: 10,
    margin: 5,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
