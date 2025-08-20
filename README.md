## 🛍️ YagoutPay Store


🚀 Quick Start

Prerequisites

Node.js 16+

Python 3.8+

Git

A modern, responsive e-commerce platform with seamless YagoutPay payment integration


✨ Features

Feature	Description	Status

🛒 Shopping Cart	Add, remove, and manage products	✅ Implemented

💳 YagoutPay Integration	Secure payment processing	✅ Implemented


🔒 Secure Transactions	AES encryption for payment data	✅ Implemented


🎨 Modern UI	Beautiful, user-friendly interface	✅ Implemented


Installation

# 1. Clone the repository

git clone https://github.com/Liladet/YagoutPay.git

cd YagoutPay

# 2. Setup Backend

cd backend

python -m venv venv

# Activate Virtual Environment
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# 3. Setup Frontend
cd ../frontend

npm install

Environment Setup:

MERCHANT_ID=your_merchant_id

MERCHANT_KEY=your_base64_encoded_key

FLASK_ENV=development

Update Payment URLs in backend/generate_request.py:

python

YAGOUTPAY_URL = "https://uatcheckout.yagoutpay.com/..."

SUCCESS_URL = "https://your-ngrok.ngrok-free.app/success"

FAILURE_URL = "https://your-ngrok.ngrok-free.app/failure"

Running the Application

bash

 Terminal 1 - Backend Server

cd backend

python server.py


 Terminal 2 - Frontend Development

cd frontend
npm start

 Terminal 3 - Ngrok Tunneling

ngrok http ..

  Update callback URLs with ngrok URL

</div>


📄 License

This project is licensed under the MIT License.

🙏 Acknowledgments
YagoutPay for payment gateway integration


📞 Support
If you have any questions or need help:

email:lilaalex94@gmail.com


<div align="center">
⭐ Star this repo if you found it helpful!


Built with ❤️ using React, TypeScript, and Flask

</div>
