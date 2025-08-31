import React, { useState } from 'react';
import { TouchableOpacity, Text, ActivityIndicator, Animated } from 'react-native';
import * as Haptics from 'expo-haptics';
import { createGlobalStyles } from '../../styles/globalStyles';
import { COLORS, DARK_COLORS, SPACING } from '../../styles/theme';
import { useAppContext } from '../context/AppContext';

const Button = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  textStyle,
  ...props
}) => {
  const [scaleValue] = useState(new Animated.Value(1));
  const { darkMode } = useAppContext();
  const styles = createGlobalStyles(darkMode);
  const colors = darkMode ? DARK_COLORS : COLORS;

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const handlePress = () => {
    if (!disabled && !loading && onPress) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      onPress();
    }
  };

  const getButtonStyle = () => {
    let buttonStyle = [styles.button];
    
    switch (variant) {
      case 'secondary':
        buttonStyle.push(styles.buttonSecondary);
        break;
      case 'outline':
        buttonStyle.push(styles.buttonOutline);
        break;
      case 'ghost':
        buttonStyle.push({
          backgroundColor: 'transparent',
          shadowOpacity: 0,
          elevation: 0,
        });
        break;
      default:
        break;
    }
    
    switch (size) {
      case 'small':
        buttonStyle.push({
          paddingVertical: SPACING.sm,
          paddingHorizontal: SPACING.md,
          minHeight: 36,
        });
        break;
      case 'large':
        buttonStyle.push({
          paddingVertical: SPACING.lg,
          paddingHorizontal: SPACING.xl,
          minHeight: 56,
        });
        break;
      default:
        buttonStyle.push({
          paddingVertical: SPACING.md,
          paddingHorizontal: SPACING.lg,
          minHeight: 48,
        });
        break;
    }
    
    if (disabled) {
      buttonStyle.push(styles.buttonDisabled);
    }
    
    return buttonStyle;
  };
  
  const getTextStyle = () => {
    let textStyleArray = [styles.buttonText];
    
    switch (variant) {
      case 'secondary':
        textStyleArray.push(styles.buttonSecondaryText);
        break;
      case 'outline':
        textStyleArray.push(styles.buttonOutlineText);
        break;
      case 'ghost':
        textStyleArray.push({
          color: colors.primary,
        });
        break;
      default:
        break;
    }
    
    if (disabled) {
      textStyleArray.push(styles.buttonDisabledText);
    }
    
    return textStyleArray;
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
      <TouchableOpacity
        style={[...getButtonStyle(), style]}
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled || loading}
        activeOpacity={0.8}
        {...props}
      >
        {loading ? (
          <ActivityIndicator 
            color={variant === 'outline' || variant === 'ghost' ? colors.primary : colors.white} 
            size="small" 
          />
        ) : (
          <Text style={[...getTextStyle(), textStyle]}>
            {title}
          </Text>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

export default Button;
