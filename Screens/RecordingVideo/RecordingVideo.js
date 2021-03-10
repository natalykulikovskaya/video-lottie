import React, { PureComponent } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { Camera, Permissions } from 'expo';
import { AsyncStorage } from 'react-native';

const { height, width } = Dimensions.get('window');
const { back: CAM_BACK, front: CAM_FRONT } = Camera.Constants.Type;


export default class RecordingVideo extends PureComponent {
  constructor(props){
    super(props);
    this.state = {
      hasCameraPermission: null,
      type: Camera.Constants.Type.back,
      recording: false,
      url: null,
    };
    this.camera = React.createRef();
  };

  startRecording = async () => {
    if (this.camera && this.camera.current) {
      try {
        await this.setState(state => ({...state, recording: true}));
        const file = await this.camera.current.recordAsync({
          maxDuration: 15,
          quality: Camera.Constants.VideoQuality['480p'],
        });
        await this.setState({recording: false, url: file.uri});
        const {url} = this.state;
        let videos = await AsyncStorage.getItem('Videos');

        await videos === null ? videos = [] : videos = JSON.parse(videos);
        await videos.unshift(file.uri);
        await AsyncStorage.setItem('Videos', JSON.stringify(videos));
        Alert.alert(
          'Want to watch this video?',
          '',
          [{
            text: 'No',
            style: 'cancel',
          }, {
            text: 'Yes',
            onPress: () => this.props.navigation.navigate('VideoScreen', {url}),
          }],
          {cancelable: false},
        );
      } catch {
        Alert.alert(
          'Error',
          '',
          [{
            text: 'OK',
            style: 'cancel',
          }],
          { cancelable: false },
        );
      }
    }
  };

  stopRecording = async () => {
    if (this.camera && this.camera.current) {
      await this.camera.current.stopRecording();
    }
  };

  toggleRecording = () => {
    const { recording } = this.state;
    return recording ? this.stopRecording() : this.startRecording();
  };

  onFlip = () => {
    this.setState(({ type }) => ({
      type: type === CAM_BACK ? CAM_FRONT : CAM_BACK,
    }));
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  };

  render() {
    const { hasCameraPermission, recording } = this.state;
    if (hasCameraPermission === null) {
      return <View />
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={styles.containerCenter}>
          <Camera
            ref={this.camera}
            style={styles.preview}
            type={this.state.type}
          >
            <TouchableOpacity onPress={this.toggleRecording}>
              <View style={styles.recordButton}>
                <Text style={styles.recordText}>
                  {recording ? 'Stop' : 'Start'}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.flipOpacity}
              onPress={this.onFlip}
              disabled={recording}
            >
              <Text style={styles.flipText}>
                Flip
              </Text>
            </TouchableOpacity>
          </Camera>
        </View>
      );
    }
  }
};

const styles = StyleSheet.create({
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height,
    width,
  },
  containerCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  recordButton: {
    height: 50,
    width: 50,
    backgroundColor: 'red',
    borderRadius: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  recordText: {
    color: 'white',
  },
  flipOpacity: {
    flex: 0.1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  flipText: {
    fontSize: 18,
    marginBottom: 10,
    color: 'white',
  },
});
