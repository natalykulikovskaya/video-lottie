import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import RecordingVideo from './Screens/RecordingVideo/RecordingVideo';
import Home from './Screens/Home/Home';
import YourVideos from './Screens/YourVideos/YourVideos';
import VideoScreen from './Screens/VideoScreen/VideoScreen';

const RootStack = createStackNavigator(
  {
    Home,
    Record: RecordingVideo,
    Videos: YourVideos,
    VideoScreen,
  },
  {
    initialRouteName: 'Home',
  }
);

export default  createAppContainer(RootStack);
