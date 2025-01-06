# ToDo Application: Organize Your Day with Ease

## Project Description

### What Your Application Does
This ToDo application helps users organize their daily tasks effectively. Features include:
- Add new tasks with a simple text input
- Mark tasks as completed with visual strike-through
- Delete tasks no longer needed
- Track total completed tasks

The app enhances productivity through a clean, intuitive interface for managing to-do items.

### Technologies Used
- **Frontend**: HTML, CSS, JS for responsive, browser-accessible interface
- **Backend**: Spring Boot for Java integration and RESTful APIs
- **Database**: MongoDB for efficient task storage and scalability

### Challenges and Future Features

**Challenges Faced:**
- Seamless frontend-backend communication
- Mobile-responsive UI with lightweight code

**Future Features:**
- Picture and document attachments
- User login and authentication

## Installation and Setup

### Prerequisites
1. IDE (IntelliJ IDEA/Eclipse) for Java development
2. MongoDB Compass for database setup

### Clone and Setup Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/ShreyPinnada/TO-DO.git
   ```

2. Open in IDE

3. Install dependencies from `pom.xml`

4. Set up MongoDB Compass:
   - Database Name: `todo_db`
   - Collection Name: `tasks`
   - Fields:
     - `task_name` (String)
     - `description` (String)
     - `completed` (Boolean)
     - `id` (Auto-generated)

### Running the Application
- **Frontend**: Open `index.html` in browser
- **Backend**: Run `backend/todo/src/main/java/com/example/todo/TodoApplication.java`

## Usage Guide

1. **Add Task**
   - Enter task in text box
   - Click "+" icon

2. **Mark Task Complete**
   - Click green check button on task card

3. **Delete Task**
   - Click red delete button on task card

4. **Progress Tracking**
   - View total completed tasks counter

## Wrap Up
This ToDo application provides efficient task organization with completion tracking and responsive design. Future enhancements will include document attachments and user authentication for increased versatility.

Feel free to explore and contribute to the repository!
