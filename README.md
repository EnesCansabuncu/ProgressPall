# ProgressPal - Task & Habit Tracker

A React Native application for tracking tasks and habits with a beautiful, modern UI.

## 🚀 Features

### ✅ Completed Features
- **Dashboard**: Overview of daily progress, statistics, and quick actions
- **Task Management**: Add, edit, delete, and mark tasks as complete
- **Habit Tracking**: Create habits with streak counting and daily tracking
- **Data Persistence**: All data is saved locally using AsyncStorage
- **Modern UI**: Beautiful, responsive design with smooth animations
- **Navigation**: Tab-based navigation with stack navigation for forms
- **Global State Management**: Context API for centralized data management

### 🔧 Technical Features
- **React Native** with Expo
- **AsyncStorage** for data persistence
- **React Navigation** for routing
- **Context API** for state management
- **Custom Components** (Button, Card, Input)
- **Responsive Design** with theme system

## 📱 Screens

### Dashboard
- Daily progress overview
- Quick action buttons
- Recent activities
- Statistics cards

### Tasks
- Task list with filtering (All, Pending, Completed)
- Add new tasks with categories and priorities
- Mark tasks as complete/incomplete
- Delete tasks with confirmation

### Habits
- Habit list with daily tracking
- Streak counting and longest streak tracking
- Add new habits with categories
- Mark habits as completed for the day

### Profile
- User statistics
- Settings (notifications, dark mode, reminders)
- Account management options

## 🛠️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ProgressPal
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on device/simulator**
   - Press `a` for Android
   - Press `i` for iOS
   - Press `w` for web

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Button.js       # Custom button component
│   ├── Card.js         # Card container component
│   └── Input.js        # Input field component
├── context/            # Global state management
│   └── AppContext.js   # Main context provider
├── navigation/         # Navigation configuration
│   └── AppNavigator.js # Tab and stack navigators
├── screens/           # Application screens
│   ├── Dashboard.js   # Main dashboard screen
│   ├── Tasks.js       # Task management screen
│   ├── Habits.js      # Habit tracking screen
│   ├── Profile.js     # User profile screen
│   ├── AddTask.js     # Add task form
│   └── AddHabit.js    # Add habit form
└── styles/            # Styling and theming
    ├── globalStyles.js # Global style definitions
    └── theme.js       # Color and spacing theme
```

## 🔧 Recent Fixes & Improvements

### ✅ Fixed Issues
1. **Missing Screens**: Created AddTask.js and AddHabit.js screens
2. **Navigation**: Added proper stack navigation for form screens
3. **Data Persistence**: Implemented AsyncStorage for data saving
4. **Global State**: Created AppContext for centralized state management
5. **Real Data**: Replaced mock data with actual data from context
6. **Functionality**: Made all buttons and actions functional

### 🚀 New Features Added
1. **Data Persistence**: All tasks and habits are now saved locally
2. **Streak Tracking**: Automatic streak calculation for habits
3. **Real-time Updates**: UI updates immediately when data changes
4. **Form Validation**: Proper validation for task and habit forms
5. **Delete Confirmation**: Safe deletion with confirmation dialogs
6. **Refresh Functionality**: Pull-to-refresh on all screens

### 🎨 UI/UX Improvements
1. **Consistent Design**: Unified design language across all screens
2. **Better Navigation**: Improved navigation flow and user experience
3. **Loading States**: Proper loading indicators and error handling
4. **Responsive Layout**: Better layout for different screen sizes
5. **Smooth Animations**: Added animations for better user feedback

## 📊 Data Structure

### Task Object
```javascript
{
  id: number,
  title: string,
  description: string,
  priority: 'low' | 'medium' | 'high',
  category: string,
  dueDate: string,
  completed: boolean,
  createdAt: string
}
```

### Habit Object
```javascript
{
  id: number,
  title: string,
  description: string,
  category: string,
  frequency: 'daily' | 'weekly' | 'monthly',
  reminder: string,
  goal: string,
  completedToday: boolean,
  streak: number,
  longestStreak: number,
  createdAt: string,
  lastCompleted: string | null
}
```

## 🔮 Future Enhancements

- [ ] Push notifications for reminders
- [ ] Dark mode theme
- [ ] Data export/import functionality
- [ ] Cloud synchronization
- [ ] Advanced statistics and charts
- [ ] Goal setting and tracking
- [ ] Social features (sharing achievements)
- [ ] Offline mode improvements

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

**ProgressPal** - Track your progress, build better habits! 🚀✨
