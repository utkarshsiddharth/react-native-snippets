/**
 * View cashfree docs to:
 * - generate new order
 *
 * This Snippet can run in Expo managed app without ejecting the application
 */

import * as React from "react"
import { Component } from "react"

import {
  CFErrorResponse,
  CFPaymentGatewayService,
} from "react-native-cashfree-pg-sdk"
import {
  CFDropCheckoutPayment,
  CFEnvironment,
  CFPaymentComponentBuilder,
  CFPaymentModes,
  CFSession,
  CFThemeBuilder,
} from "cashfree-pg-api-contract"
import { Pressable, Text } from "react-native"

export default class Payment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      order_id: this.props.order_id,
      cftoken: this.props.cftoken,
    }
  }

  componentDidMount() {
    console.log("MOUNTED")
    const ctx = this
    CFPaymentGatewayService.setCallback({
      onVerify(orderID) {
        ctx.props.handleStatus(true, `order placed successfully`, orderID)
      },
      onError(error, orderID) {
        ctx.props.handleStatus(false, error?.message, orderID)
      },
    })
  }

  componentWillUnmount() {
    console.log("UNMOUNTED")
    CFPaymentGatewayService.removeCallback()
  }

  getToken() {
    console.log(this.state)
  }

  async initiatePayment(amount) {
    let cftoken = "PdtFI2KUIH2fYiy9TQc7"
    let order_id = "order_id_new-4445"
    // @todo - place an order

    this._startCheckout(cftoken, order_id)
  }

  async _startCheckout(cftoken, order_id) {
    try {
      const session = new CFSession(cftoken, order_id, CFEnvironment.SANDBOX)
      const paymentModes = new CFPaymentComponentBuilder()
        .add(CFPaymentModes.CARD)
        .add(CFPaymentModes.UPI)
        .add(CFPaymentModes.NB)
        .add(CFPaymentModes.WALLET)
        .add(CFPaymentModes.PAY_LATER)
        .build()
      const theme = new CFThemeBuilder()
        .setNavigationBarBackgroundColor("#E64A19")
        .setNavigationBarTextColor("#FFFFFF")
        .setButtonBackgroundColor("#FFC107")
        .setButtonTextColor("#FFFFFF")
        .setPrimaryTextColor("#212121")
        .setSecondaryTextColor("#757575")
        .build()
      const dropPayment = new CFDropCheckoutPayment(
        session,
        paymentModes,
        theme
      )
      CFPaymentGatewayService.doPayment(dropPayment)
    } catch (e) {
      console.log(e.message)
    }
  }

  render() {
    return (
      <Pressable
        className="bg-dark rounded-full  mr-8 mt-4 h-14 mb-4 w-72 ml-6 "
        onPress={() => this.initiatePayment(this.props.amount)}
      >
        <Text
          className={
            "text-white text-center  font-[GilroyRegular] text-sm font-bold mt-4"
          }
        >
          Pay {this.props.number || 0}
        </Text>
      </Pressable>
    )
  }
}
