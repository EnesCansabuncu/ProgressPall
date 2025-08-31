import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createGlobalStyles } from '../../styles/globalStyles';
import { COLORS, DARK_COLORS, SPACING } from '../../styles/theme';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import { useAppContext } from '../context/AppContext';

const AddHabit = ({ navigation, route }) => {
  const { addHabit, darkMode, forceUpdate } = useAppContext();
  
  // Tema değişikliklerinde stilleri optimize et
  const styles = useMemo(() => createGlobalStyles(darkMode), [darkMode, forceUpdate]);
  const colors = useMemo(() => darkMode ? DARK_COLORS : COLORS, [darkMode, forceUpdate]);
  const [habit, setHabit] = useState({
    title: '',
    description: '',
    category: 'personal',
    frequency: 'daily',
    reminder: '09:00',
    goal: '1',
  });

  const [errors, setErrors] = useState({});

  const frequencies = [
    { key: 'daily', label: 'Günlük', icon: '📅' },
    { key: 'weekly', label: 'Haftalık', icon: '📆' },
    { key: 'monthly', label: 'Aylık', icon: '🗓️' },
  ];

  const categories = [
    { key: 'health', label: 'Sağlık', icon: '🏃‍♂️' },
    { key: 'personal', label: 'Kişisel', icon: '👤' },
    { key: 'work', label: 'İş', icon: '💼' },
    { key: 'study', label: 'Çalışma', icon: '📚' },
    { key: 'finance', label: 'Finans', icon: '💰' },
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!habit.title.trim()) {
      newErrors.title = 'Alışkanlık başlığı gereklidir';
    }

    if (habit.title.length > 100) {
      newErrors.title = 'Başlık 100 karakterden uzun olamaz';
    }

    if (habit.goal && (isNaN(habit.goal) || parseInt(habit.goal) <= 0)) {
      newErrors.goal = 'Geçerli bir hedef sayısı girin';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    const newHabit = {
      id: Date.now(),
      ...habit,
      completedToday: false,
      streak: 0,
      longestStreak: 0,
      createdAt: new Date().toISOString(),
      lastCompleted: null,
    };

    // Global state'e ekleme yapılıyor
    await addHabit(newHabit);

    Alert.alert(
      'Başarılı',
      'Alışkanlık başarıyla eklendi!',
      [
        {
          text: 'Tamam',
          onPress: () => navigation.goBack(),
        },
      ]
    );
  };

  const handleCancel = () => {
    if (habit.title || habit.description) {
      Alert.alert(
        'Değişiklikleri Kaydet',
        'Kaydedilmemiş değişiklikleriniz var. Çıkmak istediğinizden emin misiniz?',
        [
          { text: 'İptal', style: 'cancel' },
          { text: 'Çık', style: 'destructive', onPress: () => navigation.goBack() },
        ]
      );
    } else {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <ScrollView
        style={[styles.container, { backgroundColor: colors.background }]}
        contentContainerStyle={{
          paddingHorizontal: SPACING.md,
          paddingVertical: SPACING.lg,
          paddingBottom: SPACING.xl + 120, // Tab bar için extra padding
        }}
        showsVerticalScrollIndicator={false}
        key={`addhabit-${darkMode ? 'dark' : 'light'}-${forceUpdate}`} // Force re-render on theme change
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleCancel}>
            <Text style={{ color: colors.primary, fontSize: 16 }}>İptal</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Yeni Alışkanlık</Text>
          <TouchableOpacity onPress={handleSave}>
            <Text style={{ 
              color: habit.title.trim() ? colors.primary : colors.gray400, 
              fontSize: 16,
              fontWeight: '600'
            }}>
              Kaydet
            </Text>
          </TouchableOpacity>
        </View>

        {/* Habit Title */}
        <Card style={{ marginBottom: SPACING.lg }}>
          <Input
            label="Alışkanlık Başlığı"
            placeholder="Alışkanlık başlığını girin..."
            value={habit.title}
            onChangeText={(text) => {
              setHabit({ ...habit, title: text });
              if (errors.title) {
                setErrors({ ...errors, title: null });
              }
            }}
            error={errors.title}
            maxLength={100}
          />
        </Card>

        {/* Habit Description */}
        <Card style={{ marginBottom: SPACING.lg }}>
          <Input
            label="Açıklama (Opsiyonel)"
            placeholder="Alışkanlık açıklamasını girin..."
            value={habit.description}
            onChangeText={(text) => setHabit({ ...habit, description: text })}
            multiline
            numberOfLines={4}
            maxLength={500}
          />
        </Card>

        {/* Frequency Selection */}
        <Card style={{ marginBottom: SPACING.lg }}>
          <Text style={styles.subtitle}>Sıklık</Text>
          <View style={{ marginTop: SPACING.md }}>
            {frequencies.map((frequency) => (
              <TouchableOpacity
                key={frequency.key}
                style={[
                  styles.row,
                  {
                    padding: SPACING.md,
                    borderRadius: 8,
                    marginBottom: SPACING.sm,
                    backgroundColor: habit.frequency === frequency.key 
                      ? colors.primary + '20' 
                      : colors.gray50,
                    borderWidth: 2,
                    borderColor: habit.frequency === frequency.key 
                      ? colors.primary 
                      : 'transparent',
                  },
                ]}
                onPress={() => setHabit({ ...habit, frequency: frequency.key })}
                activeOpacity={0.7}
              >
                <Text style={{ fontSize: 20, marginRight: SPACING.md }}>
                  {frequency.icon}
                </Text>
                <Text style={[
                  styles.bodyText,
                  {
                    fontWeight: habit.frequency === frequency.key ? '600' : '400',
                    color: habit.frequency === frequency.key ? colors.primary : colors.textSecondary,
                  },
                ]}>
                  {frequency.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Card>

        {/* Category Selection */}
        <Card style={{ marginBottom: SPACING.lg }}>
          <Text style={styles.subtitle}>Kategori</Text>
          <View style={{ marginTop: SPACING.md }}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.key}
                style={[
                  styles.row,
                  {
                    padding: SPACING.md,
                    borderRadius: 8,
                    marginBottom: SPACING.sm,
                    backgroundColor: habit.category === category.key 
                      ? colors.primary + '20' 
                      : colors.gray50,
                    borderWidth: 2,
                    borderColor: habit.category === category.key 
                      ? colors.primary 
                      : 'transparent',
                  },
                ]}
                onPress={() => setHabit({ ...habit, category: category.key })}
                activeOpacity={0.7}
              >
                <Text style={{ fontSize: 20, marginRight: SPACING.md }}>
                  {category.icon}
                </Text>
                <Text style={[
                  styles.bodyText,
                  {
                    fontWeight: habit.category === category.key ? '600' : '400',
                    color: habit.category === category.key ? colors.primary : colors.textSecondary,
                  },
                ]}>
                  {category.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Card>

        {/* Goal Setting */}
        <Card style={{ marginBottom: SPACING.lg }}>
          <Input
            label="Günlük Hedef"
            placeholder="Hedef sayısını girin (örn: 1, 5, 10)"
            value={habit.goal}
            onChangeText={(text) => {
              setHabit({ ...habit, goal: text });
              if (errors.goal) {
                setErrors({ ...errors, goal: null });
              }
            }}
            error={errors.goal}
            keyboardType="numeric"
          />
          <Text style={[styles.caption, { marginTop: SPACING.xs }]}>
            Bu alışkanlığı günde kaç kez yapmayı hedefliyorsunuz?
          </Text>
        </Card>

        {/* Reminder Time */}
        <Card style={{ marginBottom: SPACING.lg }}>
          <Text style={styles.subtitle}>Hatırlatma Saati</Text>
          <TouchableOpacity
            style={{
              padding: SPACING.md,
              borderWidth: 1,
              borderColor: colors.gray300,
              borderRadius: 8,
              marginTop: SPACING.md,
            }}
            onPress={() => {
              // Burada time picker açılacak
              Alert.alert('Bilgi', 'Saat seçici yakında eklenecek!');
            }}
            activeOpacity={0.7}
          >
            <Text style={styles.bodyText}>
              ⏰ {habit.reminder}
            </Text>
          </TouchableOpacity>
          <Text style={[styles.caption, { marginTop: SPACING.xs }]}>
            Bu saatte hatırlatma alacaksınız
          </Text>
        </Card>

        {/* Action Buttons */}
        <View style={{ marginTop: SPACING.lg }}>
          <Button
            title="Alışkanlığı Kaydet"
            onPress={handleSave}
            disabled={!habit.title.trim()}
            style={{ marginBottom: SPACING.md }}
          />
          <Button
            title="İptal"
            variant="outline"
            onPress={handleCancel}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddHabit;
