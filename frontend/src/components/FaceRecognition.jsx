import React, { useRef, useState } from 'react';

const FaceRecognition = () => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [stream, setStream] = useState(null);
    const [scanning, setScanning] = useState(false);
    const [result, setResult] = useState(null);
    const [activeConcept, setActiveConcept] = useState(0);
    const [registerName, setRegisterName] = useState('');

    // 카메라 켜기
    const startCamera = async () => {
        setActiveConcept(1); // 개념 1: 하드웨어 접근 제어
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
            videoRef.current.srcObject = mediaStream;
            setStream(mediaStream);
            setResult(null);
        } catch (err) {
            alert('카메라 접근 권한이 거부되었거나 장치가 없습니다.');
        }
    };

    // 카메라 끄기
    const stopCamera = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            videoRef.current.srcObject = null;
            setStream(null);
            setResult(null);
            setScanning(false);
        }
    };

    // 사진 캡처 및 백엔드 전송 (등록 또는 판별)
    const captureAndSend = async (actionType = 'detect') => {
        if (!stream) return alert('먼저 카메라를 켜주세요.');
        if (actionType === 'register' && !registerName.trim()) {
            return alert('등록할 이름을 입력해주세요!');
        }
        
        setScanning(true);
        setActiveConcept(2); // 개념 2: 이미지 데이터 추출 및 전송
        
        const canvas = canvasRef.current;
        const video = videoRef.current;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        const context = canvas.getContext('2d');
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        const imageData = canvas.toDataURL('image/jpeg', 0.8);
        
        try {
            setTimeout(async () => {
                setActiveConcept(3); // 개념 3: AI 서버의 무거운 연산
                
                const response = await fetch('/api/practice/face_detect', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        action: actionType, 
                        image: imageData, 
                        name: registerName 
                    })
                });
                const data = await response.json();
                
                if (!response.ok) throw new Error(data.error || '오류 발생');
                
                setResult(data);
                setScanning(false);
                setActiveConcept(4); // 개념 4: 결과 렌더링
                setRegisterName(''); // 입력창 초기화
                setTimeout(() => setActiveConcept(0), 4000);
                
            }, 800);
            
        } catch (err) {
            alert('서버 오류: ' + err.message);
            setScanning(false);
        }
    };

    return (
        <div className="practice-container" style={{ marginTop: '2rem' }}>
            <h2>📷 실시간 보안 스마트 도어 (얼굴 인식 AI 실습)</h2>
            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                
                {/* 왼쪽: 카메라 및 도어 화면 */}
                <div className="glass-card" style={{ flex: '1.5', minWidth: '350px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    
                    <div style={{ display: 'flex', gap: '10px', marginBottom: '1rem', width: '100%', maxWidth: '500px' }}>
                        {!stream ? (
                            <button onClick={startCamera} style={{ background: '#10b981', flex: 1 }}>📸 카메라 켜기</button>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <input 
                                        type="text" 
                                        placeholder="등록할 이름 입력..." 
                                        value={registerName}
                                        onChange={(e) => setRegisterName(e.target.value)}
                                        style={{ flex: 1, padding: '0.8rem', borderRadius: '6px', border: '1px solid var(--border)', background: 'var(--bg-card)', color: 'var(--text-main)' }}
                                    />
                                    <button 
                                        onClick={() => captureAndSend('register')} 
                                        disabled={scanning}
                                        style={{ background: scanning ? 'rgba(255,255,255,0.2)' : '#f59e0b' }}
                                    >
                                        📝 얼굴 등록
                                    </button>
                                </div>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <button 
                                        onClick={() => captureAndSend('detect')} 
                                        disabled={scanning}
                                        style={{ flex: 1, background: scanning ? 'rgba(255,255,255,0.2)' : 'var(--primary)' }}
                                    >
                                        {scanning ? '🤖 AI가 분석 중...' : '🔍 지금 누구인지 분석'}
                                    </button>
                                    <button onClick={stopCamera} style={{ background: '#ef4444' }}>⏹ 카메라 끄기</button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* 비디오 컨테이너 */}
                    <div style={{ position: 'relative', width: '100%', maxWidth: '500px', backgroundColor: '#000', borderRadius: '12px', overflow: 'hidden', border: '2px solid var(--border)' }}>
                        <video 
                            ref={videoRef} 
                            autoPlay 
                            playsInline 
                            style={{ width: '100%', display: stream ? 'block' : 'none', transform: 'scaleX(-1)' }} 
                        />
                        
                        {/* 캡처를 위한 숨겨진 캔버스 */}
                        <canvas ref={canvasRef} style={{ display: 'none' }} />

                        {/* 카메라 꺼졌을 때 더미 박스 */}
                        {!stream && (
                            <div style={{ padding: '4rem 0', textAlign: 'center', color: 'var(--text-muted)' }}>
                                카메라가 꺼져 있습니다.<br/>버튼을 눌러 활성화하세요.
                            </div>
                        )}

                        {/* 스캐닝 이펙트 애니메이션 */}
                        {scanning && (
                            <div style={{
                                position: 'absolute',
                                top: 0, left: 0, right: 0,
                                height: '5px',
                                background: '#10b981',
                                boxShadow: '0 0 15px #10b981',
                                animation: 'scan 1.5s linear infinite'
                            }} />
                        )}

                        {/* AI 인식 결과 박스 (가상) */}
                        {result && stream && !scanning && (
                            <div style={{
                                position: 'absolute',
                                top: '30%', left: '30%', width: '40%', height: '40%', // 서버 좌표 대비 대략적 그리기
                                border: `3px dashed ${result.is_registered ? '#10b981' : '#ef4444'}`,
                                boxShadow: `0 0 20px rgba(${result.is_registered ? '16, 185, 129' : '239, 68, 68'}, 0.4)`,
                                backgroundColor: `rgba(${result.is_registered ? '16, 185, 129' : '239, 68, 68'}, 0.1)`
                            }}>
                                <div style={{
                                    position: 'absolute', top: '-30px', left: '-3px',
                                    background: result.is_registered ? '#10b981' : '#ef4444', color: '#fff', fontSize: '0.8rem',
                                    padding: '4px 8px', fontWeight: 'bold'
                                }}>
                                    {result.identity} {result.confidence ? `(${result.confidence}%)` : '(등록됨)'}
                                </div>
                            </div>
                        )}
                        
                        {/* 하단 시스템 메시지 오버레이 */}
                        {result && stream && !scanning && (
                             <div style={{
                                 position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)',
                                 background: 'rgba(0,0,0,0.8)', padding: '0.5rem 1rem', borderRadius: '20px',
                                 color: result.is_registered ? '#10b981' : '#ef4444', fontWeight: 'bold', fontSize: '0.9rem',
                                 whiteSpace: 'nowrap'
                             }}>
                                 {result.message}
                             </div>
                        )}
                    </div>
                </div>

                {/* 오른쪽: 흐름 및 핵심 개념 설명 영역 */}
                <div className="glass-card" style={{ flex: '1', minWidth: '300px' }}>
                    <h3 style={{ marginBottom: '1rem', color: 'var(--primary)' }}>🧠 사진 속 AI 원리 4가지</h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                        웹에서 AI가 작동하는 과정을 눈으로 확인해 보세요.
                    </p>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                        
                        <ConceptBox 
                            active={activeConcept === 1} 
                            icon="🔒"
                            title="1. 하드웨어 접근 (WebRTC API)"
                            desc="브라우저(React)가 노트북의 웹캠 센서를 제어합니다. 사용자의 허락 없이는 절대 켜지지 않는 웹의 철저한 보안 통제를 배울 수 있습니다."
                        />
                        
                        <ConceptBox 
                            active={activeConcept === 2} 
                            icon="🖼️"
                            title="2. 무거운 이미지 전송 (Base64)"
                            desc="움직이는 비디오에서 사진 딱 1장(스냅샷)을 촬영한 후, 이를 컴퓨터가 읽을 수 있는 끝없이 긴 문자 메시지(Base64)로 쪼개어 서버로 전송합니다."
                        />

                        <ConceptBox 
                            active={activeConcept === 3} 
                            icon="🏋️‍♂️"
                            title="3. 백엔드의 무거운 AI 연산"
                            desc="얼굴을 찾는 복잡하고 무거운 수학적 계산은 가벼운 브라우저가 직접 하지 않습니다. 파이썬으로 무장한 백엔드 서버(OpenCV/Face_recognition 모의 서버)가 대신 고민해 줍니다."
                        />

                        <ConceptBox 
                            active={activeConcept === 4} 
                            icon="🎯"
                            title="4. 아주 가벼운 결과 반환 (JSON)"
                            desc="복잡한 이미지를 분석했지만, 서버가 프론트엔드에게 돌려주는 건 단지 '얼굴 사각형 좌표와 이름'이라는 1KB도 안되는 가벼운 텍스트뿐입니다!"
                        />

                    </div>
                </div>

            </div>
        </div>
    );
};

const ConceptBox = ({ active, icon, title, desc }) => {
    return (
        <div style={{
            padding: '1rem',
            borderRadius: '8px',
            background: active ? 'rgba(99, 102, 241, 0.2)' : 'rgba(0,0,0,0.2)',
            borderLeft: active ? '4px solid #6366f1' : '4px solid transparent',
            color: active ? '#fff' : 'var(--text-muted)',
            transition: 'all 0.3s ease',
            transform: active ? 'scale(1.02)' : 'scale(1)',
            boxShadow: active ? '0 0 15px rgba(99,102,241,0.3)' : 'none'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
                <span style={{ fontSize: '1.2rem' }}>{icon}</span>
                <strong style={{ color: active ? 'var(--primary)' : 'inherit' }}>{title}</strong>
            </div>
            <span style={{ fontSize: '0.85rem', display: 'block', paddingLeft: '1.7rem', lineHeight: '1.4' }}>{desc}</span>
        </div>
    );
};

export default FaceRecognition;
