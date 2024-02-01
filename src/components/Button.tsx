import {StyleSheet, Text, Pressable} from 'react-native';
import React from 'react';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../helpers/scaling';

interface IButtonProps {
  title: string;
  isDisabled: boolean;
  onPress: () => void;
}
const Button = (props: IButtonProps) => {
  return (
    <Pressable
      disabled={props.isDisabled}
      style={[styles.container, props.isDisabled && styles.disabled]}
      onPress={() => props.onPress()}>
      <Text style={styles.title}>{props.title}</Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2979F2',
    height: verticalScale(40),
    justifyContent: 'center',
    borderRadius: horizontalScale(50),
  },
  title: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: 'Montserrat',
    fontSize: scaleFontSize(18),
    fontWeight: '500',
  },
  disabled: {
    opacity: 0.5,
  },
});
