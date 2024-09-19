import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Pressable } from "react-native";

const App = () => {
  const [input, setInput] = useState("");

  const handlePress = (value: any) => {
    setInput((prev) => prev + value);
  };

  const calculateResult = () => {
    try {
      setInput(eval(input).toString());
    } catch (error) {
      setInput("Error");
    }
  };

  const clearInput = () => {
    setInput("");
  };

  const removeLastChar = () => {
    setInput((prev) => prev.substring(0, prev.length - 1));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.result}>{input}</Text>
      <View style={styles.buttonContainer}>
        {["AC", "CE", "%", "/", "7", "8", "9", "*", "4", "5", "6", "-", "1", "2", "3", "+", "0", ".", ",", "=",]
          .map((item) => (
            // <TouchableHighlight
            <TouchableOpacity
              key={item}
              style={{
                ...styles.button, ...(
                  ["="].includes(item)
                    ? { backgroundColor: "#0d9488" }
                    : ["AC", "CE", "%", "/",].includes(item)
                      ? { backgroundColor: "#f0fdfa" }
                      : {})
              }}
              // underlayColor={styles.buttonHover.backgroundColor}
              activeOpacity={0.9}
              onPress={() =>
                item === "AC"
                  ? clearInput()
                  : item === "CE"
                    ? removeLastChar()
                    : item === "="
                      ? calculateResult()
                      : handlePress(item)}
            >
              <Text style={{
                ...styles.buttonText,
                ...(["AC", "CE", "%", "/", "*", "-", "+", "=",].includes(item)
                  ? { color: "#134e4a" }
                  : {})
              }}>{item}</Text>
            </TouchableOpacity>
          ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  result: {
    fontSize: 40,
    marginBottom: 20,
    textAlign: "right",
    width: "100%",
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 3,
  },
  buttonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    borderRadius: 100,
    width: "22%",
    height: 70,
    margin: 5,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonHover: {
    backgroundColor: "#f0fdfa",
    color: "#f0fdfa",
  },
  buttonText: {
    fontSize: 30,
    color: "#134e4a",
    // backgroundColor: "#fff",
    fontWeight: "bold",
  },
});

export default App;