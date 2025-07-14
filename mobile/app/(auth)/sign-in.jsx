import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { styles } from "@/assets/styles/auth.styles";
import { Image } from "expo-image";
import { useSocialAuth } from "@/hooks/useSocialAuth.js";

export default function Index() {
  const { isLoading, handleSocialAuth } = useSocialAuth();

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/revenue-i2.png")}
        style={styles.illustration}
      />
      <View style={styles.signinContainer}>
        {/* GOOGLE SIGNIN */}
        <TouchableOpacity
          style={styles.signinButton}
          onPress={() => handleSocialAuth("oauth_google")}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#000" />
          ) : (
            <View style={styles.signinFlex}>
              <Image
                source={require("../../assets/images/google.png")}
                style={styles.signinIcon}
              />
              <Text style={styles.signinText}>Continue with Google</Text>
            </View>
          )}
        </TouchableOpacity>

        {/* FACEBOOK SIGNIN */}
        <TouchableOpacity
          style={styles.signinButton}
          onPress={() => handleSocialAuth("oauth_facebook")}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#000" />
          ) : (
            <View style={styles.signinFlex}>
              <Image
                source={require("../../assets/images/facebook.png")}
                style={styles.signinIcon}
              />
              <Text style={styles.signinText}>Continue with Facebook</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Terms and Privacy */}
      <View style={styles.termsContainer}>
        <Text style={styles.termsText}>
          By signing up, you agree to our <Text style={styles.link}>Terms</Text>
          {", "}
          <Text style={styles.termsLink}>Privacy Policy</Text>
          {", and "}
          <Text style={styles.termsLink}>Cookie Use</Text>.
        </Text>
      </View>
    </View>
  );
}
