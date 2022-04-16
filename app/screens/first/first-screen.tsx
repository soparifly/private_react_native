import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { Screen, Text } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color } from "../../theme"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
}

export const FirstScreen: FC<StackScreenProps<NavigatorParamList, "first">> = observer(function FirstScreen() {
  return (
    <Screen style={ROOT} preset="scroll">
      <Text preset="header" text="first" />
    </Screen>
  )
})
