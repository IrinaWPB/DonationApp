import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

interface IHeaderProps {
  size: number;
  title: string;
  color?: string;
  numberOfLines?: number;
}
const Header = (props: IHeaderProps) => {
  return (
    <View>
      <Text
        numberOfLines={props.numberOfLines}
        style={[
          styles.headerText,
          {fontSize: props.size},
          {color: props?.color},
        ]}>
        {props.title}
      </Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerText: {
    fontFamily: 'Montserrat',
    fontWeight: '700',
  },
});
