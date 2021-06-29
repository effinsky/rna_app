import React from 'react'
import { View, Text, Pressable, FlatList } from 'react-native'

import { CacheListElementType } from './CacheSearch'
import { CacheStackScreenNavProps } from '../screens/CacheStackScreen/CacheStackScreenParamList'

interface CacheListProps {
  caches: CacheListElementType[]
}

const CacheList: React.FC<
  Pick<CacheStackScreenNavProps<'CacheSearch'>, 'navigation'> & CacheListProps
> = ({ caches, navigation }) => {
  return (
    <View>
      <Text>Cache Results</Text>
      <FlatList
        data={caches}
        renderItem={({ item }) => (
          <View>
            <Pressable
              onPress={() => {
                navigation.navigate('CacheDetails', {
                  cacheCode: item.code,
                })
              }}
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

export default CacheList
