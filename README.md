# To-Do Application Setup

## Backend (Django REST Framework)

1. **Navigate to the Backend Directory:**
   ```bash
   cd backend
   ```

2. **Create a Virtual Environment:**
   ```bash
   python -m venv todo_env
   source venv/bin/activate  # On macOS/Linux
   venv\Scripts\activate    # On Windows
   ```

3. **Install Dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Apply Migrations:**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

5. **Start the Server:**
   ```bash
   python manage.py runserver
   ```

- Backend will run at: `http://127.0.0.1:8000/`

---

## Frontend (Next.js)

1. **Navigate to the Frontend Directory:**
   ```bash
   cd frontend
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Start the Development Server:**
   ```bash
   npm run dev
   ```

- Frontend will run at: `http://localhost:3000/`

---

## Environment Variables

### Backend (`.env`):
```
SECRET_KEY=your_secret_key
DEBUG=True
ALLOWED_HOSTS=127.0.0.1,localhost
```

### Frontend (`.env.local`):
```
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api/tasks/
```

