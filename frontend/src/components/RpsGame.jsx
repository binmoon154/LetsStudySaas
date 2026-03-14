import React, { useState } from 'react';

const RpsGame = () => {
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [activeStep, setActiveStep] = useState(0); // 0: none, 1..5 for steps

    const delay = (ms) => new Promise(res => setTimeout(res, ms));

    const playRps = async (choice) => {
        setLoading(true);
        setResult(null);

        try {
            setActiveStep(1); // 1단계: 사용자의 액션
            await delay(800);

            setActiveStep(2); // 2단계: 데이터 전송
            await delay(800);

            setActiveStep(3); // 3단계: 서버의 생각
            const response = await fetch('/api/practice/rps', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user_choice: choice })
            });
            const data = await response.json();
            await delay(800);

            setActiveStep(4); // 4단계: 결과 반환
            await delay(800);

            setActiveStep(5); // 5단계: 화면 업데이트
            setResult(data);
            
            // 일정 시간 후 포커스 해제
            setTimeout(() => {
                setActiveStep(0);
            }, 3000);

        } catch (err) {
            setResult({ error: err.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="practice-container">
            <h2>🎮 서버와 대결하는 미니 가위바위보 게임 (VS Server)</h2>
            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                
                {/* 왼쪽: 게임 영역 */}
                <div className="glass-card" style={{ flex: '1', minWidth: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <h3 style={{ marginBottom: '1rem' }}>당신의 선택은?</h3>
                    <div style={{ display: 'flex', gap: '1rem',  marginBottom: '2rem' }}>
                        {['가위', '바위', '보'].map((choice) => (
                            <button 
                                key={choice} 
                                onClick={() => playRps(choice)}
                                disabled={loading}
                                style={{
                                    fontSize: '1.5rem',
                                    padding: '1rem 2rem',
                                    background: loading ? 'rgba(255,255,255,0.1)' : 'var(--primary)',
                                    transform: loading ? 'scale(0.95)' : 'scale(1)',
                                    transition: 'all 0.2s',
                                    cursor: loading ? 'not-allowed' : 'pointer'
                                }}
                            >
                                {choice === '가위' ? '✌️' : choice === '바위' ? '✊' : '✋'}<br/>
                                <span style={{ fontSize: '1rem' }}>{choice}</span>
                            </button>
                        ))}
                    </div>

                    {result && !result.error && (
                        <div style={{
                            width: '100%',
                            padding: '1.5rem',
                            background: 'rgba(0,0,0,0.4)',
                            borderRadius: '12px',
                            textAlign: 'center',
                            border: `2px solid ${result.result === '사용자 승리' ? '#10b981' : result.result === '서버 승리' ? '#ef4444' : '#f59e0b'}`,
                            animation: 'fadeIn 0.5s ease-out'
                        }}>
                            <div style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>
                                🙋‍♂️ 당신: <strong>{result.user_choice}</strong> VS 🤖 서버: <strong>{result.server_choice}</strong>
                            </div>
                            <h2 style={{ 
                                margin: 0, 
                                color: result.result === '사용자 승리' ? '#10b981' : result.result === '서버 승리' ? '#ef4444' : '#f59e0b'
                            }}>
                                💥 {result.result}!
                            </h2>
                        </div>
                    )}
                    
                    {result && result.error && (
                         <div style={{ color: '#ef4444', marginTop: '1rem' }}>에러 발생: {result.error}</div>
                    )}
                </div>

                {/* 오른쪽: 흐름 설명 영역 */}
                <div className="glass-card" style={{ flex: '2', minWidth: '300px' }}>
                    <h3 style={{ marginBottom: '1rem', color: 'var(--primary)' }}>🧠 데이터의 여정 (5단계 흐름)</h3>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                        
                        <StepBox 
                            step={1} 
                            active={activeStep === 1} 
                            title="1단계: 사용자의 액션 (React 프론트엔드)"
                            desc="사용자가 방금 버튼을 클릭했습니다. React가 이벤트를 감지하고 선택한 값을 준비합니다."
                        />
                        
                        <StepBox 
                            step={2} 
                            active={activeStep === 2} 
                            title="2단계: 데이터 전송 (API 통신 - Request)"
                            desc="사용자의 선택 데이터를 JSON 박스에 담아, POST 방식으로 목적지(Flask 서버)로 보냅니다."
                        />

                        <StepBox 
                            step={3} 
                            active={activeStep === 3} 
                            title="3단계: 서버의 생각과 판단 (Flask 백엔드)"
                            desc="서버가 데이터를 박스에서 꺼내 읽습니다. 랜덤으로 무기를 고르고, 누가 이겼는지 승패 로직을 계산합니다."
                        />

                        <StepBox 
                            step={4} 
                            active={activeStep === 4} 
                            title="4단계: 결과 반환 (API 통신 - Response)"
                            desc="계산이 끝났습니다. 서버는 자신이 낸 무기와 최종 승패 결과를 새로운 상자에 담아 프론트엔드로 다시 던져줍니다."
                        />

                        <StepBox 
                            step={5} 
                            active={activeStep === 5} 
                            title="5단계: 화면 업데이트 (React 프론트엔드)"
                            desc="응답 상자가 서버로부터 도착했습니다! React가 결과를 읽어들여 우리 눈앞의 화면(가운데 결과창)을 화려하게 업데이트합니다."
                        />

                    </div>
                </div>

            </div>
        </div>
    );
};

// 개별 단계 박스 컴포넌트
const StepBox = ({ step, active, title, desc }) => {
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
            <strong style={{ display: 'block', marginBottom: '0.3rem', color: active ? 'var(--primary)' : 'inherit' }}>
                {title}
            </strong>
            <span style={{ fontSize: '0.85rem' }}>{desc}</span>
        </div>
    );
};

export default RpsGame;
