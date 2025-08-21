from flask import Flask, Response, jsonify, request, render_template
from flask_cors import CORS
from generate_request import generate_request
import base64
from Crypto.Cipher import AES
from Crypto.Util.Padding import unpad

app = Flask(__name__)
CORS(app)

MERCHANT_KEY = base64.b64decode("your_merchant_key_base64")
IV = b"your_initialization_vector"  # Must be 16 bytes long

def decrypt_aes(ciphertext: str) -> str:
    try:
        cipher = AES.new(MERCHANT_KEY, AES.MODE_CBC, IV)
        decoded = base64.b64decode(ciphertext)
        decrypted = cipher.decrypt(decoded)
        unpadded = unpad(decrypted, AES.block_size)
        return unpadded.decode('utf-8')
    except Exception as e:
        print(f"Decryption error: {e}")
        return None

@app.route("/initiate-payment", methods=["POST", "OPTIONS"])
def initiate_payment():
    try:
        if request.method == "OPTIONS":
            return _build_cors_preflight_response()
        
        data = request.get_json()
        amount = data.get("amount", "1")
        name = data.get("name", "Test User")
        email = data.get("email", "test@email.com")
        phone = data.get("phone", "0912345678")
        
        enc_message, enc_hash, merchant_id, yagoutpay_url = generate_request(
            amount=amount, name=name, email=email, phone=phone
        )
        
        response_data = {
            "me_id": merchant_id,
            "merchant_request": enc_message,
            "hash": enc_hash,
            "url": yagoutpay_url
        }
        
        return _corsify_actual_response(jsonify(response_data))
    
    except Exception as e:
        return _corsify_actual_response(jsonify({"error": str(e)})), 500

@app.route("/pay")
def pay():
    try:
        enc_message, enc_hash, merchant_id, yagoutpay_url = generate_request()
        
        html_form = f"""
        <!DOCTYPE html>
        <html>
        <body onload="document.forms[0].submit()">
          <form method="POST" action="{yagoutpay_url}">
            <input type="hidden" name="me_id" value="{merchant_id}" />
            <input type="hidden" name="merchant_request" value="{enc_message}" />
            <input type="hidden" name="hash" value="{enc_hash}" />
            <noscript><input type="submit" value="Pay Now" /></noscript>
          </form>
        </body>
        </html>
        """
        return Response(html_form, mimetype="text/html")
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/success", methods=["GET", "POST"])
def success():
    try:
        # Handle both GET and POST requests
        if request.method == 'POST':
            data = request.form
        else:
            data = request.args
        
        # Decrypt the response data
        encrypted_response = data.get('merchant_response', '')
        if encrypted_response:
            decrypted_response = decrypt_aes(encrypted_response)
            print(f"Decrypted response: {decrypted_response}")
        else:
            decrypted_response = "No response data received"
        
        # You can process the payment success here
        # Save to database, send confirmation email, etc.
        
        return render_template('success.html', 
                             decrypted_response=decrypted_response,
                             data=dict(data))
    
    except Exception as e:
        print(f"Success callback error: {e}")
        return render_template('success.html', error=str(e))

@app.route("/failure", methods=["GET", "POST"])
def failure():
    try:
        # Handle both GET and POST requests
        if request.method == 'POST':
            data = request.form
        else:
            data = request.args
        
        # Decrypt the response data if available
        encrypted_response = data.get('merchant_response', '')
        if encrypted_response:
            decrypted_response = decrypt_aes(encrypted_response)
            print(f"Decrypted failure response: {decrypted_response}")
        else:
            decrypted_response = "No response data received"
        
        # You can process the payment failure here
        # Notify user, log the failure, etc.
        
        return render_template('failure.html', 
                             decrypted_response=decrypted_response,
                             data=dict(data))
    
    except Exception as e:
        print(f"Failure callback error: {e}")
        return render_template('failure.html', error=str(e))

@app.route("/health")
def health():
    return jsonify({"status": "ok"})




# CORS helper functions
def _build_cors_preflight_response():
    response = jsonify()
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add("Access-Control-Allow-Headers", "*")
    response.headers.add("Access-Control-Allow-Methods", "*")
    return response

def _corsify_actual_response(response):
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response

if __name__ == "__main__":
    app.run(port=5000, debug=True)