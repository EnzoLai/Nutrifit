import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://gclpgggqbmbcaenzidgh.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdjbHBnZ2dxYm1iY2FlbnppZGdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI3ODI5MjEsImV4cCI6MjA3ODM1ODkyMX0.dIsT_dnWNPFqNpB5C4cY5ZSRetzL1k_B3Fu81XzLQeY";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const checkConnection = async () => {
      const { error } = await supabase.from("user").select("id").limit(1);
      if (error) {
        console.error("❌ Erreur de connexion :", error.message);
        Alert.alert("Erreur", "Connexion à la base échouée ❌");
      } else {
        console.log("✅ Connexion à Supabase réussie !");
        setConnected(true);
      }
    };
    checkConnection();
  }, []);

  const handleAuth = async () => {
    if (!email || !password) {
      Alert.alert("Erreur", "Remplis tous les champs !");
      return;
    }

    if (isRegister) {
      // Création d’un compte
      const { data, error } = await supabase
        .from("user")
        .insert([{ email, password }])
        .select("*")
        .single();

      if (error) Alert.alert("Erreur", error.message);
      else {
        Alert.alert("Succès", "Compte créé avec succès ✅");
        onLogin(data);
      }
    } else {
      // Connexion
      const { data, error } = await supabase
        .from("user")
        .select("*")
        .eq("email", email)
        .single();

      if (error || !data) {
        Alert.alert("Erreur", "Email introuvable ❌");
      } else if (data.password !== password) {
        Alert.alert("Erreur", "Mot de passe incorrect ❌");
      } else {
        Alert.alert("Bienvenue", "Connexion réussie ✅");
        onLogin(data);
      }
    }
  };

  return (
    <View style={{ padding: 20, justifyContent: "center", flex: 1 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10, textAlign: "center" }}>
        {isRegister ? "Créer un compte" : "Connexion"}
      </Text>

      {/* Indicateur de connexion à la base */}
      <Text style={{ textAlign: "center", marginBottom: 15, color: connected ? "green" : "red" }}>
        {connected ? "✅ Base de données connectée" : "⏳ Connexion à la base..."}
      </Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 8,
          padding: 10,
          marginBottom: 10,
        }}
      />

      <TextInput
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 8,
          padding: 10,
          marginBottom: 20,
        }}
      />

      <Button title={isRegister ? "Créer un compte" : "Se connecter"} onPress={handleAuth} />

      <Text
        style={{ textAlign: "center", marginTop: 15, color: "blue" }}
        onPress={() => setIsRegister(!isRegister)}
      >
        {isRegister ? "Déjà un compte ? Se connecter" : "Créer un compte"}
      </Text>
    </View>
  );
}
