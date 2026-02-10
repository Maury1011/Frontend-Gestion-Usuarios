# 📝 Task Manager – Full Stack

Aplicación web full stack para gestión de tareas con autenticación de usuarios, desarrollada como proyecto de portafolio.

## 🚀 Demo
- Frontend: https://frontend-gestion-usuarios.vercel.app
- Backend: https://backend-gestion-usuarios-production.up.railway.app

## 🧠 Funcionalidades
- Registro e inicio de sesión (JWT)
- CRUD completo de tareas
- Tareas asociadas por usuario
- Protección de rutas
- Persistencia de sesión
- Logout seguro

## 🛠️ Stack Tecnológico

### Frontend
- React
- Vite
- Tailwind CSS v4
- Axios
- React Router

### Backend
- Node.js
- Express
- JWT
- bcrypt
- Sequelize
- PostgreSQL

### Deploy
- Frontend: Vercel
- Backend + DB: Railway

## 📂 Estructura del proyecto

frontend/
├─ src/
│ ├─ pages/
│ ├─ components/
│ ├─ api/
│ └─ App.jsx

backend/
├─ src/
│ ├─ routes/
│ ├─ controllers/
│ ├─ models/
│ └─ middlewares/


## 🔐 Seguridad
- Contraseñas hasheadas con bcrypt
- Autenticación con JWT
- Rutas protegidas en frontend y backend
- Variables sensibles en entorno seguro

## ⚙️ Instalación local

```bash
git clone https://github.com/Maury1011/Frontend-Gestion-Usuarios.git

cd frontend
npm install
npm run dev


