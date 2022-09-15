import React from "react"

const KeyboardEvent = () => {
  const [keyboardShow, setKeyboardShow] = useState(false)
  React.useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardShow(true)
      }
    )
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardShow(false)
      }
    )

    return () => {
      keyboardDidHideListener.remove()
      keyboardDidShowListener.remove()
    }
  }, [])
  console.log({ keyboardShow })
  return <div>KeyboardEvent</div>
}

export default KeyboardEvent
