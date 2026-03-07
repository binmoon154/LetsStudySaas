import sys
import os

# backend 디렉토리를 파이썬 경로에 추가하여 app.py를 찾을 수 있게 합니다.
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'backend'))

from app import app

# Vercel이 호출할 수 있도록 app 객체를 노출합니다.
handler = app
