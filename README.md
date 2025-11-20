# 🎵 Music Player

A clean and responsive **React Music Player** with playlist support.
Built to practice state management, context, and localStorage persistence.

<img width="1900" height="891" alt="image" src="https://github.com/user-attachments/assets/ae93635b-1e39-4f00-8678-59c08696602e" />
<img width="1900" height="891" alt="image" src="https://github.com/user-attachments/assets/43c9c866-43c0-49fe-90f0-8d715c5b08a0" />

---

## ✨ Features

* Play / Pause / Previous / Next controls
* Track progress & duration display
* Volume control with slider
* List of all songs
* Create and manage playlists
* **Data persists using localStorage**
* **Automatic sync across browser tabs**

## 🧠 Tech Used

* React + Hooks
* Context API
* localStorage (with safe JSON parsing)
* Custom logic for tab-change sync
* CSS for layout and styling

## 📁 Project Structure

```
src/
  components/
  context/
  helpers/
  data/
```

* `MusicProvider` handles all global state
* `safeParse` prevents localStorage JSON crashes
* UI uses simple reusable components

## ▶️ Running the Project

```bash
npm install
npm run dev
```

Open the app in your browser and start playing tracks.

## 📌 Notes

* Playlists automatically save to localStorage.
* Changes in one tab update instantly in other tabs.
* Perfect little practice project for learning React state patterns.
