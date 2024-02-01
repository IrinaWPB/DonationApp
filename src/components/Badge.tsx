import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../helpers/scaling';

interface IBadgeProps {
  title: string;
}
const Badge = (props: IBadgeProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
    </View>
  );
};

export default Badge;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#39574a',
    height: verticalScale(22),
    justifyContent: 'center',
    borderRadius: horizontalScale(50),
    width: horizontalScale(80),
  },
  title: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: 'Montserrat',
    fontSize: scaleFontSize(12),
    fontWeight: '600',
  },
});
