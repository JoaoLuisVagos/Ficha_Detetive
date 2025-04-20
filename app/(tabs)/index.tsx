// app/(tabs)/index.tsx
import React from "react";
import { View, StyleSheet } from "react-native";
import FichaScreen from "../../screens/FichaScreen";
import { personagensAntigos, armas, locais } from "../../DadosFichas";

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <FichaScreen
        personagens={personagensAntigos}
        armas={armas}
        locais={locais}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
});
