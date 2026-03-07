import React, { useState } from 'react';

const Practice = ({ type }) => {
    const [input, setInput] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleTest = async () => {
        setLoading(true);
        try {
            if (type === 'react') {
                setResult(`React 실습: 입력값 "${input}" 검증 중... 성공!`);
            } else {
                const response = await fetch('http://localhost:5000/api/workbook/flask');
                const data = await response.json();
                setResult(`백엔드 응답: ${JSON.stringify(data, null, 2)}`);
            }
        } catch (err) {
            setResult(`에러: ${err.message}. 백엔드가 http://localhost:5000 에서 실행 중인지 확인하세요.`);
        }
        setLoading(false);
    };

    return (
        <div className="practice-container">
            <h2>{type === 'react' ? 'React 실습실' : 'Flask API 실습실'}</h2>
            <div className="glass-card practice-area">
                <p>{type === 'react' ? 'React' : 'Flask'} 로직을 테스트하기 위해 내용을 입력하세요:</p>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="여기에 입력하세요..."
                />
                <button onClick={handleTest} disabled={loading}>
                    {loading ? '실행 중...' : '실습 실행'}
                </button>

                {result && (
                    <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ padding: '1rem', background: 'rgba(0,0,0,0.3)', borderRadius: '8px' }}>
                            <strong style={{ color: 'var(--primary)', display: 'block', marginBottom: '0.5rem' }}>실행 결과:</strong>
                            <pre style={{ margin: 0, whiteSpace: 'pre-wrap', fontSize: '0.9rem' }}>
                                {result}
                            </pre>
                        </div>

                        <div style={{ padding: '1rem', background: 'rgba(99, 102, 241, 0.1)', borderLeft: '4px solid var(--primary)', borderRadius: '4px' }}>
                            <strong style={{ display: 'block', marginBottom: '0.5rem' }}>💡 왜 이런 결과가 나오나요?</strong>
                            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                                {type === 'react' ? (
                                    <>
                                        1. <strong>상태 업데이트:</strong> 입력창에 글자를 쓰면 <code>useState</code>를 통해 <code>input</code> 변수가 실시간으로 바뀝니다.<br />
                                        2. <strong>리렌더링:</strong> 버튼을 누르면 React가 화면을 다시 그리며 입력된 값을 결과 메시지에 포함시켜 보여줍니다.<br />
                                        3. <strong>순수 JS 로직:</strong> 이 실습은 백엔드까지 가지 않고 브라우저(프론트엔드) 내부에서만 처리되었습니다.
                                    </>
                                ) : (
                                    <>
                                        1. <strong>HTTP 요청:</strong> 브라우저가 <code>fetch</code> 함수를 사용해 <code>http://localhost:5000/api/workbook/flask</code> 주소로 데이터를 요청했습니다.<br />
                                        2. <strong>Flask 처리:</strong> 파이썬 서버(app.py)가 이 요청을 받고 <code>jsonify</code> 함수를 통해 데이터를 JSON 형식으로 변환해 응답했습니다.<br />
                                        3. <strong>데이터 바인딩:</strong> 프론트엔드는 받은 JSON 데이터를 문자열로 변환하여 실시간으로 화면에 출력한 것입니다.
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
