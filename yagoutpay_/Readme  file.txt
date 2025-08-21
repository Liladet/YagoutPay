🛍️ YagoutPay E-Commerce Store
A modern, responsive e-commerce platform with integrated YagoutPay payment processing. Built with React TypeScript frontend and Flask Python backend.


✨ Features
🛒 Shopping Cart - Add, remove, and manage products

💳 YagoutPay Integration - Secure payment processing

📱 Responsive Design - Mobile-friendly interface

👤 Customer Management - Form validation and data handling

🔒 Secure Transactions - AES encryption for payment data

⚡ Real-time Updates - Instant cart updates

🏗️ Architecture
text
yagoutpay-store/
├── 📁 backend/ # Flask Python application
│ ├── server.py # Main server file
│ ├── generate_request.py # Payment request generation
│ ├── requirements.txt # Python dependencies
│ └── 📁 templates/ # HTML templates
│ ├── success.html # Payment success page
│ └── failure.html # Payment failure page
│
└── 📁 frontend/ # React TypeScript application
├── src/
│ ├── 📁 components/ # React components
│ │ ├── ProductList.tsx
│ │ ├── ProductCard.tsx
│ │ ├── Cart.tsx
│ │ ├── PaymentButton.tsx
│ │ └── CustomerInfoForm.tsx
│ ├── 📁 context/ # State management
│ │ └── CartContext.tsx
│ ├── 📁 types/ # TypeScript definitions
│ │ └── index.ts
│ ├── 📁 data/ # Sample data
│ │ └── products.ts
│ └── App.tsx # Main App component
├── package.json # Node.js dependencies
└── public/ # Static assets
🚀 Quick Start
Prerequisites
Node.js 16+

Python 3.8+

npm or yarn

pip

cd the_doc

# Setup backend

cd backend
python -m venv venv

# On Windows

venv\Scripts\activate

# On Mac/Linux

source venv/bin/activate

pip install -r requirements.txt

# Setup frontend

cd ../frontend
npm install

Update Payment URLs in backend/generate_request.py:

python
YAGOUTPAY_URL = "https://uatcheckout.yagoutpay.com/..."
SUCCESS_URL = "https://your-ngrok.ngrok-free.app/success"
FAILURE_URL = "https://your-ngrok.ngrok-free.app/failure" 

# Terminal 1 - Start Backend

cd backend
python server.py

# Server runs on http://localhost:-----

# Terminal 2 - Start Frontend

cd frontend
npm start

# Frontend runs on http://localhost:-----

# Terminal 3 - Start Ngrok (for payment callbacks)

ngrok http 5000

# Copy the ngrok URL and update in generate_request.py

⚙️ Configuration
Merchant Setup
Get Credentials from YagoutPay:

Merchant ID

Base64-encoded Merchant Key

Aggregator ID

Update backend/generate_request.py:

python
MERCHANT_ID = "your_actual_merchant_id"
MERCHANT_KEY = base64.b64decode("your_actual_base64_key")

🎯 Usage Flow
Browse Products - Users view products on the main page

Add to Cart - Click "Add to Cart" on desired products

Review Cart - View cart contents and quantities

Checkout - Enter customer information

Payment - Redirect to YagoutPay gateway

Confirmation - Return to success/failure page

bash

# Ensure Flask-CORS is installed

pip install flask-cors
Ngrok Disconnections

bash

# Restart ngrok and update URLs

ngrok http 5000
Payment Failures

Verify merchant credentials

Check ngrok URL matches callback URLs

###to run

# Frontend 

npm start

#backend

python server.py

Update the following in generate_request.py:

python
MERCHANT_ID = "your_merchant_id"
MERCHANT_KEY = base64.b64decode("your_merchant_key")
AGGREGATOR_ID = "yagout"
YAGOUTPAY_URL = "yagout_url"

🔒 Security Features
AES-256 encryption for payment data

CORS protection

Input validation and sanitization

Secure environment variables

HTTPS enforcement for production
🤝 Support
For issues and questions:
email-lilaalex94@gmail.com

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.
