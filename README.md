# 🛍️ YagoutPay Store  

A modern, responsive **e-commerce platform** with seamless **YagoutPay payment integration**.  
Frontend built with **React + TypeScript + TailwindCSS**.  
Backend powered by **Flask (Python)**. 

[![React](https://img.shields.io/badge/React-18-blue?logo=react)](https://react.dev/)  
[![TypeScript](https://img.shields.io/badge/TypeScript-4.x-3178C6?logo=typescript)](https://www.typescriptlang.org/)  
[![Flask](https://img.shields.io/badge/Flask-2.3.3-black?logo=flask)](https://flask.palletsprojects.com/)  
[![Python](https://img.shields.io/badge/Python-3.8+-3776AB?logo=python)](https://www.python.org/)  
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)  
[![Ngrok](https://img.shields.io/badge/Ngrok-Tunnel-orange)](https://ngrok.com/) 
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)  

---

## 🚀 Quick Start  

### ✅ Prerequisites  
- [React](https://react.com/)
- [Node.js](https://nodejs.org/) 16+  
- [Python](https://www.python.org/) 3.8+
- [Flask](https://flask.com)
- [Tailwindcss](https://tailwindcss.com)  
- [Git](https://git-scm.com/)  
- [Ngrok](https://ngrok.com/) (for tunneling callbacks)

---

## ✨ Features  

| Feature             | Description                                | Status       |
|---------------------|--------------------------------------------|--------------|
| 🛒 **Shopping Cart** | Add, remove, and manage products           | ✅ Implemented |
| 💳 **YagoutPay**     | Secure payment processing integration      | ✅ Implemented |
| 🔒 **Encryption**    | AES encryption for transaction data        | ✅ Implemented |
| 🎨 **Modern UI**     | User-friendly, responsive design           | ✅ Implemented |

---

## ⚡ Installation  

### 1️⃣ Clone the Repository  
```bash
git clone https://github.com/Liladet/YagoutPay.git
cd YagoutPay

```
### 2️⃣ Setup Backend
```bash
cd backend
python -m venv venv

```
### Activate Virtual Environment:

Windows:
```bash
venv\Scripts\activate

```
Mac/Linux:
```bash
source venv/bin/activate
```
Install dependencies:
```bash
pip install -r requirements.txt
```

### 3️⃣ Setup Frontend
```bash
cd ../frontend
npm install

```
➕ Install TailwindCSS
```npm
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

```
Configure tailwind.config.js:
```bash
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```
Update src/index.css:
```bash
@tailwind base;
@tailwind components;
@tailwind utilities;
```
Update backend/generate_request.py with your URLs:

```bash
Merchant_Id = "your_url"
YAGOUTPAY_URL = "https://uatcheckout.yagoutpay.com/..."
SUCCESS_URL = "https://your-ngrok-id.ngrok-free.app/success"
FAILURE_URL = "https://your-ngrok-id.ngrok-free.app/failure"

```
### ▶️ Running the Application

Open 3 terminals:

🖥️ Terminal 1 – Backend Server
```bash
cd backend
python server.py
```
🌐 Terminal 2 – Frontend Development
```bash
cd frontend
npm start
```
🔗 Terminal 3 – Ngrok Tunneling
```bash
ngrok http 5000
```
Update your success and failure callback URLs in generate_request.py with the ngrok link.

### 📄 License

This project is licensed under the MIT License.

### 🙏 Acknowledgments

YagoutPay for the payment gateway integration

### 📞 Support

💌 Email: lilaalex94@gmail.com

⭐ Star this repo if you found it helpful!

Built with ❤️ using React, TypeScript, and Flask
