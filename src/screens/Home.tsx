import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Pressable,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../components/Header';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../helpers/scaling';
import SearchInput from '../components/SearchInput';
import {useDispatch, useSelector} from 'react-redux';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import Tab from '../components/Tab';
import {updateSelectedCategoryId} from '../../redux/reducers/Categories';
import {CategoryType, ItemType, UserType} from '../../types/types';
import {pagination} from '../helpers/pagination';
import SingleDonationItem from '../components/SingleDonationItem';
import {Routes} from '../../navigation/Routes';
import {updateSelectedDonationId} from '../../redux/reducers/Donations';
import {RootState} from '../../redux/store';
import {resetToInitialState} from '../../redux/reducers/User';
import {logout} from '../api/user';

export default function Home({navigation}) {
  const user: UserType = useSelector((state: RootState) => state.user);
  const categories = useSelector((state: RootState) => state.categories);
  const donations = useSelector((state: RootState) => state.donations);
  const dispatch = useDispatch();
  const [catPage, setCatPage] = useState<number>(1);
  const [catList, setCatList] = useState<CategoryType[]>([]);
  const [donationItems, setDonationItems] = useState<ItemType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = 4;

  useEffect(() => {
    const items = donations.items.filter((item: ItemType) =>
      item.categoryIds.includes(categories.selectedCategoryId),
    );
    setDonationItems(items);
  }, [categories.selectedCategoryId, donations.items]);

  useEffect(() => {
    setIsLoading(true);
    setCatList(pagination(categories.categories, catPage, itemsPerPage));
    setCatPage(prev => prev + 1);
    setIsLoading(false);
  }, []);

  return (
    <SafeAreaView style={styles.safeView}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.homeContainer}>
          <View style={styles.headerContainer}>
            <View>
              <Text style={styles.text}>Hello,</Text>
              <Header
                title={user.displayName + ' 👋'}
                size={scaleFontSize(22)}
              />
            </View>
            <View style={styles.logout}>
              <Image
                resizeMode={'contain'}
                source={{uri: user.profileImage}}
                style={styles.image}
              />
              <Pressable
                onPress={async () => {
                  dispatch(resetToInitialState());
                  await logout();
                  navigation.navigate(Routes.Login);
                }}>
                <Header title="Logout" size={14} color="#156CF7" />
              </Pressable>
            </View>
          </View>

          <SearchInput
            onSearch={v => {
              console.log(v);
            }}
          />
          <Pressable>
            <Image
              style={styles.banner}
              resizeMode={'contain'}
              source={require('../../assets/images/highlighted_image.png')}
            />
          </Pressable>

          {!isLoading && (
            <View>
              <Header title="Select Category" size={20} />
              <View>
                <FlatList
                  onEndReachedThreshold={0.5}
                  onEndReached={() => {
                    setIsLoading(true);
                    let newData = pagination(
                      categories.categories,
                      catPage,
                      itemsPerPage,
                    );
                    if (newData.length > 0) {
                      setCatList(prev => [...prev, ...newData]);
                      setCatPage(prev => prev + 1);
                    }
                    setIsLoading(false);
                  }}
                  horizontal={true}
                  data={catList}
                  renderItem={({item}) => (
                    <View key={item.categoryId}>
                      <Tab
                        tabId={item.categoryId}
                        title={item.name}
                        isInactive={
                          item.categoryId !== categories.selectedCategoryId
                        }
                        onPress={value => {
                          dispatch(updateSelectedCategoryId(value));
                        }}
                      />
                    </View>
                  )}
                />
              </View>
            </View>
          )}
          {donationItems.length > 0 && (
            <View style={styles.donationListContainer}>
              {donationItems.map((item: ItemType) => {
                const categoryName = categories.categories.filter(
                  (cat: CategoryType) =>
                    cat.categoryId === categories.selectedCategoryId,
                )[0].name;
                return (
                  <View key={item.donationItemId} style={styles.itemContainer}>
                    <SingleDonationItem
                      onPress={(selectedDonationId: number) => {
                        dispatch(updateSelectedDonationId(selectedDonationId));
                        navigation.navigate(Routes.DonationDetails, {
                          cat: categoryName,
                        });
                      }}
                      donationItemId={item.donationItemId}
                      uri={item.image}
                      badgeTitle={categoryName}
                      donationTitle={item.name}
                      price={+item.price}
                    />
                  </View>
                );
              })}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeView: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  headerContainer: {
    marginHorizontal: horizontalScale(4),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(6),
  },
  homeContainer: {
    margin: 20,
  },
  text: {
    fontFamily: 'Montserrat',
    fontWeight: '600',
    color: 'gray',
    fontSize: 16,
  },
  donationList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    width: horizontalScale(50),
    height: verticalScale(50),
    marginBottom: -10,
  },
  banner: {
    width: '100%',
    height: verticalScale(160),
  },
  donationListContainer: {
    marginTop: verticalScale(20),
    marginHorizontal: horizontalScale(4),
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  itemContainer: {
    maxWidth: '48%',
    marginBottom: verticalScale(23),
  },
  logout: {
    alignItems: 'center',
  },
});
