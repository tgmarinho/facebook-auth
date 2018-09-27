import React, { Component } from "react";

import {
  StatusBar,
  View,
  TouchableHighlight,
  Text,
  Image,
  ActivityIndicator,
  StyleSheet
} from "react-native";

import auth from "./auth";

import { colors, general, metrics } from "./styles";

export default class App extends Component {
  state = {
    error: null,
    loading: false
  };

  handleLoginWithFacebook = async () => {
    await auth.facebookLogin();
  };

  render() {
    const { error, loading } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Image source={require("./images/logo.png")} style={styles.logo} />
        <View style={styles.box}>
          {!!error && <Text style={styles.error}>{error}</Text>}
          <TouchableHighlight
            onPress={this.handleLoginWithFacebook}
            style={styles.buttonContainer}
          >
            {!loading ? (
              <Text style={styles.buttonText}>Entrar com o Facebook</Text>
            ) : (
              <ActivityIndicator size="small" color={styles.spinner.color} />
            )}
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    padding: metrics.baseMargin
  },

  logo: {
    width: metrics.screenWidth * 0.3,
    height: metrics.screenWidth * 0.3,
    marginBottom: metrics.baseMargin
  },

  box: {
    ...general.box,
    alignSelf: "stretch"
  },

  input: {
    alignSelf: "stretch",
    paddingVertical: metrics.basePadding,
    marginBottom: metrics.baseMargin / 2
  },

  error: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.danger,
    marginBottom: metrics.baseMargin / 2
  },

  buttonContainer: {
    padding: metrics.basePadding,
    backgroundColor: colors.secundary,
    borderRadius: metrics.baseRadius,
    alignSelf: "stretch"
  },

  buttonText: {
    color: colors.white,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16
  },

  spinner: {
    color: colors.primary
  }
});
