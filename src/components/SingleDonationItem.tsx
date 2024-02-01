import {StyleSheet, View, Image, Pressable} from 'react-native';
import React from 'react';
import Badge from './Badge';
import Header from './Header';
import {horizontalScale, verticalScale} from '../helpers/scaling';

interface ISingleDonatoinProps {
  uri: string;
  badgeTitle: string;
  donationTitle: string;
  price: number;
  donationItemId: number;
  onPress: (id: number) => void;
}
const SingleDonationItem = (props: ISingleDonatoinProps) => {
  return (
    <Pressable onPress={() => props.onPress(props.donationItemId)}>
      <View style={styles.badgeContainer}>
        <Badge title={props.badgeTitle} />
      </View>
      <View>
        <Image
          resizeMode="cover"
          source={{uri: props.uri}}
          style={styles.image}
        />
      </View>
      <View style={styles.info}>
        <Header title={props.donationTitle} numberOfLines={1} size={20} />
        <View style={styles.price}>
          <Header
            title={'$' + props.price.toFixed(2)}
            size={18}
            color="#156CF7"
          />
        </View>
      </View>
    </Pressable>
  );
};

export default SingleDonationItem;

const styles = StyleSheet.create({
  image: {
    width: horizontalScale(140),
    height: verticalScale(150),
    borderRadius: horizontalScale(20),
  },
  badgeContainer: {
    position: 'absolute',
    zIndex: 1,
    top: verticalScale(13),
    left: horizontalScale(10),
  },
  info: {
    marginTop: verticalScale(10),
  },
  price: {
    marginTop: verticalScale(1),
  },
});
