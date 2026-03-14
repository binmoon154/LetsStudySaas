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

# Vercel 배포 상태 확인을 위한 헬스체크 엔드포인트
@app.route('/api/health')
def health():
    """
    백엔드 헬스체크
    ---
    responses:
      200:
        description: 백엔드가 정상적으로 작동 중이라는 메시지 반환
    """
    return jsonify({"status": "healthy", "message": "Backend is running perfectly on Vercel!"})
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

@app.route('/api/practice/summary', methods=['POST'])
def post_practice_summary():
    """
    실습 데이터 요약 결과 생성 (POST 실습)
    ---
    parameters:
      - name: body
        in: body
        required: true
        schema:
          type: object
          properties:
            name:
              type: string
            action:
              type: string
    responses:
      201:
        description: 요약 결과 반환 성공
    """
    from flask import request
    data = request.get_json()
    name = data.get('name', '익명')
    action = data.get('action', '알 수 없는 작업')
    
    summary = f"[{name}]님이 '{action}' 실습을 요청하셨습니다. 서버에서 안정적으로 데이터를 수신하여 201 Created 응답을 보냅니다."
    
    return jsonify({
        "status": "success",
        "message": summary,
        "received_data": data
    }), 201

@app.route('/api/practice/rps', methods=['POST'])
def rps_game():
    """
    가위바위보 게임 로직
    ---
    parameters:
      - name: body
        in: body
        required: true
        schema:
          type: object
          properties:
            user_choice:
              type: string
    responses:
      200:
        description: 게임 결과
    """
    import random
    from flask import request
    data = request.get_json()
    user_choice = data.get('user_choice')
    
    choices = ['가위', '바위', '보']
    if user_choice not in choices:
        return jsonify({"error": "잘못된 입력입니다."}), 400
        
    server_choice = random.choice(choices)
    
    if user_choice == server_choice:
        result = '무승부'
    elif (user_choice == '가위' and server_choice == '보') or \
         (user_choice == '바위' and server_choice == '가위') or \
         (user_choice == '보' and server_choice == '바위'):
        result = '사용자 승리'
    else:
        result = '서버 승리'
        
    return jsonify({
        "user_choice": user_choice,
        "server_choice": server_choice,
        "result": result
    }), 200

@app.route('/api/practice/idcard', methods=['POST'])
def generate_idcard():
    """
    디지털 방문증 발급 로직
    ---
    parameters:
      - name: body
        in: body
        required: true
        schema:
          type: object
          properties:
            name:
              type: string
    responses:
      200:
        description: 가공된 방문증 정보 반환
    """
    import random
    from datetime import datetime
    from flask import request
    data = request.get_json()
    user_name = data.get('name', '익명')
    
    if not user_name:
        return jsonify({"error": "이름이 필요합니다."}), 400
        
    # 1. 고유 발급 번호 생성 (8자리 난수)
    issue_number = f"{random.randint(10000000, 99999999)}"
    
    # 2. 발급 시간 기록
    current_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    
    # 3. 행운의 색상 랜덤 부여
    colors = [
        {"name": "인디고 (Indigo)", "hex": "#4f46e5"},
        {"name": "에메랄드 (Emerald)", "hex": "#10b981"},
        {"name": "로즈 (Rose)", "hex": "#f43f5e"},
        {"name": "앰버 (Amber)", "hex": "#f59e0b"},
        {"name": "스카이 블루 (Sky Blue)", "hex": "#0ea5e9"}
    ]
    lucky_color = random.choice(colors)
    
    return jsonify({
        "name": user_name,
        "issue_number": issue_number,
        "timestamp": current_time,
        "lucky_color": lucky_color
    }), 200

# 메모리 기반 임시 얼굴 저장소 (DB를 연동하지 않은 상태)
registered_faces = {}

@app.route('/api/practice/face_detect', methods=['POST'])
def mock_face_detect():
    """
    얼굴 인식 모의(Mock) 백엔드 로직 
    ---
    parameters:
      - name: body
        in: body
        required: true
        schema:
          type: object
          properties:
            action:
              type: string
            name:
              type: string
            image:
              type: string
    """
    from flask import request
    import time
    import random
    
    data = request.get_json()
    action = data.get('action', 'detect')
    image_data = data.get('image')
    name = data.get('name', '알수없음')
    
    if not image_data:
        return jsonify({"error": "이미지 데이터가 없습니다."}), 400
        
    time.sleep(1) # 무거운 연산(AI 추론)을 하는 척 하는 인터벌 딜레이
    
    # 1. 얼굴 등록 로직
    if action == 'register':
        if not name or name == '알수없음':
            return jsonify({"error": "얼굴을 등록하려면 이름이 필요합니다."}), 400
            
        # 얼굴 특징값(벡터) 추출 시뮬레이션 및 메모리 저장
        registered_faces[name] = "dummy_face_vector_" + name
        
        return jsonify({
            "status": "success",
            "message": f"'{name}'님의 얼굴이 안전하게 등록되었습니다.",
            "identity": name,
            "box": { "top": 120, "right": 380, "bottom": 380, "left": 120 },
            "is_registered": True
        }), 200
        
    # 2. 얼굴 판별 로직
    elif action == 'detect':
        # 등록된 사람이 있는지 확인 후 모의 결과 도출
        if len(registered_faces) > 0:
            # 약간의 확률로 미등록 사용자라고 판별하는 리얼리티 부여
            if random.random() > 0.3:
                # 70% 확률로 무작위 등록 사용자 판별
                matched_name = random.choice(list(registered_faces.keys()))
                confidence = round(random.uniform(92.0, 99.5), 1)
                is_reg = True
            else:
                # 30% 확률로 미등록자로 오류
                matched_name = "미등록 사용자"
                confidence = round(random.uniform(60.0, 85.0), 1)
                is_reg = False
        else:
            # 아무도 없으면 무조건 미등록
            matched_name = "미등록 사용자"
            confidence = round(random.uniform(60.0, 85.0), 1)
            is_reg = False
            
        return jsonify({
            "status": "success",
            "message": "인증 완료" if is_reg else "미등록 상태",
            "detected_faces": 1,
            "box": { "top": 150, "right": 350, "bottom": 350, "left": 150 },
            "confidence": confidence,
            "identity": matched_name,
            "is_registered": is_reg
        }), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)
