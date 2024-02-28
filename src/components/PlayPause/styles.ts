import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 99999,
  },
  playContainer: {
    width: '10%',
    alignItems: 'center',
  },
  play: {},
  seek: {
    height: 29, 
    width: 29,
  },
  rewind: {
    tintColor: 'white',
    height: 32, 
    width: 32,
  },
  rewindArrows: {
    tintColor: 'white',
    height: 50, 
    width: 50,
  },
});
