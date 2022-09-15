import React from "react"
import { View, Text, FlatList, Image, useWindowDimensions } from "react-native"
import BeginerSliderCard from "./beginer-guide-card"
import Parragraph from "../../typography/Parragraph"
import { Button } from "native-base"
import { PlayIcon } from "react-native-heroicons/outline"
import { LinearGradient } from "expo-linear-gradient"
import { useSelector } from "react-redux"
import { useNavigation } from "@react-navigation/native"
import axios from "../../../utils/axios"
const slides = [
  {
    id: "1",
    image: require("../../assets/images/dashboard/frame1.png"),
    title: "Beginner’s guide",
    subTitle: "Make the best use of Mayaa app",
    buttonText: "Start",
    route: null,
  },
  {
    id: "2",
    image: require("../../assets/images/dashboard/frame2.png"),
    title: "Start investing in mutual funds",
    subTitle: "no long procedures",
    buttonText: "Explore",
    route: "MutualFunds",
  },
  {
    id: "3",
    image: require("../../assets/images/dashboard/frame3.png"),
    title: "Start saving in digital gold",
    subTitle: "starting as low as INR10",
    buttonText: "Explore",
    route: "Gold",
  },
]
const DashboardWelcome = ({ classNames }) => {
  const { height, width } = useWindowDimensions()
  // console.log(StarWhite)
  return (
    <View className={` ${classNames}`}>
      <FlatList
        pagingEnabled
        renderItem={({ item }) => <BeginerSliderCard item={item} />}
        data={slides}
        contentContainerStyle={{
          marginLeft: 8,
        }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        horizontal
        keyExtractor={(item) => item.id}
      />
    </View>
  )
}

export default DashboardWelcome

const BeginerSliderCard = ({ item }) => {
  const { currentUserProfile } = useSelector((state) => state.main)
  const { token } = useSelector((state) => state.auth)
  const navigation = useNavigation()
  const { height, width } = useWindowDimensions()
  const handleNavigation = (route) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    if (route === "Gold") {
      if (currentUserProfile?.is_email_verified) {
        // onboard the user on gold dashboard
        try {
          const res = axios.post(`/GoldsBuySell/onBoarding`, null, config)
          console.log({ onboard: res?.data })
          navigation.navigate("RegularGoldDashboard")
        } catch (err) {
          console.log({ err: err?.response.data.messgae })
        }
      } else {
        navigation.navigate("EmailSignUp", "GoldDashboard")
      }
    }
  }
  return (
    <View
      className={`flex-row bg-[#FFFBF0] py-4  rounded-xl space-x-2 mr-2 px-4 justify-between`}
      style={{ width: width * 0.83 }}
    >
      <LinearGradient // Background Linear Gradient
        colors={["#FFFBF0", "rgba(255, 251, 240, 0.94)"]}
      />
      <View className="w-[50%] justify-evenly">
        <Parragraph classNames={"text-base font-bold"} text={item.title} />
        <Parragraph classNames={"text-xs font-normal"} text={item.subTitle} />
        {/* action button */}

        <Button
          onPress={() => handleNavigation(item.route)}
          backgroundColor={"#212121"}
          leftIcon={
            item.buttonText === "Start" ? (
              <PlayIcon color="white" height={22} size={22} />
            ) : (
              <></>
            )
          }
          width="100px"
          rounded="full"
          marginTop={"2"}
        >
          {item.buttonText}
        </Button>
      </View>
      <View className="w-[50%] pr-4">
        <Image className="h-[115px] w-[110px]" source={item.image} />
      </View>
    </View>
  )
}
