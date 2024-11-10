import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type FontSizeContextType = {
  fontSize: number;
  setFontSize: (size: number) => void;
};

const FontSizeContext = createContext<FontSizeContextType | undefined>(undefined);

const FONT_SIZE_KEY = '@fontSize';

const FontSizeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [fontSize, setFontSizeRaw] = useState(16); // Default font size
  const setFontSize = async (size: number) => {
    try {
      await AsyncStorage.setItem(FONT_SIZE_KEY, size.toString());
      setFontSizeRaw(size);
    } catch (error) {
      console.error('Failed to save font size:', error);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const storedFontSize = await AsyncStorage.getItem(FONT_SIZE_KEY);
        if (storedFontSize !== null) {
          setFontSize(parseInt(storedFontSize, 10)); // Load font size from AsyncStorage
        } else {
          setFontSize(16); // Default font size if none is found
        }
      } catch (error) {
        console.error('Failed to load font size:', error);
        setFontSize(16); // Fallback to default on error
      }
    })();
  }, []);

  return (
    <FontSizeContext.Provider value={{ fontSize, setFontSize }}>
      {children}
    </FontSizeContext.Provider>
  );
};

const useFontSize = () => {
  const context = useContext(FontSizeContext);
  if (context === undefined) {
    throw new Error('useFontSize must be used within a FontSizeProvider');
  }
  return context;
};

export { FontSizeProvider, useFontSize };
