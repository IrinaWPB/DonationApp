import {KeyboardTypeOptions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TextInput} from 'react-native-gesture-handler';
import {scaleFontSize, verticalScale} from '../helpers/scaling';

interface IInputProps {
  label: string;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  onChangeText: (val: string) => void;
  value: string;
  secureTextEntry?: boolean;
}
const Input = (props: IInputProps) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput
        style={styles.input}
        value={props.value}
        onChangeText={props.onChangeText}
        placeholder={props.placeholder}
        keyboardType={props.keyboardType}
        secureTextEntry={props.secureTextEntry}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  label: {
    fontFamily: 'Montserrat',
    fontWeight: '500',
    fontSize: scaleFontSize(18),
    lineHeight: scaleFontSize(20),
  },
  input: {
    paddingVertical: verticalScale(12),
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(167,167,167, 0.5)',
  },
  inputContainer: {
    marginVertical: verticalScale(12),
  },
});
