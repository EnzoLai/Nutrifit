import React from "react";
import { View, Text, Button } from "react-native";

export default function OkScreen({ onBack }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 32, fontWeight: "bold", color: "green", marginBottom: 20 }}>
        ✅ Success
      </Text>
      <Text style={{ fontSize: 18, marginBottom: 30 }}>Your informations where saved successfully.</Text>
      <Button title="Back to connection" onPress={onBack} />
    </View>
  );
}
