import React, { FC } from "react"
import { View, ViewStyle, TextStyle, SafeAreaView } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import {
  Button,
  Header,
  Screen,
  Text,
  GradientBackground,
} from "../../components"
import { color, spacing, typography } from "../../theme"
import { NavigatorParamList } from "../../navigators"

import ImagePicker from 'react-native-image-picker'
import { PERMISSIONS, request, check, RESULTS } from 'react-native-permissions'


const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
}
const TEXT: TextStyle = {
  color: color.palette.white,
  fontFamily: typography.primary,
}
const BOLD: TextStyle = { fontWeight: "bold" }
const HEADER: TextStyle = {
  paddingTop: spacing[3],
  paddingBottom: spacing[4] + spacing[1],
  paddingHorizontal: 0,
}
const HEADER_TITLE: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 12,
  lineHeight: 15,
  textAlign: "center",
  letterSpacing: 1.5,
}
const TITLE_WRAPPER: TextStyle = {
  ...TEXT,
  textAlign: "center",
  padding: 10
}
const CONTINUE: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  backgroundColor: color.palette.deepPurple,
}
const CONTINUE_TEXT: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 13,
  letterSpacing: 2,
}
const FOOTER: ViewStyle = { backgroundColor: "#20162D" }
const FOOTER_CONTENT: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
}

const includeExtra = true;

export const WelcomeScreen: FC<StackScreenProps<NavigatorParamList, "welcome">> = observer(
  ({ navigation }) => {


    const [response, setResponse] = React.useState(null);

    const 카메라실행 = React.useCallback((type, options) => {
      if (type === 'capture') {
        ImagePicker.launchCamera(options, setResponse);
      } else {
        ImagePicker.launchImageLibrary(options, setResponse);
      }

    }, [])

    /**
     * check 방식은 특정 권한상태확인후 리턴
     * request 는 메시지를 띄움
     * 
     */
    const requestPermisstion = () => {
      request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE).then(response => {
        console.log(response);

      })
    }

    const checkPermission = () => {
      check(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE).then(result => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            // 이 기능을 사용할 수 없습니다(이 장치에서 / 이 컨텍스트에서)
            break;
          case RESULTS.DENIED:
            // 권한이 요청되지 않았습니다/거부되었지만 요청 가능합니다
            break;
          case RESULTS.GRANTED:
            // 권한이 부여됨
            break;
          case RESULTS.LIMITED:
            // 권한이 부여되지만 제한이 있습니다.
            break;
          case RESULTS.BLOCKED:
          // 권한이 거부되었으며 더 이상 요청할 수 없습니다.
        }

      })

    }


    return (
      <View testID="WelcomeScreen" style={FULL}>
        <GradientBackground colors={["#422443", "#281b34"]} />
        <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
          <Header headerTx="welcomeScreen.poweredBy" style={HEADER} titleStyle={HEADER_TITLE} />
          <Text style={TITLE_WRAPPER}>
            접근 권한 승인
          </Text>
          <Text style={TITLE_WRAPPER}>
            해당 서비스 이용을 위한 접근 권한을 허용합니다.
          </Text>
          <Text style={TITLE_WRAPPER}>
            카메라 접근 권한을 허용합니다
          </Text>
        </Screen>
        <SafeAreaView style={FOOTER}>
          <View style={FOOTER_CONTENT}>
            <Button
              testID="next-screen-button"
              style={CONTINUE}
              textStyle={CONTINUE_TEXT}
              tx="welcomeScreen.continue"
              onPress={() => requestPermisstion()}
            />
          </View>
        </SafeAreaView>
      </View >
    )
  },
)
