import React, {createRef} from 'react';
import {
  Animated,
  Image,
  Platform,
  TouchableHighlight,
  Text,
  View,
} from 'react-native';
import {Control} from '../Control';
import {NullControl} from '../NullControl';
import type {VideoAnimations} from '../../types';
import {styles} from './styles';

export const playPauseRef = createRef<TouchableHighlight>();

interface PlayPauseProps {
  animations: VideoAnimations;
  disablePlayPause: boolean;
  disableSeekButtons: boolean;
  paused: boolean;
  togglePlayPause: () => void;
  resetControlTimeout: () => void;
  showControls: boolean;
  onPressForward: () => void;
  onPressRewind: () => void;
  onPressSkipForward: () => void;
  onPressSkipBackward: () => void;
  twoTimesRewind: boolean;
  twoTimesForward: boolean;
}

const play = require('../../assets/img/play.png');
const pause = require('../../assets/img/pause.png');
const rewind = require('../../assets/img/rewind.png');
const forward = require('../../assets/img/forward.png');
const skipForward = require('../../assets/img/rotate-right-forward.png');
const skipBackward = require('../../assets/img/rotate-left-rewind.png');

export const PlayPause = ({
  animations,
  disablePlayPause,
  disableSeekButtons,
  paused,
  togglePlayPause,
  resetControlTimeout,
  showControls,
  onPressForward,
  onPressRewind,
  onPressSkipForward,
  onPressSkipBackward,
  twoTimesRewind,
  twoTimesForward,
}: PlayPauseProps) => {
  let source = paused ? play : pause;

  const animatedStyles = {
    opacity: animations.controlsOpacity,
    zIndex: showControls ? 99999 : 0,
  };

  if (disablePlayPause) {
    return <NullControl />;
  }

  return (
    <Animated.View
      pointerEvents={'box-none'}
      style={[styles.container, animatedStyles]}>
      {!disableSeekButtons && twoTimesRewind ? (
        <View style={{flexDirection: 'row'}}>
          <Text style={{fontSize: 20, color: 'white', paddingTop: 15}}>2x</Text>
          <Control
            disabled={!showControls}
            callback={onPressRewind}
            resetControlTimeout={resetControlTimeout}>
            <Image
              source={rewind}
              resizeMode={'contain'}
              style={styles.rewind}
            />
          </Control>
        </View>
      ) : (
        <Control
          disabled={!showControls}
          callback={onPressRewind}
          resetControlTimeout={resetControlTimeout}>
          <Image source={rewind} resizeMode={'contain'} style={styles.rewind} />
        </Control>
      )}
      {!disableSeekButtons ? (
        <Control
          disabled={!showControls}
          callback={onPressSkipBackward}
          resetControlTimeout={resetControlTimeout}>
          <Image
            source={skipBackward}
            resizeMode={'contain'}
            style={styles.rewind}
          />
        </Control>
      ) : null}
      <Control
        disabled={!showControls}
        callback={togglePlayPause}
        resetControlTimeout={resetControlTimeout}
        style={styles.playContainer}
        controlRef={playPauseRef}
        {...(Platform.isTV ? {hasTVPreferredFocus: showControls} : {})}>
        <Image source={source} resizeMode={'contain'} style={styles.play} />
      </Control>
      {!disableSeekButtons ? (
        <Control
          disabled={!showControls}
          callback={onPressSkipForward}
          resetControlTimeout={resetControlTimeout}>
          <Image
            source={skipForward}
            resizeMode={'contain'}
            style={styles.rewind}
          />
        </Control>
      ) : null}
      {!disableSeekButtons && twoTimesForward ? (
        <View style={{flexDirection: 'row'}}>
          <Control
            disabled={!showControls}
            callback={onPressForward}
            resetControlTimeout={resetControlTimeout}>
            <Image
              source={forward}
              resizeMode={'contain'}
              style={{backgroundColor: 'transparent'}}
            />
          </Control>
          <Text style={{fontSize: 20, color: 'white', paddingTop: 15}}>2x</Text>
        </View>
      ) : (
        <Control
          disabled={!showControls}
          callback={onPressForward}
          resetControlTimeout={resetControlTimeout}>
          <Image
            source={forward}
            resizeMode={'contain'}
            style={{backgroundColor: 'transparent'}}
          />
        </Control>
      )}
    </Animated.View>
  );
};
