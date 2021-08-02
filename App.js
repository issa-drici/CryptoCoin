import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, FlatList, ActivityIndicator } from 'react-native';


export default function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState([])
  const [count, setCount] = useState(0)

  const getData = async () => {
    try {
      const response = await fetch('https://api.coinlore.net/api/tickers/')
      const json = await response.json()
      setData(json.data)
    } catch(err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      getData()
    }, 10000);
    return () => clearInterval(interval);
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>CryptoCoin</Text>
        {isLoading ? <ActivityIndicator/> : (
        <FlatList
          data={data}
          renderItem={({item}) => (
          <View style={styles.containerItem}>
            <View style={styles.item}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.symbol}>{item.symbol}</Text>
              <Text style={styles.price}>${item.price_usd}</Text>
            </View>
          </View>)}
        /> )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  title: {
    color: "#07191f",
    fontWeight: "700",
    fontSize: 27,
    marginLeft: 30,
    marginTop: 30,
    marginBottom: 30
  },
  containerItem: {
    width: "100%",
    alignItems: "center"
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 5,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  name: {
    color: "#07191f",
    fontSize: 17,
    fontWeight: "600",
    width: 100
  },
  symbol: {
    color: "#07191f",
    fontSize: 17,
    fontWeight: "300",
    width: 50
  },
  price: {
    color: "#07191f",
    fontSize: 17,
    fontWeight: "600",
    textAlign: "right",
    width: 100
  }
});
