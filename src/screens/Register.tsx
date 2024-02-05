import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Input from '../components/Input';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-gesture-handler';
import {horizontalScale, verticalScale} from '../helpers/scaling';
import Header from '../components/Header';
import Button from '../components/Button';
import GoBackButton from '../components/GoBackButton';
import {createUser} from '../api/user';
import {Routes} from '../../navigation/Routes';

const Register = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.goBack}>
        <GoBackButton
          onPress={() => {
            navigation.goBack();
          }}
        />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}>
        <Header title="Hello and Welcome!" size={30} />
        {success ? (
          <Header title={success} size={20} />
        ) : (
          <View style={styles.inputs}>
            <Input
              label="Full Name"
              placeholder="Enter your Fisrt and Last Name"
              value={name}
              onChangeText={val => setName(val)}
            />
            <Input
              label="Email"
              placeholder="Enter your email"
              value={email}
              onChangeText={val => setEmail(val)}
              keyboardType="email-address"
            />
            <Input
              label="Password"
              placeholder="********"
              value={password}
              onChangeText={val => setPassword(val)}
              secureTextEntry
            />
            <Input
              label="Confirm Password"
              placeholder="********"
              value={confirmPassword}
              onChangeText={val => setConfirmPassword(val)}
              secureTextEntry
            />
            {error && <Text style={styles.error}>{error}</Text>}
          </View>
        )}
        <View style={styles.button}>
          <Button
            title="Register"
            isDisabled={
              success.length > 0 ||
              !email ||
              !name ||
              !password ||
              !confirmPassword
            }
            onPress={async () => {
              if (password !== confirmPassword) {
                setError("Entered passwords don't match");
                setPassword('');
                setConfirmPassword('');
              } else {
                const user = await createUser(name, email, password);
                if (user.error) {
                  setError(user.error);
                } else {
                  setError('');
                  setSuccess('You have successfully registered');
                  setTimeout(() => navigation.navigate(Routes.Login), 3000);
                }
              }
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    marginHorizontal: horizontalScale(24),
    flex: 1,
    justifyContent: 'center',
  },
  inputs: {
    marginTop: verticalScale(12),
  },
  button: {
    marginTop: verticalScale(18),
  },
  goBack: {
    marginTop: verticalScale(10),
    marginLeft: horizontalScale(16),
  },
  error: {
    color: 'red',
  },
});
