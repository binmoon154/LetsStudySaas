import React from 'react';

const Workbook = ({ type }) => {
    const content = {
        react: {
            title: "React & Vite: 프론트엔드 마스터 과정",
            sections: [
                {
                    topic: "1. State (상태) - 화면의 기억력",
                    content: "UI는 고정된 것이 아니라 데이터에 따라 변합니다. '상태'는 컴포넌트가 기억하고 있는 데이터입니다. 이 '기억'이 바뀌면 React는 번개 같은 속도로 화면의 바뀐 부분만 다시 그려냅니다."
                },
                {
                    topic: "2. Props (속성) - 부모와 자식의 대화",
                    content: "컴포넌트는 레고 블록처럼 서로 조립됩니다. 부모 블록이 자식 블록에게 정보를 넘겨줄 때 'Props'라는 바구니에 담아 보냅니다. 이를 통해 코드는 더 깔끔해지고 재사용하기 좋아집니다."
                },
                {
                    topic: "3. useEffect - 외부와의 소통",
                    content: "화면이 처음 나타날 때(Mount) 백엔드에서 데이터를 가져오거나, 특정 값이 바뀔 때마다 실행해야 하는 작업들을 담당하는 도구(Hook)입니다."
                },
                {
                    topic: "4. 리스트와 키 (Lists & Keys)",
                    content: "수많은 데이터를 효율적으로 화면에 뿌릴 때는 반복문을 사용합니다. 이때 각 항목에 'Key'라는 고유 번호표를 붙여주면 React가 훨씬 똑똑하게 화면을 관리할 수 있습니다."
                }
            ]
        },
        flask: {
            title: "Flask & API: 백엔드 아키텍처 이해",
            sections: [
                {
                    topic: "1. 라우팅 (Routing) - 길 찾기",
                    content: "사용자가 어떤 주소(/login, /signup)로 들어왔을 때 어떤 파이썬 기능을 실행할지 길을 안내하는 지도 역할을 합니다. 주소 뒤에 숫자를 붙여 특정 데이터만 가져올 수도 있죠."
                },
                {
                    topic: "2. HTTP 메서드 (GET vs POST)",
                    content: "단순히 데이터를 가져올 때는 GET, 게시글을 쓰거나 로그인을 할 때는 POST를 사용합니다. 이렇게 명령의 성격을 명확히 구분하는 것이 좋은 API의 시작입니다."
                },
                {
                    topic: "3. JSON 데이터 처리",
                    content: "프론트엔드와 백엔드는 서로 'JSON'이라는 공통 언어로만 대화합니다. Flask는 파이썬의 복잡한 데이터를 전 세계 누구나 읽을 수 있는 JSON 포맷으로 변환해주는 번역가입니다."
                },
                {
                    topic: "4. Status Code (응답 상태 코드)",
                    content: "200(성공), 201(새로 생성됨), 404(못 찾음), 500(서버 고장) 등 숫자를 통해 지금 상황이 어떤지 클라이언트에게 명확하게 알려주는 약속입니다."
                }
            ]
        }
    };

    const activeContent = content[type] || content.react;

    return (
        <div className="workbook-container">
            <h2>{activeContent.title}</h2>
            <div className="grid">
                {activeContent.sections.map((section, idx) => (
                    <div key={idx} className="glass-card">
                        <h3>{section.topic}</h3>
                        <p style={{ color: 'var(--text-muted)' }}>{section.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Workbook;
