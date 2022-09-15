import { Text, Pressable } from "react-native"
import axios from "axios"
import React, { Children } from "react"
import RNPgReactNativeSDK from "react-native-pg-react-native-sdk"
import { useSelector } from "react-redux"
const PaymentNative = ({
  amount, // number
  type = "G24K", // optional
  handleClear,
  handleResponse, // handle the response
}) => {
  const { token } = useSelector((state) => state.auth)
  const handlePayment = async () => {
    if (handleClear) {
      handleClear()
    }
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const body = {
      value: amount,
      bullionType: type,
      transactionType: "buyCash",
    }
    // use cashfree docs to generate the order
    // generate order - recieve 3 fields:- tokenData, orderId, orderAmount
    try {
      const res = await axios.post(
        `http://115.124.108.237:8081/api/GoldsBuySell/buy`,
        body,
        config
      )
      const { totalAmount, orderId, cfToken, notifyUrl } = res?.data?.response
      // initiate payment
      if (cfToken) {
        console.log("initiate payment")
        const env = "TEST"
        const inputParams = {
          orderId,
          orderAmount: `${totalAmount}`,
          orderCurrency: "INR",
          tokenData: `${cfToken}`,
          customerName: "Sahil",
          customerPhone: "7979787666",
          customerEmail: "sahil@gmail.com",
          notifyUrl: `${notifyUrl}`,
          appId: "517388c1227e018e57bb4c8a583715",
          orderNote: "This is a dummy order",
        }
        RNPgReactNativeSDK.startPaymentWEB(inputParams, env, async (result) => {
          const obj = JSON.parse(result)
          const {
            orderAmount,
            orderId,
            paymentMode,
            referenceId,
            signature,
            txMsg,
            txStatus,
            txTime,
          } = obj
          const formData = new FormData()
          formData.append("orderId", orderId)
          formData.append("paymentMode", paymentMode)
          formData.append("referenceId", referenceId)
          formData.append("signature", signature)
          formData.append("txMsg", txMsg)
          formData.append("txStatus", txStatus)
          formData.append("txTime", txTime)
          formData.append("orderAmount", orderAmount)
          try {
            const config = {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
            // manually confirm the order
            const notifyRes = await axios.post(
              `http://115.124.108.237:8081/api/Payments/notify`,
              formData,
              config
            )
            const notifyUrlResponse = notifyRes
            if (handleResponse) {
              handleResponse(obj)
            }
          } catch (err) {
            console.log(err?.response.data.message)
          }
        })
      }
    } catch (err) {
      console.log({ err: err?.response.data.message })
    }
  }
  return (
    <Pressable
      disabled={Number(amount) <= 0}
      className="bg-dark rounded-full  mr-8 mt-4 h-14 mb-4 w-72 ml-6 "
      onPress={handlePayment}
    >
      <Text
        className={
          "text-white text-center  font-[GilroyRegular] text-sm font-bold mt-4"
        }
      >
        Pay {Number(amount) * 1.03}
      </Text>
    </Pressable>
  )
}

export default PaymentNative
