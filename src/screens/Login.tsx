import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Input from '../components/Input';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-gesture-handler';
import {horizontalScale, verticalScale} from '../helpers/scaling';
import Header from '../components/Header';
import Button from '../components/Button';
import {Routes} from '../../navigation/Routes';
import {loginUser} from '../api/user';
import {useDispatch} from 'react-redux';
import {login} from '../../redux/reducers/User';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}>
        <Header title="Welcome Back" size={30} />
        <View style={styles.inputs}>
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
          {error && <Text style={styles.error}>{error}</Text>}
        </View>
        <View style={styles.button}>
          <Button
            title="Login"
            isDisabled={!email || !password}
            onPress={async () => {
              const user = await loginUser(email, password);
              console.log(user);
              if (!user.status) {
                setError(user.error);
              } else {
                setError('');
                dispatch(login(user.data));
                navigation.navigate(Routes.Home, {name: user.data.displayName});
              }
            }}
          />
        </View>
        <Pressable
          style={styles.link}
          onPress={() => {
            navigation.navigate(Routes.Register);
          }}>
          <Header color="#156CF7" title="Don't have an account?" size={20} />
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;

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
    marginTop: verticalScale(20),
  },
  link: {
    alignSelf: 'center',
    marginTop: verticalScale(20),
  },
  error: {
    color: 'red',
  },
});
