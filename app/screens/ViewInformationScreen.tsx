import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useScan } from "../hooks";

const ViewInformationScreen = () => {
  const { form } = useScan();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Form Information</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.infoKey}>Nombre:</Text>
        <Text style={styles.infoValue}>{String(form.name)}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoKey}>Primer Apellido:</Text>
        <Text style={styles.infoValue}>{String(form.firstLastName)}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoKey}>Segundo Apellido:</Text>
        <Text style={styles.infoValue}>{String(form.secondLastName)}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoKey}>Genero:</Text>
        <Text style={styles.infoValue}>{String(form.gender)}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoKey}>Fecha de Nacimiento:</Text>
        <Text style={styles.infoValue}>{String(form.birthDate.day)} / {String(form.birthDate.month)} / {String(form.birthDate.year)}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoKey}>Nacionalidad:</Text>
        <Text style={styles.infoValue}>{String(form.nationality)}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoKey}>ID del documento:</Text>
        <Text style={styles.infoValue}>{String(form.idNumber)}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoKey}>Numero de soporte:</Text>
        <Text style={styles.infoValue}>{String(form.supportNumber)}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#343a40",
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  infoKey: {
    fontWeight: "bold",
    color: "#495057",
  },
  infoValue: {
    color: "#6c757d",
  },
  noData: {
    fontSize: 16,
    fontStyle: "italic",
    textAlign: "center",
    color: "#868e96",
  },
});

export default ViewInformationScreen;

