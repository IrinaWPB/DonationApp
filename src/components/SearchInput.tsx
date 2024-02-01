import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../helpers/scaling';
import {TextInput} from 'react-native-gesture-handler';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';

interface ISearchInputProps {
  onSearch: (value: string) => void;
}
const SearchInput = (props: ISearchInputProps) => {
  const [searchedText, setSearchedText] = useState('');
  const handleSearch = (searchedValue: string) => {
    setSearchedText(searchedValue);
    props.onSearch(searchedValue);
  };
  return (
    <View style={styles.container}>
      <View>
        <FontAwesomeIcon icon={faSearch} size={25} color="#25C0FF" />
      </View>

      <TextInput
        style={styles.input}
        placeholder="Search"
        value={searchedText}
        onChangeText={value => handleSearch(value)}
      />
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  input: {
    flex: 1,
    paddingLeft: horizontalScale(6),
    fontSize: scaleFontSize(18),
    fontFamily: 'Montserrat',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F5F9',
    height: verticalScale(50),
    borderRadius: 14,
    paddingVertical: verticalScale(10),
    paddingHorizontal: horizontalScale(16),
  },
});
