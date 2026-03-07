import React, { useState } from 'react';

const Practice = ({ type }) => {
    const [input, setInput] = useState('');
    const [items, setItems] = useState(['기본 샘플 데이터']); // React 실습용 리스트 상태
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleReactAdd = () => {
        if (!input) return alert('내용을 입력해주세요!');
        // 1. 기존 리스트에 새로운 내용을 추가 (리스트 불변성 유지)
        setItems([...items, input]);
        setResult(`React 상태 업데이트 완료: "${input}" 가 리스트에 추가되었습니다.`);
        setInput('');
    };

    const handleFlaskPost = async () => {
        if (!input) return alert('이름을 입력해주세요!');
        setLoading(true);
        try {
            // 동일 도메인 배포 환경이므로 상대 경로를 사용합니다.
            const apiUrl = '/api/practice/summary';

            // 2. Flask 서버로 POST 요청 보내기
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: input, action: '고급 API 실습' })
            });
            const data = await response.json();
            setResult(`서버 응답(201 Created): ${data.message}`);
        } catch (err) {
            setResult(`에러: ${err.message}. 서버 구동 확인이 필요합니다.`);
        }
        setLoading(false);
    };

    return (
        <div className="practice-container">
            <h2>{type === 'react' ? 'React 고급 실습: 상태 관리와 리스트' : 'Flask 고급 실습: 데이터 전송(POST)'}</h2>
            <div className="glass-card practice-area">
                {type === 'react' ? (
                    <>
                        <p>입력한 내용이 아래 리스트에 실시간으로 추가되는 과정을 체험하세요.</p>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="추가할 항목 입력..."
                                style={{ flex: 1 }}
                            />
                            <button onClick={handleReactAdd}>항목 추가</button>
                        </div>
                        <ul style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem 2rem', borderRadius: '8px', marginTop: '1rem' }}>
                            {items.map((item, idx) => <li key={idx} style={{ color: 'var(--text-main)', marginBottom: '5px' }}>{item}</li>)}
                        </ul>
                    </>
                ) : (
                    <>
                        <p>이름을 입력하고 서버로 데이터를 보내어 가공된 결과를 받아보세요.</p>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="당신의 이름..."
                                style={{ flex: 1 }}
                            />
                            <button onClick={handleFlaskPost} disabled={loading}>
                                {loading ? '서버 통신 중...' : '서버로 전송'}
                            </button>
                        </div>
                    </>
                )}

                {result && (
                    <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ padding: '1rem', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', border: '1px solid var(--primary)' }}>
                            <strong style={{ color: 'var(--primary)', display: 'block', marginBottom: '0.5rem' }}>💻 시스템 로그:</strong>
                            <pre style={{ margin: 0, whiteSpace: 'pre-wrap', fontSize: '0.9rem' }}>{result}</pre>
                        </div>

                        <div style={{ padding: '1rem', background: 'rgba(99, 102, 241, 0.1)', borderLeft: '4px solid var(--primary)', borderRadius: '4px' }}>
                            <strong style={{ display: 'block', marginBottom: '0.5rem' }}>💡 상세 원리 분석</strong>
                            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                                {type === 'react' ? (
                                    <>
                                        1. <strong>불변성(Immutability):</strong> 기존 배열을 직접 수정하지 않고 <code>[...items, input]</code>과 같이 새로운 배열을 만들어 상태를 교체했습니다.<br />
                                        2. <strong>Map 함수:</strong> 배열의 각 요소를 <code>map()</code>을 통해 <code>&lt;li&gt;</code> 태그로 변환하여 출력했습니다. 이때 <code>key</code> 값이 필수적입니다.
                                    </>
                                ) : (
                                    <>
                                        1. <strong>POST 메서드:</strong> 단순 조회가 아닌 '생성/요청'을 위해 <code>method: 'POST'</code>를 사용하고 데이터를 <code>body</code>에 담아 보냈습니다.<br />
                                        2. <strong>JSON 직렬화:</strong> 자바스크립트 객체를 서버가 읽을 수 있도록 <code>JSON.stringify()</code>를 통해 문자열로 바꿨습니다.<br />
                                        3. <strong>201 Created:</strong> 서버는 요청을 잘 처리했다는 의미로 200이 아닌 201 상태 코드를 반환했습니다.
                                    </>
                                )}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Practice;
