import {
  View,
  Text,
  FlatList,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native"
import React, { useLayoutEffect, useState } from "react"
import { StatusBar } from "expo-status-bar"
import { useNavigation } from "@react-navigation/native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useRef } from "react"
const slides = [
  {
    id: "1",
    image: require("../../../assets/images/parentOnboarding/1.png"),
    title: "Let your child",
    subTitle: "spend independently",
    description: "Issue a prepaid Mayaa card for your child",
  },
  {
    id: "2",
    image: require("../../../assets/images/parentOnboarding/2.png"),
    title: "Reward your kids for doing",
    subTitle: "household chores",
    description: "Create tasks to teach children about value of money",
  },
  {
    id: "3",
    image: require("../../../assets/images/parentOnboarding/3.png"),
    title: "Invest to multiply your",
    subTitle: "child’s wealth",
    description: "Own gold/silver virtually with as little as INR10!",
  },
]

const { width, height } = Dimensions.get("window")
const Slide = ({ item, currentSlideIndex, goNextSlide }) => {
  const navigation = useNavigation()
  const Footer = ({ id }) => {
    return (
      <View className="" key={id}>
        <View className="flex-row space-x-2  mt-[20px]">
          {slides.map((_, index) => (
            <TouchableOpacity onPress={goNextSlide}>
              {currentSlideIndex === index ? (
                <View
                  key={index}
                  className="h-[8px] w-[55px] bg-transparent border-[1px] border-[#26262a] m-x-[3px] rounded-full"
                />
              ) : (
                <View
                  key={index}
                  className="h-[8px] w-[17px] border-[1px] bg-[#212121] border-[#26262a] m-x-[3px] rounded-full"
                />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    )
  }
  return (
    <View style={{ width: width }} className={``}>
      <Image
        source={item.image}
        style={{ height: height / 2, width: width }}
        resizeMode="cover"
      />
      <View className="px-4 py-10 justify-between flex-1">
        {/* content */}
        <View>
          <Text className="text-[#212121] font-[JuanaSemibold] text-2xl">
            {item.title}
          </Text>
          <Text className="text-[#212121] font-[JuanaSemibold] text-2xl">
            {item.subTitle}
          </Text>
          <Text className="text-[#212121] font-[GilroyMedium] text-[16px] tracking-wide mt-2">
            {item.description}
          </Text>
          {/* navigation bars */}
          <Footer id={item.id} currentSlideIndex={currentSlideIndex} />
        </View>
        {/* content end */}

        {/* button */}
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("MyFamily", { isParent: true })
          }}
          className=" px-6 justify-center"
        >
          <View className="bg-[#212121] mt-4  px-8 rounded-full shadow-md">
            <Text className="text-center text-white font-[GilroyMedium] py-[12px]">
              View Dashboard
            </Text>
          </View>
        </TouchableOpacity>
        {/* button end */}
      </View>
    </View>
  )
}

const ParentWelcomeScreens = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const ref = useRef(null)
  const navigation = useNavigation()
  const updateCurrentSlideIndex = (e) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x
    const currentIndex = Math.round(contentOffsetX / width)
    setCurrentSlideIndex(currentIndex)
  }
  const goNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1
    if (nextSlideIndex != slides.length) {
      const offset = nextSlideIndex * width
      ref?.current?.scrollToOffset({ offset })
      setCurrentSlideIndex(nextSlideIndex)
    }
  }
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [])
  return (
    <SafeAreaView className="bg-[#f6ebcd] flex-1">
      <StatusBar backgroundColor="white" />
      <FlatList
        ref={ref}
        pagingEnabled
        onMomentumScrollEnd={updateCurrentSlideIndex}
        renderItem={({ item }) => (
          <Slide
            currentSlideIndex={currentSlideIndex}
            item={item}
            goNextSlide={goNextSlide}
          />
        )}
        data={slides}
        className="h-3/4"
        contentContainerStyle={{
          height: height,
        }}
        showsVerticalScrollIndicator={false}
        horizontal
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  )
}

export default ParentWelcomeScreens
