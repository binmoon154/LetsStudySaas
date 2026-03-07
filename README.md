# LetsStudySaas

React, Vite, Flask, Swagger, 그리고 Supabase를 배우기 위한 종합 학습 플랫폼입니다.

## 프로젝트 구조
- `/frontend`: React + Vite 애플리케이션
- `/backend`: Python + Flask + Swagger API

## 사전 요구 사항
- Node.js (v18 이상)
- Python (v3.9 이상)

## 실행 방법

### 1. 백엔드 (Backend)
`backend` 디렉토리로 이동하여 다음 단계를 따르세요:
```bash
cd backend
# 가상 환경 생성 (이미 생성된 경우 생략 가능)
python -m venv venv
# 가상 환경 활성화
# Windows:
.\venv\Scripts\activate
# 의존성 설치
pip install -r requirements.txt
# 서버 실행
python app.py
```
백엔드는 `http://localhost:5000`에서 실행됩니다.
Swagger 문서는 `http://localhost:5000/apidocs`에서 확인할 수 있습니다.

### 2. 프론트엔드 (Frontend)
`frontend` 디렉토리로 이동하여 다음 단계를 따르세요:
```bash
cd frontend
# 의존성 설치
npm install
# 개발 서버 실행
npm run dev
```
프론트엔드는 `http://localhost:5173`에서 실행됩니다.

## 배포
이 프로젝트는 Vercel에 배포하도록 설계되었습니다.
- GitHub 저장소를 Vercel에 연결합니다.
- 프론트엔드와 백엔드(Serverless Functions 또는 별도 배포)에 대한 빌드 설정을 구성합니다.
