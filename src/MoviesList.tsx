import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  useColorScheme,
  View,
  Button,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';

interface itemType {
  Poster: string;
  Year: string;
  plot: string;
  imdbID: string;
  Title: string;
}

type formTypes = {
  navigation: any;
  route: any;
};

function MoviesList({navigation, route}: formTypes): JSX.Element {
  const [searchQuery, setsearchQuery] = useState('');
  const [data, setData] = useState<itemType[]>([]);
  const [pageNUmber, setPageNumber] = useState(1);
  const [paginationArray, setPaginationArray] = useState<any[]>([]);
  const [isactivePageNumber, setIsActivePageNumber] = useState(false);
  const [lastPageNumber, setLastPAgeNumber] = useState<number>(0);
  const serarchMovies = async () => {
    try {
      setIsActivePageNumber(true);
      const response = await axios.get(
        `https://www.omdbapi.com/?s=${searchQuery}&apikey=821d9eb5&page=${pageNUmber}`,
      );
      const totalResults = response.data.totalResults;
      console.log(Math.round(totalResults / 10));
      setLastPAgeNumber(Math.round(totalResults / 10));
      const res = Array.from(
        Array(Math.floor(Math.round(totalResults / 10))).keys(),
      ).map(x => x + 1);
      let arr = [];
      for (let i = pageNUmber; i < pageNUmber + 4; i++) {
        arr.push({
          element: i,
        });
      }
      setPaginationArray(arr);
      setData(response.data.Search);
    } catch (e) {
      Alert.alert('Movie or series not found');
    }
  };

  const onPrevPress = () => {
    setPageNumber(pageNUmber - 1);
  };

  const onChangeText = (val: string) => {
    setIsActivePageNumber(false);
    setPageNumber(1);
    setsearchQuery(val);
  };
  const onRenderItemClick = async (imdbID: string) => {
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?i=${imdbID}&plot=short&apikey=821d9eb5`,
      );
      navigation.navigate('movie-details', {data: response.data});
    } catch (e) {
      Alert.alert('something went wrong');
    }
  };

  useEffect(() => {
    if (!isactivePageNumber) return;
    serarchMovies();
  }, [pageNUmber]);
  const onPaginationPress = (number: number) => {
    setPageNumber(number);
  };

  const onNextClick = () => {
    setPageNumber(pageNUmber + 1);
  };

  const renderItem = ({item}: {item: itemType}) => {
    return (
      <TouchableOpacity onPress={() => onRenderItemClick(item.imdbID)} testID={`moviesDetails${item.Title}`}>
        <View style={styles.renderItem}>
          <View style={{}}>
            {item.Poster != 'N/A' ? (
              <Image
                style={styles.stretch}
                source={{
                  uri: item.Poster,
                }}
              />
            ) : null}
            <Text style={styles.highlight}>{item.Title}</Text>
          </View>
          <Text style={{fontSize: 16}} testID={`release${item.Year}`}>Year of release : {item.Year}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView>
      <View style={styles.sectionContainer}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          placeholder="please enter movie name or series "
          testID="text-input"
        />
        <Button
          title="Submit"
          disabled={searchQuery === '' ? true : false}
          testID="submit-button"
          onPress={serarchMovies}
        />
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item: itemType) => item.imdbID}
          style={{maxHeight: '80%'}}
        />
        <ScrollView horizontal>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={{alignItems: 'flex-end', marginRight: 10}}>
              <Button
                title="Prev"
                testID="prev-button"
                disabled={pageNUmber === 1 ? true : false}
                onPress={onPrevPress}
              />
            </View>
            <View style={{flexDirection: 'row'}}>
              {paginationArray.map(ele => {
                return (
                  <View style={{marginRight: 10}} key={ele.element}>
                    <Button
                      title={`${ele.element}`}
                      testID={`button-${ele.element}`}
                      color={parseInt(ele.element) === pageNUmber ? 'red' : ''}
                      onPress={() => onPaginationPress(parseInt(ele.element))}
                    />
                  </View>
                );
              })}
            </View>
            <Text style={{fontWeight: '700', fontSize: 20, marginRight: 10}}>
              ...
            </Text>
            <View style={{marginRight:10}}>
            <Button
              title={`${lastPageNumber-2}`}
              onPress={() => {onPaginationPress(lastPageNumber-2)}}
              disabled={pageNUmber === lastPageNumber ? true : false}
              testID='lastpage-2'
            />
            </View>
            <View style={{marginRight:10}}>
            <Button
              title={`${lastPageNumber-1}`}
              onPress={() => {onPaginationPress(lastPageNumber-1)}}
              disabled={pageNUmber === lastPageNumber ? true : false}
              testID='lastpage-1'
            />
            </View>
            <View style={{marginRight:10}}>
            <Button
              title="Next"
              onPress={onNextClick}
              testID='next-button'
              disabled={pageNUmber === lastPageNumber ? true : false}
            />
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    paddingHorizontal: 24,
    height: 'auto',
    // flex:1
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '900',
    fontSize: 20,
    // lineHeight:24,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  renderItem: {
    borderColor: 'lightgreen',
    borderWidth: 1,
    marginVertical: 10,
    height: 200,
  },
  stretch: {
    width: 180,
    height: 150,
    // resizeMode: 'auto',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  numberContainer: {
    padding: 10,
    marginHorizontal: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  numberText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default MoviesList;
