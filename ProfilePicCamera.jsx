import { View, Text, Image, TouchableOpacity } from "react-native"
import React from "react"
import * as ImagePicker from "expo-image-picker"
import { SvgXml } from "react-native-svg"
import { EditIcon } from "../svg/EditIcon"

const ProfilePic = ({ setImage, avatar }) => {
  const pickImage = async () => {
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: true,
    })

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [2, 3],
      quality: 1,
      base64: true,
    })
    if (result) {
      setImage(result)
    }
  }
  return (
    <>
      <View className="shadow-md relative">
        <Image
          className="h-[80px] w-[80px] bg-cover rounded-2xl"
          source={
            avatar ? { uri: avatar } : require("../../assets/images/rahul.png")
          }
          //   source={
          //     image
          //       ? image
          //       : avatar
          //       ? { uri: avatar }
          //       : require("../../assets/images/rahul.png")
          //   }
        />
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={pickImage}
          className="absolute -right-[10px] -top-[10px]"
        >
          <SvgXml xml={EditIcon} />
        </TouchableOpacity>
      </View>
    </>
  )
}

export default ProfilePic
