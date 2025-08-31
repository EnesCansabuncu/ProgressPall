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

const AddTask = ({ navigation, route }) => {
  const { addTask, darkMode, forceUpdate } = useAppContext();
  
  // Tema değişikliklerinde stilleri optimize et
  const styles = useMemo(() => createGlobalStyles(darkMode), [darkMode, forceUpdate]);
  const colors = useMemo(() => darkMode ? DARK_COLORS : COLORS, [darkMode, forceUpdate]);
  const [task, setTask] = useState({
    title: '',
    description: '',
    priority: 'medium',
    category: 'personal',
    dueDate: new Date().toISOString().split('T')[0],
  });

  const [errors, setErrors] = useState({});

  const priorities = [
    { key: 'low', label: 'Düşük', color: colors.success },
    { key: 'medium', label: 'Orta', color: colors.warning },
    { key: 'high', label: 'Yüksek', color: colors.error },
  ];

  const categories = [
    { key: 'personal', label: 'Kişisel', icon: '👤' },
    { key: 'work', label: 'İş', icon: '💼' },
    { key: 'health', label: 'Sağlık', icon: '🏃‍♂️' },
    { key: 'study', label: 'Çalışma', icon: '📚' },
    { key: 'shopping', label: 'Alışveriş', icon: '🛒' },
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!task.title.trim()) {
      newErrors.title = 'Görev başlığı gereklidir';
    }

    if (task.title.length > 100) {
      newErrors.title = 'Başlık 100 karakterden uzun olamaz';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    const newTask = {
      id: Date.now(),
      ...task,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    // Global state'e ekleme yapılıyor
    await addTask(newTask);

    Alert.alert(
      'Başarılı',
      'Görev başarıyla eklendi!',
      [
        {
          text: 'Tamam',
          onPress: () => navigation.goBack(),
        },
      ]
    );
  };

  const handleCancel = () => {
    if (task.title || task.description) {
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
        key={`addtask-${darkMode ? 'dark' : 'light'}-${forceUpdate}`} // Force re-render on theme change
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleCancel}>
            <Text style={{ color: colors.primary, fontSize: 16 }}>İptal</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Yeni Görev</Text>
          <TouchableOpacity onPress={handleSave}>
            <Text style={{ 
              color: task.title.trim() ? colors.primary : colors.gray400, 
              fontSize: 16,
              fontWeight: '600'
            }}>
              Kaydet
            </Text>
          </TouchableOpacity>
        </View>

        {/* Task Title */}
        <Card style={{ marginBottom: SPACING.lg }}>
          <Input
            label="Görev Başlığı"
            placeholder="Görev başlığını girin..."
            value={task.title}
            onChangeText={(text) => {
              setTask({ ...task, title: text });
              if (errors.title) {
                setErrors({ ...errors, title: null });
              }
            }}
            error={errors.title}
            maxLength={100}
          />
        </Card>

        {/* Task Description */}
        <Card style={{ marginBottom: SPACING.lg }}>
          <Input
            label="Açıklama (Opsiyonel)"
            placeholder="Görev açıklamasını girin..."
            value={task.description}
            onChangeText={(text) => setTask({ ...task, description: text })}
            multiline
            numberOfLines={4}
            maxLength={500}
          />
        </Card>

        {/* Priority Selection */}
        <Card style={{ marginBottom: SPACING.lg }}>
          <Text style={styles.subtitle}>Öncelik</Text>
          <View style={{ marginTop: SPACING.md }}>
            {priorities.map((priority) => (
              <TouchableOpacity
                key={priority.key}
                style={[
                  styles.row,
                  {
                    padding: SPACING.md,
                    borderRadius: 8,
                    marginBottom: SPACING.sm,
                    backgroundColor: task.priority === priority.key 
                      ? colors.primary + '20' 
                      : colors.gray50,
                    borderWidth: 2,
                    borderColor: task.priority === priority.key 
                      ? priority.color 
                      : 'transparent',
                  },
                ]}
                onPress={() => setTask({ ...task, priority: priority.key })}
                activeOpacity={0.7}
              >
                <View style={{
                  width: 12,
                  height: 12,
                  borderRadius: 6,
                  backgroundColor: priority.color,
                  marginRight: SPACING.md,
                }} />
                <Text style={[
                  styles.bodyText,
                  {
                    fontWeight: task.priority === priority.key ? '600' : '400',
                    color: task.priority === priority.key ? colors.primary : colors.textSecondary,
                  },
                ]}>
                  {priority.label}
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
                    backgroundColor: task.category === category.key 
                      ? colors.primary + '20' 
                      : colors.gray50,
                    borderWidth: 2,
                    borderColor: task.category === category.key 
                      ? colors.primary 
                      : 'transparent',
                  },
                ]}
                onPress={() => setTask({ ...task, category: category.key })}
                activeOpacity={0.7}
              >
                <Text style={{ fontSize: 20, marginRight: SPACING.md }}>
                  {category.icon}
                </Text>
                <Text style={[
                  styles.bodyText,
                  {
                    fontWeight: task.category === category.key ? '600' : '400',
                    color: task.category === category.key ? colors.primary : colors.textSecondary,
                  },
                ]}>
                  {category.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Card>

        {/* Due Date */}
        <Card style={{ marginBottom: SPACING.lg }}>
          <Text style={styles.subtitle}>Son Tarih</Text>
          <TouchableOpacity
            style={{
              padding: SPACING.md,
              borderWidth: 1,
              borderColor: colors.gray300,
              borderRadius: 8,
              marginTop: SPACING.md,
            }}
            onPress={() => {
              // Burada date picker açılacak
              Alert.alert('Bilgi', 'Tarih seçici yakında eklenecek!');
            }}
            activeOpacity={0.7}
          >
            <Text style={styles.bodyText}>
              {new Date(task.dueDate).toLocaleDateString('tr-TR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </Text>
          </TouchableOpacity>
        </Card>

        {/* Action Buttons */}
        <View style={{ marginTop: SPACING.lg }}>
          <Button
            title="Görevi Kaydet"
            onPress={handleSave}
            disabled={!task.title.trim()}
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

export default AddTask;
