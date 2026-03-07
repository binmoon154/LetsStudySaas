from flask import Flask, jsonify
from flasgger import Swagger
from flask_cors import CORS
import os
from dotenv import load_dotenv
from supabase import create_client, Client

load_dotenv()

app = Flask(__name__)
CORS(app)

# Supabase 설정
# .env 파일에 실제 값을 입력하세요.
SUPABASE_URL = os.environ.get("SUPABASE_URL", "https://your-project.supabase.co")
SUPABASE_KEY = os.environ.get("SUPABASE_KEY", "your-anon-key")
# supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

swagger = Swagger(app)

@app.route('/')
def hello():
    """
    헬로 월드 엔드포인트
    ---
    responses:
      200:
        description: 간단한 환영 메시지
    """
    return jsonify({"message": "LetsStudySaas 백엔드에 오신 것을 환영합니다!"})

@app.route('/api/workbook/flask')
def get_flask_workbook():
    """
    Flask 및 Swagger 워크북 콘텐츠 가져오기
    ---
    responses:
      200:
        description: Flask와 Swagger 학습을 위한 워크북 내용
        schema:
          type: object
          properties:
            title:
              type: string
            sections:
              type: array
              items:
                type: object
                properties:
                  topic:
                    type: string
                  content:
                    type: string
    """
    return jsonify({
        "title": "Flask & Swagger 마스터하기",
        "sections": [
            {
                "topic": "Flask란 무엇인가요?",
                "content": "Flask는 파이썬으로 작성된 가벼운 WSGI 웹 애플리케이션 프레임워크입니다."
            },
            {
                "topic": "Swagger란 무엇인가요?",
                "content": "Swagger는 REST API를 설계, 구축, 문서화 및 소비하는 데 도움을 주는 OpenAPI 사양 기반의 오프소스 도구 세트입니다."
            }
        ]
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)
