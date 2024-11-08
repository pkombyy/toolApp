import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const calculator = () => {
  return (
    <View style={styles.container}>
      <Text>calculator</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default calculator;