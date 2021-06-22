import React from "react"
import { Text, View } from "react-native"
import Icon from "react-native-vector-icons/Feather"

interface SunDisplayProps {
  times: {
    sunrise: string
    sunset: string
  }
}

const SunDisplay: React.FC<SunDisplayProps> = ({
  times: { sunrise, sunset },
}) => {
  return (
    <View style={styles.iconContainer}>
      <View style={styles.iconRow}>
        <Icon size={40} color="#333" name="sunrise" />
        <Text style={styles.timeText}>{sunrise}</Text>
      </View>
      <View style={styles.iconRow}>
        <Icon size={40} color="#333" name="sunset" />
        <Text style={styles.timeText}>{sunset}</Text>
      </View>
    </View>
  )
}

const styles = {
  iconContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  iconRow: {
    flexDirection: "row",
    paddingVertical: 10,
  },
  timeText: {
    fontSize: 20,
  },
}

export default SunDisplay
