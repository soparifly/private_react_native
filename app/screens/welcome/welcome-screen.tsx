import React, { useCallback, FC } from "react"
import {
  View,
  ViewStyle,
  TextStyle,
  SafeAreaView,
  Image,
  ImageStyle,
  Alert,
  Linking,
} from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { Button, Header, Screen, Text, GradientBackground } from "../../components"
import { color, spacing, typography } from "../../theme"
import { NavigatorParamList } from "../../navigators"

import {} from "react-native-permissions"

import ImagePicker, { launchCamera, launchImageLibrary } from "react-native-image-picker"
// import { PERMISSIONS, request, check, RESULTS } from "react-native-permissions"

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
  padding: 10,
}
const FOOTER: ViewStyle = { backgroundColor: "#20162D" }
const FOOTER_CONTENT: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
}

const BUTTONSTYLEL: ViewStyle = {
  flexDirection: "row",
  flexWrap: "wrap",
  marginVertical: 8,
}

const IMAGE: ImageStyle = {
  marginVertical: 24,
  alignItems: "center",
}

const includeExtra = true
export function ImagePockerAvatar({ uri }) {
  return <Image source={uri ? { uri } : undefined} />
}

export const WelcomeScreen: FC<StackScreenProps<NavigatorParamList, "welcome">> = observer(() => {
  const [response, setResponse] = React.useState<any>(null)

  const onButtonPress = useCallback((type, options) => {
    if (type === "capture") {
      launchCamera(options, (res) => {
        setResponse(res)
        if (res?.errorCode === "permission") {
          Alert.alert(
            "경고",
            "카메라 권한 설정이 필요합니다",
            [
              {
                text: "설정하기",
                onPress: () => Linking.openSettings(),
              },
              {
                text: "Cancel",
                onPress: () => console.log("취소 클릭"),
                style: "cancel",
              },
            ],
            {
              cancelable: true,
              onDismiss: () =>
                Alert.alert("This alert was dismissed by tapping outside of the alert dialog."),
            },
          )
        }
      })
    } else {
      launchImageLibrary(options, setResponse).then((response) => {
        // console.log(response)
        const uri = response?.assets && response.assets[0].uri
        // console.log(uri) // 로컬 파일 주소지
      })
      // console.log(response)
    }
  }, [])

  return (
    <View testID="WelcomeScreen" style={FULL}>
      <GradientBackground colors={["#422443", "#281b34"]} />
      <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
        <Header headerTx="welcomeScreen.poweredBy" style={HEADER} titleStyle={HEADER_TITLE} />
        <Text style={TITLE_WRAPPER}>접근 권한 승인</Text>
        <Text style={TITLE_WRAPPER}>해당 서비스 이용을 위한 접근 권한을 허용합니다.</Text>
        <Text style={TITLE_WRAPPER}>카메라 접근 권한을 허용합니다</Text>
        {response?.assets &&
          response?.assets.map(({ uri }) => (
            <View key={uri} style={IMAGE}>
              <Image
                resizeMode="cover"
                resizeMethod="scale"
                // eslint-disable-next-line react-native/no-inline-styles
                style={{ width: 200, height: 200 }}
                source={{ uri }}
              />
            </View>
          ))}
      </Screen>
      <SafeAreaView style={FOOTER}>
        <View style={FOOTER_CONTENT}>
          <View style={BUTTONSTYLEL}>
            {actions.map(({ title, type, options }) => {
              return (
                <Button
                  key={title}
                  text={title}
                  onPress={() => onButtonPress(type, options)}
                ></Button>
              )
            })}
          </View>
        </View>
      </SafeAreaView>
    </View>
  )
})
interface Action {
  title: string
  type: "capture" | "library"
  options: ImagePicker.CameraOptions | ImagePicker.ImageLibraryOptions
}

const actions: Action[] = [
  {
    title: "Take Image",
    type: "capture",
    options: {
      saveToPhotos: true,
      mediaType: "photo",
      includeBase64: false,
      includeExtra,
    },
  },
  {
    title: "Select Image",
    type: "library",
    options: {
      maxHeight: 200,
      maxWidth: 200,
      selectionLimit: 0,
      mediaType: "photo",
      includeBase64: false,
      includeExtra,
    },
  },
]
