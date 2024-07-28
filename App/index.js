// Filename: index.js
// Combined code from all files

import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, Animated } from 'react-native';

const getRandomAnswer = () => {
  const random = Math.random();
  if (random < 0.4) return 'Yep';
  if (random < 0.6) return 'Nope';
  return 'Dunno';
};

export default function App() {
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const opacity = new Animated.Value(0);

  useEffect(() => {
    if (answer) {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }
  }, [answer]);

  const handleTap = () => {
    setLoading(true);
    setAnswer('');
    
    setTimeout(() => {
      setAnswer(getRandomAnswer());
      setLoading(false);
      opacity.setValue(0);
    }, 3000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.container} onPress={handleTap}>
        <View style={styles.content}>
          {loading ? (
            <ActivityIndicator size="large" color="#ffffff" />
          ) : (
            <Animated.Text style={[styles.answer, { opacity }]}>{answer}</Animated.Text>
          )}
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000080',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  answer: {
    fontSize: 32,
    color: '#ffffff',
    fontFamily: 'sans-serif',
  },
});