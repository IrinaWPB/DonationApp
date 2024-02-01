import {StyleSheet, Text, Pressable} from 'react-native';
import React from 'react';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../helpers/scaling';

interface ITabProps {
  title: string;
  isInactive: boolean;
  onPress: (value: number) => void;
  tabId: number;
}
const Tab = (props: ITabProps) => {
  return (
    <Pressable
      style={[styles.container, props.isInactive && styles.inactiveTab]}
      onPress={() => props.onPress(props.tabId)}>
      <Text style={[styles.title, props.isInactive && styles.inactiveTitle]}>
        {props.title}
      </Text>
    </Pressable>
  );
};

export default Tab;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2979F2',
    height: verticalScale(40),
    justifyContent: 'center',
    borderRadius: horizontalScale(50),
    width: horizontalScale(150),
    marginVertical: verticalScale(10),
    marginRight: horizontalScale(10),
  },
  title: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: 'Montserrat',
    fontSize: scaleFontSize(18),
    fontWeight: '500',
    padding: 5,
  },
  inactiveTab: {
    backgroundColor: '#F3F5F9',
  },
  inactiveTitle: {
    color: '#79869F',
  },
});
