\# Kiran's Full-Stack To-Do App



A full-stack task-management application built by Kiran with React, Django REST Framework, and MySQL.



\## Features



\- Create tasks with a title, optional description, and optional due date

\- View all tasks

\- Edit existing tasks

\- Mark tasks as complete or incomplete

\- Delete tasks with confirmation

\- Incomplete tasks appear before completed tasks

\- Persistent MySQL storage

\- Responsive React interface

\- Django REST API with validation



\## Technology stack



| Layer | Technology |

|---|---|

| Frontend | React and Vite |

| API requests | Axios |

| Backend | Django 5.2 LTS |

| REST API | Django REST Framework |

| Database | MySQL 8.0+ |

| Database connector | PyMySQL |



\## Project structure



```text

kiran-todo-app/

├── .gitignore

├── README.md

├── backend/

│   ├── .env                    # Private; do not commit

│   ├── config/

│   │   ├── settings.py

│   │   ├── urls.py

│   │   └── \_\_init\_\_.py

│   ├── tasks/

│   │   ├── models.py

│   │   ├── serializers.py

│   │   ├── urls.py

│   │   └── views.py

│   ├── manage.py

│   └── requirements.txt

└── frontend/

&#x20;   ├── .env

&#x20;   ├── src/

&#x20;   │   ├── components/

&#x20;   │   ├── services/api.js

&#x20;   │   ├── App.jsx

&#x20;   │   ├── App.css

&#x20;   │   └── index.css

&#x20;   └── package.json

```



\## Prerequisites



Install these before starting:



\- Python 3.10 or later

\- Node.js 20 or later

\- MySQL 8.0 or later

\- Git, if you plan to publish the project



\## Backend setup (Windows)



\### 1. Create and activate a virtual environment



From the project root:



```powershell

py -m venv .venv

\& ".\\.venv\\Scripts\\Activate.ps1"

```



If PowerShell blocks the activation script:



```powershell

Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass

\& ".\\.venv\\Scripts\\Activate.ps1"

```



\### 2. Install backend packages



```powershell

cd backend

python -m pip install --upgrade pip

python -m pip install -r requirements.txt

```



\### 3. Create the MySQL database



Log in to MySQL:



```powershell

mysql -u root -p

```



Run the following commands. Choose a secure password before running the `CREATE USER` command.



```sql

CREATE DATABASE kiran\_todo\_db

CHARACTER SET utf8mb4

COLLATE utf8mb4\_unicode\_ci;



CREATE USER 'kiran\_todo\_user'@'localhost'

IDENTIFIED BY 'ChooseAStrongPassword';



GRANT ALL PRIVILEGES ON kiran\_todo\_db.\* TO 'kiran\_todo\_user'@'localhost';



FLUSH PRIVILEGES;

EXIT;

```



\### 4. Add environment variables



Create `backend/.env`:



```env

SECRET\_KEY=replace-with-a-long-random-secret-key

DEBUG=True



DB\_NAME=kiran\_todo\_db

DB\_USER=kiran\_todo\_user

DB\_PASSWORD=replace-with-your-mysql-password

DB\_HOST=127.0.0.1

DB\_PORT=3306

```



Never commit `.env` or share its values.



\### 5. Create database tables and run Django



```powershell

python manage.py migrate

python manage.py runserver

```



The API runs at `http://127.0.0.1:8000/`.



\## Frontend setup



Open another PowerShell window:



```powershell

cd "$HOME\\Documents\\kiran-todo-app\\frontend"

npm install

npm.cmd run dev

```



`npm.cmd` avoids a common Windows PowerShell execution-policy issue. The React app runs at `http://localhost:5173/`.



\## API reference



| Method | Endpoint | Purpose |

|---|---|---|

| `GET` | `/api/tasks/` | List all tasks |

| `POST` | `/api/tasks/` | Create a task |

| `GET` | `/api/tasks/<id>/` | Retrieve one task |

| `PATCH` | `/api/tasks/<id>/` | Update part of a task |

| `PUT` | `/api/tasks/<id>/` | Replace a task |

| `DELETE` | `/api/tasks/<id>/` | Delete a task |



Example create request body:



```json

{

&#x20; "title": "Finish Project 2",

&#x20; "description": "Test the complete application",

&#x20; "completed": false,

&#x20; "due\_date": "2026-12-01"

}

```



\## Manual testing checklist



1\. Start Django and React.

2\. Open `http://localhost:5173/`.

3\. Add a task and verify it appears.

4\. Refresh the page; verify the task remains.

5\. Edit the task and save changes.

6\. Mark the task complete and incomplete.

7\. Delete the task and confirm it disappears.

8\. Visit `http://127.0.0.1:8000/api/tasks/` to inspect the API response.



\## Production deployment overview



Deploy the frontend and backend as separate services.



\### Backend



1\. Create a production MySQL database and user.

2\. Set environment variables on the hosting platform:



```env

DEBUG=False

SECRET\_KEY=a-long-unique-production-secret

DB\_NAME=production\_database\_name

DB\_USER=production\_database\_user

DB\_PASSWORD=production\_database\_password

DB\_HOST=production\_database\_host

DB\_PORT=3306

ALLOWED\_HOSTS=api.yourdomain.com

CORS\_ALLOWED\_ORIGINS=https://yourdomain.com

```



3\. Install dependencies and run migrations:



```bash

python -m pip install -r requirements.txt

python manage.py migrate

```



4\. Use a production WSGI server such as Gunicorn on Linux:



```bash

pip install gunicorn

gunicorn config.wsgi:application

```



\### Frontend



1\. Create `frontend/.env.production`:



```env

VITE\_API\_URL=https://api.yourdomain.com/api/

```



2\. Build the production frontend:



```bash

npm install

npm run build

```



3\. Upload the generated `frontend/dist` folder to a static hosting provider such as Netlify, Vercel, GitHub Pages, or an Nginx web server.



\## Security notes



\- Keep `.env` private.

\- Never commit database passwords or `SECRET\_KEY`.

\- Set `DEBUG=False` in production.

\- Use a unique, strong database password in production.

\- Restrict `ALLOWED\_HOSTS` and `CORS\_ALLOWED\_ORIGINS` to your real domains.

