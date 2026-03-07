import React from 'react';

const Workbook = ({ type }) => {
    const content = {
        react: {
            title: "프론트엔드: React & Vite (눈에 보이는 화면 담당)",
            sections: [
                {
                    topic: "React = '척척박사 종이'",
                    content: "원래 웹사이트는 한 글자만 바뀌어도 종이 전체를 새로 갈아끼워야 했어요. 하지만 React는 바뀐 부분만 싹 지우고 새로 써주는 '똑똑한 종이'예요. 덕분에 화면이 끊김 없이 부드럽게 움직이는 거죠."
                },
                {
                    topic: "Vite = '빛속도 조리사'",
                    content: "여러분이 쓴 코드를 브라우저가 읽을 수 있게 요리해주는 도구예요. 너무 빨라서 'Vite(프랑스어로 빠르다는 뜻)'라는 이름이 붙었죠. 코드 한 줄 고치자마자 0.1초 만에 화면에 결과가 나타나는 마법의 주인공이에요."
                },
                {
                    topic: "컴포넌트 = '레고 블록'",
                    content: "웹사이트 전체를 한 번에 만드는 게 아니라 로고, 버튼, 메뉴 같은 걸 따로따로 만들어서 조립하는 방식이에요. 나중에 버튼 모양만 바꾸고 싶을 때 그 블록 하나만 고치면 되니 정말 편하겠죠?"
                }
            ]
        },
        flask: {
            title: "백엔드: Flask & Swagger (눈에 안 보이는 일꾼 담당)",
            sections: [
                {
                    topic: "Flask = '주방장'",
                    content: "손님(React)이 '메뉴판 주세요!'라고 주문을 하면, 안보이는 주방(서버)에서 요리를 해서 가져다주는 주방장 역할을 해요. 파이썬이라는 쉬운 언어로 요리법을 적어두면 그대로 실행해준답니다."
                },
                {
                    topic: "API = '서빙 창구'",
                    content: "주방과 홀(프론트엔드) 사이에서 음식이 오가는 작은 창구예요. 정해진 규칙대로만 음식을 달라고 하면 주방장이 이 창구를 통해 딱 맞는 데이터를 보내줍니다."
                },
                {
                    topic: "Swagger = '사진이 있는 메뉴판'",
                    content: "주방장이 어떤 요리(기능)를 할 수 있는지 그림과 설명으로 정리해둔 안내책이에요. 버튼만 누르면 실제로 어떤 결과가 나오는지 미리 맛볼 수 있는 아주 친절한 설명서랍니다."
                },
                {
                    topic: "Supabase = '안전한 대형 창고'",
                    content: "사용자 정보나 글 목록 같은 소중한 데이터들을 오랫동안 보관하는 금고예요. 주방장이 필요할 때마다 이 창고에서 재료를 꺼내서 요리를 합니다."
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
