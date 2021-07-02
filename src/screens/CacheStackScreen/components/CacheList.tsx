import React from 'react'
import { View, Text, Pressable, FlatList, StyleSheet } from 'react-native'

import { CacheListElementType } from './CacheSearch'
import { CacheStackScreenNavProps } from '../CacheStackScreenParamList'
import { capitalize } from 'lodash'

interface CacheListProps {
  caches: CacheListElementType[]
}

const CacheList: React.FC<
  Pick<CacheStackScreenNavProps<'CacheSearch'>, 'navigation'> & CacheListProps
> = ({ caches, navigation }) => {
  const cachesCapitalized = caches.map(item => {
    item.name = capitalize(item.name)
    return item
  })
  return (
    <View>
      <Text>Cache Results</Text>
      <FlatList
        data={cachesCapitalized}
        renderItem={({ item }) => (
          <View style={styles.listItemContainer}>
            <Pressable
              onPress={() => {
                navigation.navigate('CacheDetails', {
                  cacheCode: item.code,
                })
              }}
              style={({ pressed }) =>
                pressed
                  ? [styles.item, { backgroundColor: '#ffa584' }]
                  : [styles.item]
              }
            >
              <Text>{item.name}</Text>
            </Pressable>
          </View>
        )}
        keyExtractor={item => item.code}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  listItemContainer: { paddingVertical: 8 },
  item: { backgroundColor: '#fdcfbd', paddingVertical: 2 },
})

export default CacheList
