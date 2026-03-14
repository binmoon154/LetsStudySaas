import React, { useState } from 'react';

const IdCardGenerator = () => {
    const [name, setName] = useState('');
    const [idCard, setIdCard] = useState(null);
    const [loading, setLoading] = useState(false);
    const [activeConcept, setActiveConcept] = useState(0);

    const generateCard = async (e) => {
        e.preventDefault();
        if (!name.trim()) return alert('이름을 입력해주세요!');
        
        setLoading(true);
        setActiveConcept(1); // 1. 단위 데이터 전송
        
        try {
            // 약간의 애니메이션 딜레이
            setTimeout(async () => {
                setActiveConcept(2); // 2. 서버의 데이터 확장/가공
                
                const response = await fetch('/api/practice/idcard', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name: name })
                });
                const data = await response.json();
                
                setTimeout(() => {
                    setActiveConcept(3); // 3. 복합 JSON 반환
                    
                    setTimeout(() => {
                        setActiveConcept(4); // 4. 프론트의 UI 렌더링
                        setIdCard(data);
                        setLoading(false);
                        
                        // 3초 후 포커스 해제
                        setTimeout(() => setActiveConcept(0), 3000);
                    }, 800);
                }, 800);
            }, 800);
        } catch (err) {
            alert('에러: ' + err.message);
            setLoading(false);
        }
    };

    return (
        <div className="practice-container" style={{ marginTop: '2rem' }}>
            <h2>💳 맞춤형 디지털 방문증 발급기 (Flask 백엔드 심화 실습)</h2>
            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                
                {/* 왼쪽: 방문증 발급 영역 */}
                <div className="glass-card" style={{ flex: '1', minWidth: '350px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    
                    {/* 입력 폼 */}
                    <form onSubmit={generateCard} style={{ width: '100%', display: 'flex', gap: '10px', marginBottom: '2rem' }}>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="본인의 이름을 입력하세요..."
                            style={{ flex: 1, padding: '0.8rem', borderRadius: '6px', border: '1px solid var(--border)', background: 'var(--bg-card)', color: 'var(--text-main)' }}
                            onFocus={() => setActiveConcept(1)}
                        />
                        <button 
                            type="submit" 
                            disabled={loading}
                            style={{ 
                                background: loading ? 'rgba(255,255,255,0.1)' : 'var(--primary)',
                                cursor: loading ? 'not-allowed' : 'pointer'
                            }}
                        >
                            {loading ? '발급 중...' : '방문증 발급'}
                        </button>
                    </form>

                    {/* 발급된 방문증 UI */}
                    {idCard && !loading && (
                        <div 
                            style={{
                                width: '320px',
                                height: '200px',
                                background: `linear-gradient(135deg, ${idCard.lucky_color.hex} 0%, rgba(0,0,0,0.8) 100%)`,
                                borderRadius: '15px',
                                padding: '1.5rem',
                                color: '#fff',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                boxShadow: `0 10px 25px ${idCard.lucky_color.hex}66`, // 그림자 색상도 받아온 데이터로
                                animation: 'slideUp 0.5s ease-out',
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                            onMouseEnter={() => setActiveConcept(4)}
                        >
                            {/* 데코레이션 요소 */}
                            <div style={{ position: 'absolute', top: '-20px', right: '-20px', fill: 'rgba(255,255,255,0.1)', width: '100px', height: '100px' }}>
                                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M42.7,-73.4C55.9,-67.6,67.6,-55.9,73.4,-42.7C79.2,-29.4,79.1,-14.7,77.3,-1.1C75.6,12.5,72.1,25,66.3,37.1C60.5,49.2,52.3,60.9,40.9,69.5C29.5,78.2,14.7,83.9,0.3,83.4C-14.2,82.8,-28.3,76.1,-39.8,67.4C-51.3,58.7,-60.1,47.9,-68.2,35.7C-76.3,23.5,-83.8,10,-83.1,-3.2C-82.4,-16.5,-73.5,-29.4,-64.1,-40.4C-54.7,-51.5,-44.8,-60.8,-33.2,-67.6C-21.6,-74.4,-9.4,-78.9,3.1,-84C15.6,-89.1,31.2,-94.7,42.7,-73.4Z" transform="translate(100 100)" />
                                </svg>
                            </div>
                            
                            {/* 헤더 */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <h3 style={{ margin: 0, letterSpacing: '2px', fontWeight: '800' }}>VISITOR PASS</h3>
                                <span style={{ background: 'rgba(255,255,255,0.2)', padding: '0.3rem 0.6rem', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 'bold' }}>
                                    {idCard.lucky_color.name}
                                </span>
                            </div>
                            
                            {/* 중간 (이름) */}
                            <div style={{ margin: '1rem 0' }}>
                                <span style={{ fontSize: '0.8rem', opacity: 0.8 }}>NAME</span>
                                <div style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>{idCard.name}</div>
                            </div>
                            
                            {/* 하단 (바코드 및 시간) */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                                <div>
                                    <span style={{ fontSize: '0.7rem', opacity: 0.8 }}>ISSUE NUMBER</span>
                                    <div style={{ fontFamily: 'monospace', letterSpacing: '4px', fontSize: '1rem' }}>{idCard.issue_number}</div>
                                </div>
                                <div style={{ fontSize: '0.7rem', opacity: 0.8, textAlign: 'right' }}>
                                    ISSUED AT<br/>
                                    {idCard.timestamp}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 텅 빈 상태일 때 */}
                    {!idCard && !loading && (
                         <div style={{ width: '320px', height: '200px', border: '2px dashed var(--border)', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                             발급 대기 중...
                         </div>
                    )}
                </div>

                {/* 오른쪽: 흐름 및 핵심 개념 설명 영역 */}
                <div className="glass-card" style={{ flex: '1', minWidth: '300px' }}>
                    <h3 style={{ marginBottom: '1rem', color: 'var(--primary)' }}>🧠 서버의 데이터 가공 능력 이해하기</h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                        버튼을 누르면 데이터가 팩토리에서 어떻게 조합되고 탄생하는지 눈여겨보세요.
                    </p>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                        
                        <ConceptBox 
                            active={activeConcept === 1} 
                            icon="📦"
                            title="1. 단일 재료 전송 (프론트 ➡ 백엔드)"
                            desc="프론트엔드는 사용자가 입력한 오직 '이름' 데이터 1개만 택배로 포장해서 보냅니다."
                        />
                        
                        <ConceptBox 
                            active={activeConcept === 2} 
                            icon="⚙️"
                            title="2. 서버의 데이터 확장 (백엔드의 역할)"
                            desc="서버는 자체 기능을 통해 모자란 데이터를 창조합니다. 8자리 랜덤 숫자를 뽑고(난수), 현재 시간을 측정하고, 무작위 색상을 고릅니다."
                        />

                        <ConceptBox 
                            active={activeConcept === 3} 
                            icon="📋"
                            title="3. 복합 JSON 반환 (백엔드 ➡ 프론트)"
                            desc="이름, 번호, 시간, 색상 4가지의 데이터가 차곡차곡 담긴 확장된 JSON 객체를 클라이언트에게 다시 돌려보냅니다."
                        />

                        <ConceptBox 
                            active={activeConcept === 4} 
                            icon="🎨"
                            title="4. 데이터 시각화 (프론트의 역할)"
                            desc="프론트엔드는 받은 데이터를 단순히 글자로 출력하지 않고, 색상 데이터는 배경색으로, 번호는 바코드에 매핑하여 시각적인 UI를 렌더링합니다."
                        />

                    </div>
                </div>

            </div>
        </div>
    );
};

// 개별 원리 박스 컴포넌트
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

export default IdCardGenerator;
