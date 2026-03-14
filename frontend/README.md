# React + Vite

이 템플릿은 Vite에서 React가 HMR 및 몇 가지 ESLint 규칙과 함께 작동하도록 하기 위한 최소한의 설정을 제공합니다.

현재 두 가지 공식 플러그인을 사용할 수 있습니다:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react)는 Fast Refresh를 위해 [Babel](https://babeljs.io/)을 사용합니다. ([rolldown-vite](https://vite.dev/guide/rolldown)와 함께 사용할 경우 [oxc](https://oxc.rs) 사용)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc)는 Fast Refresh를 위해 [SWC](https://swc.rs/)를 사용합니다.

## React Compiler

React Compiler는 현재 SWC와 호환되지 않습니다. 진행 상황을 추적하려면 [이 이슈(issue)](https://github.com/vitejs/vite-plugin-react/issues/428)를 확인하세요.

## ESLint 구성 확장하기

프로덕션 애플리케이션을 개발하는 경우, 타입 인지(type-aware) 린트 규칙이 활성화된 TypeScript를 사용하는 것을 권장합니다. 프로젝트에 TypeScript와 [`typescript-eslint`](https://typescript-eslint.io)를 통합하는 방법에 대한 정보는 [TS 템플릿](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts)을 확인하세요.
