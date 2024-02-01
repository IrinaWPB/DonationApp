import {Pressable, StyleSheet} from 'react-native';
import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';

interface IGoBackButtonProps {
  onPress: () => void;
}
const GoBackButton = (props: IGoBackButtonProps) => {
  return (
    <Pressable onPress={props.onPress} style={styles.goBackButtonContainer}>
      <FontAwesomeIcon icon={faArrowLeft} />
    </Pressable>
  );
};

export default GoBackButton;

const styles = StyleSheet.create({
  goBackButtonContainer: {
    backgroundColor: '#efefef',
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
});
