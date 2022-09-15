// use this snippet inside initialRoute of the application
/**
 * DeepLinking for Expo React Native APP with React Navigation v6
 * Set schema in your app.json
 * {
 *  "expo": {
 *     "scheme": "myapp"
 *   }
 * }
 * 
 * # In your App.js file
 *  const linking = {
    prefixes: [prefix],
    config: {
      screens: {
        myroute: "myroute",
      },
    },
  }
  pass *linking* config to NavigationContainer
 *<NavigationContainer linking={linking}>

 * After setting the schema and snippet we can test the DeepLinking
 * 1. In Command Prompt
 * first add the scheme (make sure you are in project directory)
 * - npx uri-scheme add myapp
 *
 * then test using uri-scheme
 * - npx uri-scheme open myapp://myroute/params
 */

import React from "react"
const DeepLinking = () => {
  React.useEffect(() => {
    Linking.addEventListener("url", _handleDeepLink)
  })

  const _handleDeepLink = (event) => {
    if (event) {
      const route = event.url.replace(/.*?:\/\//g, "")
      if (route?.includes("setmpin")) {
        let { hostname, path, queryParams } = Linking.parse(route)
        console.log({ hostname, path, queryParams })
        const params = path.split("/")[1]
        const listener = Linking.addEventListener(
          "url",
          handleURL(path.split("/")[0], params)
        )
      }
    }
  }
  return null
}

export default DeepLinking
