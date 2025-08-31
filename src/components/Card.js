import React, { useState } from 'react';
import { View, TouchableOpacity, Animated } from 'react-native';
import { COLORS, DARK_COLORS, SHADOWS, SPACING } from '../../styles/theme';
import { createGlobalStyles } from '../../styles/globalStyles';
import { useAppContext } from '../context/AppContext';

const Card = ({ 
  children, 
  style, 
  padding = 'md', 
  margin = 'sm', 
  shadow = 'base', 
  border = false, 
  onPress,
  ...props 
}) => {
  const [scaleValue] = useState(new Animated.Value(1));
  const { darkMode } = useAppContext();
  const styles = createGlobalStyles(darkMode);
  const colors = darkMode ? DARK_COLORS : COLORS;

  const handlePressIn = () => {
    if (onPress) {
      Animated.spring(scaleValue, {
        toValue: 0.98,
        useNativeDriver: true,
      }).start();
    }
  };

  const handlePressOut = () => {
    if (onPress) {
      Animated.spring(scaleValue, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    }
  };

  const getPadding = () => {
    switch (padding) {
      case 'sm': return SPACING.sm;
      case 'lg': return SPACING.lg;
      case 'xl': return SPACING.xl;
      default: return SPACING.md;
    }
  };

  const getMargin = () => {
    switch (margin) {
      case 'sm': return SPACING.sm;
      case 'lg': return SPACING.lg;
      case 'xl': return SPACING.xl;
      default: return SPACING.sm;
    }
  };

  const getShadow = () => {
    switch (shadow) {
      case 'sm': return SHADOWS.sm;
      case 'lg': return SHADOWS.lg;
      case 'xl': return SHADOWS.xl;
      default: return SHADOWS.base;
    }
  };

  const cardStyle = [
    styles.card,
    {
      padding: getPadding(),
      margin: getMargin(),
      ...getShadow(),
      ...(border && {
        borderWidth: 2,
        borderColor: colors.primary,
      }),
    },
    style,
  ];

  if (onPress) {
    return (
      <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
        <TouchableOpacity 
          style={cardStyle} 
          onPress={onPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          activeOpacity={0.9}
          {...props}
        >
          {children}
        </TouchableOpacity>
      </Animated.View>
    );
  }

  return (
    <View style={cardStyle} {...props}>
      {children}
    </View>
  );
};

export default Card;
