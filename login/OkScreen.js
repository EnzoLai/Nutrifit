import React from "react";
import { View, Text, Button } from "react-native";

export default function OkScreen({ onBack }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 32, fontWeight: "bold", color: "green", marginBottom: 20 }}>
        ✅ OK
      </Text>
      <Text style={{ fontSize: 18, marginBottom: 30 }}>Vos informations ont été sauvegardées avec succès.</Text>
      <Button title="Retour à la connexion" onPress={onBack} />
    </View>
  );
}
