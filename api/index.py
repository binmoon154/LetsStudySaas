from flask import Flask, jsonify, request
from flasgger import Swagger
from flask_cors import CORS
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)
swagger = Swagger(app)

# Vercel 배포를 위한 헬스체크
@app.route('/api/health')
def health():
    return jsonify({"status": "healthy", "message": "Backend is running on Vercel!"})

@app.route('/')
def hello():
    return jsonify({"message": "Welcome to LetsStudySaas Backend!"})

@app.route('/api/practice/summary', methods=['POST', 'OPTIONS'])
@app.route('/practice/summary', methods=['POST', 'OPTIONS'])
def post_practice_summary():
    if request.method == 'OPTIONS':
        return jsonify({"success": True}), 200
        
    data = request.get_json()
    if not data:
        return jsonify({"status": "error", "message": "No JSON data received"}), 400
        
    name = data.get('name', '익명')
    action = data.get('action', '알 수 없는 작업')
    
    return jsonify({
        "status": "success",
        "message": f"[{name}]님의 '{action}' 실습 요청을 서버(Vercel)에서 성공적으로 처리했습니다.",
        "received_data": data
    }), 201

@app.route('/api/workbook/flask')
@app.route('/workbook/flask')
def get_flask_workbook():
    return jsonify({
        "title": "Flask & API 설계 기초",
        "sections": [
            {"topic": "라우팅", "content": "URL과 파이썬 함수를 연결합니다."},
            {"topic": "JSON", "content": "데이터를 주고받는 표준 형식입니다."}
        ]
    })

# Vercel은 이 app 객체를 필요로 합니다.
handler = app

if __name__ == '__main__':
    app.run(debug=True, port=5000)
