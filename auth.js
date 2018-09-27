import "./reactotronConfig";

import {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager
} from "react-native-fbsdk";

export default {
  facebookLogin: async () => {
    let result;
    try {
      result = await LoginManager.logInWithReadPermissions([
        "public_profile",
        "email"
      ]);
    } catch (nativeError) {
      alert("native error");
    }

    if (result.isCancelled) {
      console.tron.log("user cancel login");
    } else {
      const accessData = await AccessToken.getCurrentAccessToken();

      const infoRequest = new GraphRequest(
        "/me",
        {
          accessToken: accessData.accessToken,
          parameters: {
            fields: {
              string: "id, email, picture.type(large)"
            }
          }
        },
        (error, result) => {
          if (error) {
            console.tron.log("houve um erro no Graph Request");
          } else {
            console.tron.log(result);
          }
        }
      );

      new GraphRequestManager().addRequest(infoRequest).start();
    }
  }
};
