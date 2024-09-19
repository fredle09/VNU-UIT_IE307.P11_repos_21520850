import { KeyboardAvoidingView, ScrollView, View } from "react-native";
import { Text } from "~/components/ui/text";

export default function ForgetPasswordScreen() {
  return (
    <KeyboardAvoidingView behavior="height" className="flex">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View
          className="flex-1 justify-center items-center"
          // style={{ backgroundColor: isDarkmode ? '#17171E' : themeColor.white100 }}
          style={{ backgroundColor: '#17171E' }}
        >
          {/* <Image
            resizeMode="contain"
            className="h-56 w-56"
            source={require('../../../assets/images/login.png')}
          /> */}
        </View>
        <View className={`flex-3 px-5 pb-5 ${'bg-dark'}`}>
          <Text className="text-center font-bold py-7 text-lg">Forget Password</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}