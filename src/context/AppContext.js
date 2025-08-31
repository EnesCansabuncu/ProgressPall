import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [forceUpdate, setForceUpdate] = useState(0);

  // Load data from AsyncStorage on app start
  useEffect(() => {
    loadData();
    loadDarkMode();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [tasksData, habitsData] = await Promise.all([
        AsyncStorage.getItem('tasks'),
        AsyncStorage.getItem('habits'),
      ]);

      if (tasksData) {
        setTasks(JSON.parse(tasksData));
      }
      if (habitsData) {
        setHabits(JSON.parse(habitsData));
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadDarkMode = async () => {
    try {
      const storedDarkMode = await AsyncStorage.getItem('darkMode');
      if (storedDarkMode !== null) {
        setDarkMode(JSON.parse(storedDarkMode));
      }
    } catch (error) {
      console.error('Error loading dark mode:', error);
    }
  };

  // Save tasks to AsyncStorage
  const saveTasks = async (newTasks) => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(newTasks));
      setTasks(newTasks);
    } catch (error) {
      console.error('Error saving tasks:', error);
    }
  };

  // Save habits to AsyncStorage
  const saveHabits = async (newHabits) => {
    try {
      await AsyncStorage.setItem('habits', JSON.stringify(newHabits));
      setHabits(newHabits);
    } catch (error) {
      console.error('Error saving habits:', error);
    }
  };

  // Task operations
  const addTask = async (task) => {
    const newTasks = [...tasks, task];
    await saveTasks(newTasks);
  };

  const updateTask = async (taskId, updates) => {
    const newTasks = tasks.map(task =>
      task.id === taskId ? { ...task, ...updates } : task
    );
    await saveTasks(newTasks);
  };

  const deleteTask = async (taskId) => {
    const newTasks = tasks.filter(task => task.id !== taskId);
    await saveTasks(newTasks);
  };

  const toggleTaskCompletion = async (taskId) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      await updateTask(taskId, { completed: !task.completed });
    }
  };

  // Habit operations
  const addHabit = async (habit) => {
    const newHabits = [...habits, habit];
    await saveHabits(newHabits);
  };

  const updateHabit = async (habitId, updates) => {
    const newHabits = habits.map(habit =>
      habit.id === habitId ? { ...habit, ...updates } : habit
    );
    await saveHabits(newHabits);
  };

  const deleteHabit = async (habitId) => {
    const newHabits = habits.filter(habit => habit.id !== habitId);
    await saveHabits(newHabits);
  };

  const toggleHabitCompletion = async (habitId) => {
    const habit = habits.find(h => h.id === habitId);
    if (habit) {
      const today = new Date().toISOString().split('T')[0];
      const wasCompletedToday = habit.completedToday;
      
      let newStreak = habit.streak;
      let newLongestStreak = habit.longestStreak;
      
      if (!wasCompletedToday) {
        // Mark as completed today
        newStreak += 1;
        if (newStreak > newLongestStreak) {
          newLongestStreak = newStreak;
        }
      } else {
        // Unmark completion (streak breaks)
        newStreak = 0;
      }

      await updateHabit(habitId, {
        completedToday: !wasCompletedToday,
        streak: newStreak,
        longestStreak: newLongestStreak,
        lastCompleted: !wasCompletedToday ? today : null,
      });
    }
  };

  // Reset daily habits (should be called daily)
  const resetDailyHabits = async () => {
    const today = new Date().toISOString().split('T')[0];
    const updatedHabits = habits.map(habit => {
      if (habit.lastCompleted !== today) {
        return {
          ...habit,
          completedToday: false,
        };
      }
      return habit;
    });
    await saveHabits(updatedHabits);
  };

  // Get statistics
  const getStats = () => {
    const completedTasks = tasks.filter(task => task.completed).length;
    const pendingTasks = tasks.filter(task => !task.completed).length;
    const completedHabitsToday = habits.filter(habit => habit.completedToday).length;
    const totalStreak = habits.reduce((sum, habit) => sum + habit.streak, 0);

    return {
      totalTasks: tasks.length,
      completedTasks,
      pendingTasks,
      totalHabits: habits.length,
      completedHabitsToday,
      totalStreak,
    };
  };

  // Dark mode operations
  const toggleDarkMode = useCallback(async () => {
    const newDarkMode = !darkMode;
    try {
      await AsyncStorage.setItem('darkMode', JSON.stringify(newDarkMode));
      console.log('Setting dark mode to:', newDarkMode);
      setDarkMode(newDarkMode);
      
      // Force a re-render by updating a timestamp
      setForceUpdate(prev => prev + 1);
    } catch (error) {
      console.error('Error saving dark mode:', error);
    }
  }, [darkMode]);

  const value = {
    // State
    tasks,
    habits,
    loading,
    darkMode,
    forceUpdate,
    
    // Task operations
    addTask,
    updateTask,
    deleteTask,
    toggleTaskCompletion,
    
    // Habit operations
    addHabit,
    updateHabit,
    deleteHabit,
    toggleHabitCompletion,
    resetDailyHabits,
    
    // Utilities
    getStats,
    loadData,
    toggleDarkMode,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
