import React, { useState } from 'react';

const GoalTracker = () => {
    // 1. 객체 형태의 초기 데이터 상태 (데이터의 진화)
    const [goals, setGoals] = useState([
        { id: 1, text: 'React 공식문서 읽기', completed: false },
        { id: 2, text: '물 2리터 마시기', completed: true },
    ]);
    const [input, setInput] = useState('');
    const [activeConcept, setActiveConcept] = useState(0); // 1~4번 개념 설명 하이라이트

    // 항목 추가 함수
    const addGoal = (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        
        setActiveConcept(1); // 개념 1 하이라이트
        const newGoal = {
            id: Date.now(), // 고유 번호 생성
            text: input,
            completed: false
        };
        setGoals([...goals, newGoal]); // 불변성 유지 (새 배열)
        setInput('');
    };

    // 완료 토글 함수 (개념 2: 상태 뒤집기 & 불변성)
    const toggleGoal = (id) => {
        setActiveConcept(2);
        const updatedGoals = goals.map(goal => 
            goal.id === id ? { ...goal, completed: !goal.completed } : goal
        );
        setGoals(updatedGoals);
    };

    // 삭제 함수
    const deleteGoal = (id) => {
        setActiveConcept(2);
        setGoals(goals.filter(goal => goal.id !== id));
    };

    // 3. 파생 상태 (진척도 바)
    const totalCount = goals.length;
    const completedCount = goals.filter(g => g.completed).length;
    const progressPercent = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

    const checkConcept3 = () => { setActiveConcept(3); };
    const checkConcept4 = () => { setActiveConcept(4); };

    return (
        <div className="practice-container" style={{ marginTop: '2rem' }}>
            <h2>🎯 스마트 목표 달성 트래커 (React 프론트엔드 실습)</h2>
            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                
                {/* 왼쪽: 트래커 앱 영역 */}
                <div className="glass-card" style={{ flex: '1', minWidth: '300px' }}>
                    
                    {/* 프로그레스 바 영역 (개념 3) */}
                    <div 
                        style={{ marginBottom: '1.5rem', cursor: 'pointer', padding: '1rem', borderRadius: '8px', background: activeConcept === 3 ? 'rgba(16, 185, 129, 0.2)' : 'transparent', transition: 'all 0.3s' }}
                        onMouseEnter={checkConcept3}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <strong style={{ color: 'var(--text-main)' }}>나의 달성률</strong>
                            <strong style={{ color: 'var(--primary)' }}>{progressPercent}%</strong>
                        </div>
                        <div style={{ width: '100%', height: '12px', background: 'rgba(0,0,0,0.3)', borderRadius: '6px', overflow: 'hidden' }}>
                            <div style={{ 
                                width: `${progressPercent}%`, 
                                height: '100%', 
                                background: progressPercent === 100 ? '#10b981' : 'var(--primary)',
                                transition: 'width 0.5s ease-out, background 0.3s'
                            }}></div>
                        </div>
                        {progressPercent === 100 && totalCount > 0 && (
                            <div style={{ textAlign: 'center', marginTop: '0.5rem', color: '#10b981', animation: 'bounce 1s infinite' }}>
                                🎉 모든 목표를 달성했습니다! 🎉
                            </div>
                        )}
                    </div>

                    {/* 입력 폼 (개념 1) */}
                    <form onSubmit={addGoal} style={{ display: 'flex', gap: '10px', marginBottom: '1.5rem' }}>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="새로운 목표 입력..."
                            style={{ flex: 1, padding: '0.8rem', borderRadius: '6px', border: '1px solid var(--border)', background: 'var(--bg-card)', color: 'var(--text-main)' }}
                            onFocus={() => setActiveConcept(1)}
                        />
                        <button type="submit">추가</button>
                    </form>

                    {/* 리스트 영역 (개념 4: 조건부 스타일링) */}
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {goals.length === 0 ? (
                            <li style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '1rem' }}>목표를 추가해보세요!</li>
                        ) : (
                            goals.map((goal) => (
                                <li 
                                    key={goal.id} 
                                    onMouseEnter={checkConcept4}
                                    style={{ 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        padding: '1rem', 
                                        background: goal.completed ? 'rgba(0,0,0,0.1)' : 'var(--bg-card)', 
                                        borderRadius: '8px',
                                        border: `1px solid ${goal.completed ? 'var(--border)' : 'var(--primary-light)'}`,
                                        opacity: goal.completed ? 0.6 : 1, // 조건부 스타일링
                                        transition: 'all 0.3s'
                                    }}
                                >
                                    <input 
                                        type="checkbox" 
                                        checked={goal.completed} 
                                        onChange={() => toggleGoal(goal.id)}
                                        style={{ width: '20px', height: '20px', marginRight: '1rem', cursor: 'pointer' }}
                                    />
                                    <span style={{ 
                                        flex: 1, 
                                        textDecoration: goal.completed ? 'line-through' : 'none', // 조건부 스타일링
                                        color: goal.completed ? 'var(--text-muted)' : 'var(--text-main)'
                                    }}>
                                        {goal.text}
                                    </span>
                                    <button 
                                        onClick={() => deleteGoal(goal.id)}
                                        style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', background: '#ef4444', border: 'none' }}
                                    >
                                        삭제
                                    </button>
                                </li>
                            ))
                        )}
                    </ul>
                </div>

                {/* 오른쪽: 흐름 및 핵심 개념 설명 영역 */}
                <div className="glass-card" style={{ flex: '1', minWidth: '300px' }}>
                    <h3 style={{ marginBottom: '1rem', color: 'var(--primary)' }}>🧠 코드 속 핵심 원리 4가지</h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                        앱을 조작하거나 영역에 마우스를 올리면 관련된 원리에 불이 들어옵니다.
                    </p>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                        
                        <ConceptBox 
                            active={activeConcept === 1} 
                            icon="📂"
                            title="1. 데이터의 진화 (객체 구조)"
                            desc="단순한 글자가 아니라 { id: 고유번호, text: '내용', completed: false } 형태의 '객체'로 저장하여 항목의 상태를 디테일하게 관리합니다."
                        />
                        
                        <ConceptBox 
                            active={activeConcept === 2} 
                            icon="🔄"
                            title="2. 상태 뒤집기 (불변성 유지)"
                            desc="체크박스를 누르면 React는 원본 데이터를 부수지 않고, 선택한 항목의 completed 값만 반대로 바꾼 '새로운 복사본' 리스트(map 함수 활용)로 교체합니다."
                        />

                        <ConceptBox 
                            active={activeConcept === 3} 
                            icon="📊"
                            title="3. 계산되는 파생 상태 (진척도)"
                            desc="퍼센트를 상태(State)로 따로 저장하지 않습니다. 전체 개수와 완료 개수를 나누어(완료/전체*100) 데이터가 바뀔 때마다 순식간에 자동 계산합니다."
                        />

                        <ConceptBox 
                            active={activeConcept === 4} 
                            icon="🎨"
                            title="4. 조건부 스타일링 (옷 갈아입히기)"
                            desc="항목이 화면에 그려질 때 completed가 true인지 확인합니다. true라면 취소선(line-through)과 투명도(opacity)를 즉시 적용합니다."
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

export default GoalTracker;
