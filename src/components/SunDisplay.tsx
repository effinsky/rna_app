import React from 'react'
import {StyleSheet} from 'react-native'
import {Text, FlatList, View} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'

import {SunTimes} from '../screens/SunScreen/index'

type SunDisplayProps = {times: SunTimes[]}

const SunDisplay: React.FC<SunDisplayProps> = ({times}) => {
  return (
    <View>
      <Text>Sunrise and Sunset at Your Location</Text>
      <View style={styles.container}>
        <Icon size={40} color="#333" name="sunrise" />
        <Icon size={40} color="#333" name="sunset" />
      </View>
      <FlatList
        style={styles.flatList}
        data={times}
        renderItem={({item, index}) => (
          <SunTimesItem item={item} index={index} />
        )}
        keyExtractor={(_, i) => i.toString()}
      />
    </View>
  )
}

// put this above the component rendering it?
const SunTimesItem = ({item, index}: {item: SunTimes; index: number}) => (
  <View style={styles.container}>
    <View style={styles.iconRow}>
      <Text style={styles.timeText}>{item.sunrise}</Text>
    </View>
    <View style={styles.iconRow}>
      <Text style={styles.timeText}>{item.sunset}</Text>
    </View>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  flatList: {
    width: '100%',
  },
  iconRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    // paddingLeft: 30,
  },
  timeText: {
    fontSize: 20,
  },
})

export default SunDisplay
