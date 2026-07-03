# 🃏 Yu-Gi-Oh! Deck Builder (JavaScript Project)

A dynamic web application that allows users to search Yu-Gi-Oh! cards using the public API, build custom decks, and manage them like a real trading card game deck builder.

This project was built using **vanilla JavaScript**, **Bootstrap**, and the **YGOPRODeck API**.

---

## 🚀 Features

### 🔍 Card Search
- Live search with **debounced input**
- Fetches real-time data from the Yu-Gi-Oh! API
- Displays card details including:
  - Name
  - Description
  - Type
  - Race
  - Attribute
  - ATK / DEF
  - Card image

---

### 🃏 Deck Builder System
- Add cards to a custom deck
- Remove cards from deck
- Maximum of **3 copies per card rule**
- Real-time deck updates

---

### 📊 Deck Statistics
Automatically calculated and displayed:
- Total number of cards
- Number of Monsters, Spells, and Traps
- Average ATK / DEF
- Dynamic update when deck changes

---

### 💾 Import / Export Decks
- Export deck as a **JSON file**
- Import deck from a previously saved JSON file
- File validation with error handling

---

### 🎨 UI / UX Improvements
- Responsive layout using Bootstrap
- Custom Yu-Gi-Oh! styled cards
- Hover effects with smooth animations (CSS-based)
- Conditional rendering:
  - Deck section only shows when cards exist
  - Statistics hidden when deck is empty
- Loading indicators during API calls
- Error handling for invalid searches

---

### ⚡ Performance Features
- Debounced search (prevents excessive API calls)
- Efficient DOM rendering
- State management for current search results and deck

---

## 🧠 Technologies Used

- HTML5
- CSS3
- JavaScript (ES6)
- Bootstrap 5
- Bootstrap Icons
- Fetch API
- FileReader API
- Blob API

---

## 📂 Project Structure (Refactored Version)

The project was later modularized for better maintainability:
