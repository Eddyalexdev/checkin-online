import { Link } from "expo-router";
import React, { useEffect, useRef } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Pressable,
  Animated,
  ScrollView,
  StatusBar,
  Platform,
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";

const PRIMARY = "#00CCC0";
const BG = "#F7FEFD";
const TEXT = "#083033";

export default function HomeScreen() {
  const fade = useRef(new Animated.Value(0)).current;
  const rise = useRef(new Animated.Value(12)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, {
        toValue: 1,
        duration: 420,
        useNativeDriver: true,
      }),
      Animated.timing(rise, {
        toValue: 0,
        duration: 420,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fade, rise]);

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      keyboardShouldPersistTaps="handled"
    >
      <Animated.View
        style={[
          styles.container,
          { opacity: fade, transform: [{ translateY: rise }] },
        ]}
      >
        <View style={styles.header}>
          <View style={styles.logoPulse}>
            <AntDesign name="scan" size={22} color="#fff" />
          </View>
          <Text style={styles.title}>Check-In Scanner</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.buttonsContainer}>
            <Link href="/screens/FrontScanScreen" asChild>
              <Pressable
                style={({ pressed }) => [
                  styles.buttonPrimary,
                  pressed && styles.buttonPressed,
                ]}
                android_ripple={{ color: "rgba(0,0,0,0.06)" }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Ionicons
                    name="id-card"
                    size={20}
                    color="#072827"
                    style={styles.icon}
                  />
                  <Text style={styles.buttonText}>Escanear Documento</Text>
                </View>
              </Pressable>
            </Link>
          </View>

          <Text style={styles.hint}>
            Consejo: coloca el documento sobre una superficie oscura para una
            mejor detección.
          </Text>
        </View>

        <Text style={styles.footer}>Versión 1.0 • Check-In</Text>
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: BG,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingVertical: 28,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  container: {
    alignItems: "center",
  },

  /* Header */
  header: {
    alignItems: "center",
    marginBottom: 18,
    width: "100%",
  },
  logoPulse: {
    width: 58,
    height: 58,
    borderRadius: 14,
    backgroundColor: PRIMARY,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    shadowColor: PRIMARY,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.14,
    shadowRadius: 16,
    elevation: 6,
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: TEXT,
    letterSpacing: 0.2,
  },
  subtitle: {
    marginTop: 6,
    fontSize: 13,
    color: "#3B6F6B",
    textAlign: "center",
    maxWidth: 340,
    lineHeight: 18,
  },

  /* Card */
  card: {
    width: "100%",
    marginTop: 6,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
  buttonsContainer: {
    width: "100%",
  },

  buttonPrimary: {
    width: "100%",
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: PRIMARY,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  buttonPressed: {
    opacity: 0.9,
  },

  icon: {
    marginRight: 10,
  },

  buttonText: {
    color: "#042B2A",
    fontWeight: "700",
    fontSize: 15,
  },

  hint: {
    marginTop: 14,
    fontSize: 13,
    color: "#6b8886",
    textAlign: "center",
    paddingHorizontal: 8,
  },

  footer: {
    marginTop: 24,
    color: "#98CFC9",
    fontSize: 12,
  },
});
