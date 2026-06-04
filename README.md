# To-Do App

A simple task management app built with React + Vite.

## Features

- Add new tasks
- Mark tasks as completed
- Edit existing tasks (click the pencil icon or double-click the text)
- Delete tasks
- Filter by All / Active / Completed
- Clear all completed tasks at once
- Progress bar showing completion status

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm

### Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd todo-app
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and go to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## Project Structure

```
src/
  components/
    Header.jsx      - Title, progress bar, and add-task input
    ToDoList.jsx    - Renders the list of tasks using map()
    ToDoItem.jsx    - Individual task with toggle, edit, delete
  styles/
    index.css       - Global styles and CSS variables
    App.module.css
    Header.module.css
    ToDoList.module.css
    ToDoItem.module.css
  App.jsx           - Root component, holds all state
  main.jsx          - Entry point
```

## Tech Stack

- React 18
- Vite 5
- CSS Modules
