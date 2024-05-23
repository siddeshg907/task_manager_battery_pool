# Task Management App
A full stack app in which user can manage the tasks. Every user can create his own tasks and also update and delete the task.

## Deployed Link
**Frontend** https://comforting-toffee-6e83aa.netlify.app/

**Backend** https://backend-bp-1.onrender.com

## Use this credentials to see the flow
email: sid@gmail.com
password: 12345678

## Tech Stack:

### Frontend:
- React.Js
- Redux
- React-redux
- Redux toolkit
- Material-UI
- React-router-dom

### Backend:

- Node.js
- Express
- Mongoose
- Mongodb Atlas
- Cors
- dotenv
- bcrypt
- JSON Web Token


## Setup Instructions
1. Clone the repository from GitHub.
2. Navigate to the project directory in the terminal.
3. Install dependencies:
```bash
npm install
```
4. Start the frontend development server:
```bash
npm run start
```
5. Start the backend server:
```bash
npm run server
```
6. Access the application in your web browser.


## Frontend

### Features Implemented
1. *Signin & Signup*
   - User authentication with email and password
   - Redirect to Signin page on successful creating an account

2. *Main Page
   - You will see the get started instruction provided with welcome
   - Click on LET'S ADD TASKS!! button and get redirected to Home Page

3. *Tasks Pages/Home Page*
   - You can see the *Add Task page* by default and need to add tasks by provided form. 
   - Use Add task button to create a new task
   - See all the Tasks in *Tasks page* which can be accessed from Navbar
   - *Task page* will show all the task which are not completed
   - Their is option buttons in table to *edit,delete and mark as complete* the task.
   - The *Edit button* will pop up the from to edit the Task
   - The *Delete button* will Delete the Task from Data
   - The *Mark as Completed* will mark the Task is Completed and the Task will be not seen anymore in Task Page.
   - The Tasks which are Completed will be rendered in *Completed Task Page*,which can also be access from Navbar.
   - The *Completed Task Page* will have all completed task related to specific user and the user can also make it back to task not completed, and also delete the task from their.

3. *Navbar*
   - Navbar of Home page contains Three tabs to get access of the Task pages.
   - The user profile is also rendered on navbar.
   - The Logout button is also Their in Navbar.

3. *Download in PDF*
   - Task page also contains the download button to download the data in PDF.
   - The button is just close to headings of Task pages (its download icon )


## Backend

### APIs Developed
1. *Auth Flow*
   - User Schema: name, email, password, profile
   - *Endpoints:*
     - users/register
     - users/login 

2. *Tasks CRUD*
   - Schema: title, description, dueDate, status,priority, imageURL, userID
   - *Endpoints:*
     - /tasks : get all tasks 
     - tasks/add : create new task
     - tasks//update/:id : update task by id
     - tasks//delete/:id : delete task by id 
   


## Screenshots

**Main Page-1**
![Main Page-1](/frontend/src/Images/Main%20page%201.png)

**Signin Page**
![Signin Page](/frontend/src/Images/Sign%20in%20page.png)

**SignUp Page**
![SignUp Page](/frontend/src/Images/Sign%20up%20page.png)

**Main Page-2**
![Main Page-2](/frontend/src/Images/Main%20page%202.png)

**Add task Page**
![ADD Task Page](/frontend/src/Images/ADD%20task%20page.png)

**Tasks Page**
![Tasks Page](/frontend/src/Images/Tasks%20page.png)

**Completed Task Page**
![Completed Tasks Page](/frontend/src/Images/Completed%20Task%20page.png)

**Downloaded PDF**
![Downloaded PDF](/frontend/src/Images/Downloaded%20PDF.png)
   
   