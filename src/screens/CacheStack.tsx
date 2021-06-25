import React, { useContext, useRef, useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import {
  Text,
  TouchableOpacity,
  FlatList,
  Button,
  StyleSheet,
} from 'react-native'

import { CacheStackParamList } from './CacheStackParamList'
import { CacheSearch } from '../components/CacheSearch'
import CacheDetails from '../components/CacheDetails'

const Stack = createStackNavigator<any>()

export const CacheStack: React.FC<CacheStackParamList> = ({}) => {
  return (
    <Stack.Navigator initialRouteName="CacheSearch" screenOptions={{}}>
      {/* <Stack.Screen
        name="EditProduct"
        component={EditProduct}
        options={({ route }) => ({
          headerTitle: `Edit: ${route.params.name}`,
          headerRight: () => (
            <TouchableOpacity
              style={styles.doneBtnPadding}
              onPress={() => {
                route.params.submit?.current()
              }}
            >
              <Text>Done</Text>
            </TouchableOpacity>
          ),
        })}
      /> */}
      <Stack.Screen name="CacheSearch" component={CacheSearch} />
      <Stack.Screen name="CacheDetails" component={CacheDetails} />
    </Stack.Navigator>
  )
}
