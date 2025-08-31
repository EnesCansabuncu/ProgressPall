import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { createGlobalStyles } from '../../styles/globalStyles';
import { COLORS, SPACING } from '../../styles/theme';
import { useAppContext } from '../context/AppContext';

const Input = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  error,
  disabled = false,
  multiline = false,
  numberOfLines = 1,
  leftIcon,
  rightIcon,
  onRightIconPress,
  style,
  inputStyle,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { darkMode } = useAppContext();
  const styles = createGlobalStyles(darkMode);
  
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const getInputStyle = () => {
    let inputStyleArray = [styles.input];
    
    if (isFocused) {
      inputStyleArray.push(styles.inputFocused);
    }
    
    if (error) {
      inputStyleArray.push(styles.inputError);
    }
    
    if (disabled) {
      inputStyleArray.push({
        backgroundColor: darkMode ? '#374151' : COLORS.gray100,
        opacity: 0.6,
      });
    }
    
    if (multiline) {
      inputStyleArray.push({
        textAlignVertical: 'top',
        minHeight: numberOfLines * 24,
      });
    }
    
    return inputStyleArray;
  };
  
  return (
    <View style={[style]}>
      {label && (
        <Text style={[styles.inputLabel]}>
          {label}
        </Text>
      )}
      
      <View style={{ position: 'relative' }}>
        {leftIcon && (
          <View style={{
            position: 'absolute',
            left: SPACING.md,
            top: 0,
            bottom: 0,
            justifyContent: 'center',
            zIndex: 1,
          }}>
            {leftIcon}
          </View>
        )}
        
        <TextInput
          style={[
            getInputStyle(),
            leftIcon && { paddingLeft: SPACING.xl + SPACING.sm },
            rightIcon && { paddingRight: SPACING.xl + SPACING.sm },
            inputStyle,
          ]}
          placeholder={placeholder}
          placeholderTextColor={darkMode ? COLORS.gray400 : COLORS.gray400}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry && !showPassword}
          editable={!disabled}
          multiline={multiline}
          numberOfLines={numberOfLines}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
        
        {rightIcon && (
          <TouchableOpacity
            style={{
              position: 'absolute',
              right: SPACING.md,
              top: 0,
              bottom: 0,
              justifyContent: 'center',
              zIndex: 1,
            }}
            onPress={onRightIconPress}
            activeOpacity={0.7}
          >
            {rightIcon}
          </TouchableOpacity>
        )}
        
        {secureTextEntry && (
          <TouchableOpacity
            style={{
              position: 'absolute',
              right: SPACING.md,
              top: 0,
              bottom: 0,
              justifyContent: 'center',
              zIndex: 1,
            }}
            onPress={togglePasswordVisibility}
            activeOpacity={0.7}
          >
            <Text style={{ color: COLORS.gray500, fontSize: 16 }}>
              {showPassword ? '🙈' : '👁️'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      
      {error && (
        <Text style={styles.inputErrorText}>
          {error}
        </Text>
      )}
    </View>
  );
};

export default Input;
