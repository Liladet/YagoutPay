import hashlib
import base64
import random
import string
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad

MERCHANT_ID = "your_MERCHANT_ID"
MERCHANT_KEY = base64.b64decode("your_base64_encoded_key")
IV = b"your_initialization_vector"  # Must be 16 bytes long
AGGREGATOR_ID = "your_aggregator_id"
YAGOUTPAY_URL = "your_yagoutpay_url"

def encrypt_aes(plaintext: str) -> str:
    cipher = AES.new(MERCHANT_KEY, AES.MODE_CBC, IV)
    padded = pad(plaintext.encode("utf-8"), AES.block_size)
    return base64.b64encode(cipher.encrypt(padded)).decode("utf-8")

def generate_request(amount="1", name="Test User", email="test@email.com", phone="0912345678"):
    order_no = ''.join(random.choices(string.digits, k=5))

    txn_details = "|".join([
        AGGREGATOR_ID,
        MERCHANT_ID,
        order_no,
        amount,
        "ETH",
        "ETB",
        "SALE",
        "https://9c3d61b72885.ngrok-free.app/success",
        "https://9c3d61b72885.ngrok-free.app/failure",
        "WEB"
    ])

    # Pipe counts as specified
    pg_details = "|||"
    card_details = "||||"  # 4 pipes
    cust_details = "|".join([name, email, phone, "", "Y"])
    bill_details = "||||"  # 4 pipes
    ship_details = "||||||"  # 6 pipes
    item_details = "||"
    upi_details = ""  # empty string
    other_details = "|||||"

    full_message = "~".join([
        txn_details,
        pg_details,
        card_details,
        cust_details,
        bill_details,
        ship_details,
        item_details,
        upi_details,
        other_details
    ])

    # Hash input format
    hash_input = f"{MERCHANT_ID}~{order_no}~{amount}~ETH~ETB"
    sha256_hex = hashlib.sha256(hash_input.encode()).hexdigest()

    enc_message = encrypt_aes(full_message)
    enc_hash = encrypt_aes(sha256_hex)

    return enc_message, enc_hash, MERCHANT_ID, YAGOUTPAY_URL