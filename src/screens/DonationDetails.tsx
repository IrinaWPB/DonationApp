import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  View,
  Image,
} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import GoBackButton from '../components/GoBackButton';
import Badge from '../components/Badge';
import Header from '../components/Header';
import Button from '../components/Button';

const DonationDetails = ({navigation, route}) => {
  const donationItem = useSelector(
    state => state.donations.selectedDonationInfo,
  );
  const {cat} = route.params;
  console.log(donationItem);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerButton}>
        <GoBackButton
          onPress={() => {
            navigation.goBack();
          }}
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollContainer}>
        <View style={styles.imageContainer}>
          <Image source={{uri: donationItem.image}} style={styles.image} />
        </View>
        <Badge title={cat} />
        <View style={styles.infoContainer}>
          <Header title={donationItem.name} size={30} />
          <Text style={styles.info}>{donationItem.description}</Text>
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button
          title="Donate"
          isDisabled={false}
          onPress={function (): void {
            throw new Error('Function not implemented.');
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default DonationDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerButton: {
    marginTop: 7,
    marginLeft: 20,
  },
  scrollContainer: {
    marginHorizontal: 20,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    marginTop: 12,
    marginBottom: 24,
    width: '100%',
    height: 240,
    borderRadius: 5,
  },
  infoContainer: {
    marginTop: 20,
  },
  info: {
    fontFamily: 'Montserrat',
    fontSize: 20,
    marginHorizontal: 8,
    marginTop: 8,
  },
  buttonContainer: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
});
