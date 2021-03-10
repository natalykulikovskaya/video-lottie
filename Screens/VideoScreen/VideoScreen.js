import React, { PureComponent } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView  } from 'react-native';
import { Video } from 'expo';
import LottieView from 'lottie-react-native';

import Lotties from '../../Lotties/CombineLotties';

export default class VideoScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentLottie: null,
      uri: null,
    };
  };

  onLottieClick = async (currentLottie) => {
    if (currentLottie === this.state.currentLottie) {
      await this.setState({ currentLottie: null })
    } else {
      await this.setState({ currentLottie });
      this.currentLottieRef.reset();
      this.currentLottieRef.play();
    }
  };

  async componentDidMount() {
    const uri = await this.props.navigation.getParam('url', null);
    this.setState({ uri })
  };

  render() {
    const { uri, currentLottie } = this.state;
    return (
      <View style={styles.mainContainer}>
        <View style={styles.videoContainer}>
          { currentLottie && (
            <LottieView
              source={currentLottie}
              ref={currentLottieRef => this.currentLottieRef = currentLottieRef} // TODO: react create ref
              loop
              autoPlay
              style={styles.mainLottie}
            />
          )}
          {uri ? (
            <Video
              source={{ uri }}
              rate={1.0}
              volume={1.0}
              isMuted={false}
              resizeMode="cover"
              shouldPlay
              isLooping
              style={styles.video}
            />
          ) : <Text>Something went wrong!</Text>
          }
        </View>
        <ScrollView
          alwaysBounceVertical={false}
          showsHorizontalScrollIndicator={false}
          horizontal
          style={styles.lottiesScroll}
        >
          { Lotties.map(({ name, uri }) => (
              <TouchableOpacity
                key={name}
                onPress={() => this.onLottieClick(uri)}
                style={styles.lottiesOpacity}
              >
                <LottieView
                  source={uri}
                  loop
                  autoPlay
                />
              </TouchableOpacity>
            ))
          }
        </ScrollView>
      </View>
    );
  };
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainLottie: {
    width: 100,
    height: 100,
    position: 'absolute',
    zIndex: 1,
  },
  video: {
    width: 300,
    height: 300,
  },
  lottiesScroll: {
    backgroundColor: '#DCDCDC',
    width: '100%',
  },
  lottiesOpacity: {
    width: 195,
    height:195,
    margin: 5,
    backgroundColor:'#f0f0f0',
  }
});
