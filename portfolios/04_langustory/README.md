# ⚙️ 랑구스토리

> **Project** | 한국어 교원들을 위한 AI 교안 생성 플랫폼 프론트엔드 프로젝트
> **Period** | 2025.11 ~ 2026.03
> **Role** | 프론트엔드 개발
> **Focus** | 사용자 페이지와 관리자 페이지를 함께 개발하며, **Feature-Sliced Design(FSD)** 기반으로 구조를 설계하고 유지보수성과 확장성을 고려한 프론트엔드 아키텍처를 정리·적용
> **Note** | 세부 코드와 내부 기능은 비공개이며, 이 문서에서는 **아키텍처, 폴더 구조, 상태 관리 기준, 협업 컨벤션** 중심으로 정리했습니다.

<p align="center">
  <img alt="React" src="https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB&style=for-the-badge"/>
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white&style=for-the-badge"/>
  <img alt="Vite" src="https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white&style=for-the-badge"/>
  <img alt="Zustand" src="https://img.shields.io/badge/Zustand-000000?style=for-the-badge"/>
  <img alt="TanStack Query" src="https://img.shields.io/badge/TanStack_Query-FF4154?logo=reactquery&logoColor=white&style=for-the-badge"/>
  <img alt="Axios" src="https://img.shields.io/badge/Axios-5A29E4?logo=axios&logoColor=white&style=for-the-badge"/>
  <img alt="zod" src="https://img.shields.io/badge/zod-3E67B1?style=for-the-badge"/>
  <img alt="styled-components" src="https://img.shields.io/badge/styled--components-DB7093?logo=styled-components&logoColor=white&style=for-the-badge"/>
</p>

---

## 📝 프로젝트 소개

랑구스토리는 한국어 교원들을 위한 AI 교안 생성 플랫폼입니다.
저는 이 프로젝트에서 **사용자 페이지와 관리자 페이지 프론트엔드 개발**을 담당했으며, 기능이 계속 확장되는 서비스 특성에 맞춰 **지속적으로 유지보수 가능한 구조를 만드는 것**에 집중했습니다.

단순히 화면을 구현하는 데 그치지 않고, 사용자/관리자 영역을 함께 고려한 구조 설계, 상태 관리 기준 정리, 공통 UI와 개발 규칙 정립까지 프론트엔드 전반의 기반을 다듬는 역할을 맡았습니다.

### 🔹 담당 범위

- 사용자 페이지 개발
- 관리자 페이지 개발
- 사용자/관리자 페이지 구조 설계
- 상태 관리 및 데이터 흐름 정리
- 공통 UI 및 개발 규칙 정리

---

## 🛠 사용 기술

- **Core**: React, TypeScript, Vite
- **Routing**: react-router-dom
- **Client State**: Zustand
- **Server State**: TanStack Query
- **API**: Axios
- **Validation**: zod
- **Styling**: styled-components

---

## 🧩 설계 배경

이 프로젝트는 사용자 영역과 관리자 영역이 함께 존재하고, 기능이 지속적으로 추가되는 구조였습니다.
이런 환경에서는 페이지 단위로 로직이 커지기 쉽고, API 처리·상태 관리·UI 책임이 한곳에 섞이면서 구조가 빠르게 복잡해질 수 있다고 판단했습니다.

이를 줄이기 위해 **FSD의 레이어 분리 방식과 기능 중심 구조**를 바탕으로, 화면 단위보다 **기능 단위로 책임을 분리하는 구조**를 적용했습니다.

---

## 🏗 아키텍처 방향

### 1️⃣ 레이어 분리

프로젝트 구조는 **Feature-Sliced Design(FSD)** 을 기반으로 역할에 따라 레이어를 구분했습니다.

`app → pages → widgets → features → entities → shared`

- **app**: 앱 초기화, 전역 설정, 라우팅, Provider 구성
- **pages**: 라우트와 직접 연결되는 화면 단위
- **widgets**: 페이지를 구성하는 큰 UI 블록
- **features**: 사용자 액션 단위 기능
- **entities**: 도메인 모델과 데이터 구조
- **shared**: 공통 UI, 유틸, 설정, API 클라이언트

이 구조를 통해 화면 구성과 비즈니스 로직, 공통 자산의 책임을 명확히 나누고자 했습니다.

### 2️⃣ 기능 중심 구조

페이지별로 로직을 모으기보다, **폼 처리·인증 흐름·데이터 조회/수정**처럼 사용자 행동 단위로 기능을 분리했습니다.
덕분에 기능별 책임 범위를 더 명확히 하고, 수정 시 영향 범위를 파악하기 쉬운 구조를 만들 수 있었습니다.

### 3️⃣ 상태 관리 기준 분리

상태는 목적에 따라 구분해 관리했습니다.

- **TanStack Query**: 서버 데이터 조회, 캐싱, 비동기 요청 상태
- **Zustand**: UI 흐름, 로컬 상호작용, 전역 클라이언트 상태

이를 통해 서버 상태와 화면 상태가 뒤섞이지 않도록 하고, 데이터 흐름을 더 예측 가능하게 유지했습니다.

### 4️⃣ API 계층 분리

화면 컴포넌트가 직접 API 처리 로직을 갖지 않도록 통신 계층과 조회/수정 계층의 역할을 분리했습니다.
또한 입력값과 데이터 구조를 명확하게 다루기 위해 검증 로직도 별도로 관리할 수 있도록 정리했습니다.

---

## 📁 폴더 구조 원칙

`src/`
` ┣ app/`
` ┣ pages/`
` ┣ widgets/`
` ┣ features/`
` ┣ entities/`
` ┣ shared/`
` ┗ main.tsx`

- **app**: 전역 설정과 앱 진입 구성
- **pages**: 라우터와 연결되는 페이지 단위
- **widgets**: 페이지를 구성하는 조립형 UI 블록
- **features**: 사용자 액션 중심의 기능 단위
- **entities**: 서비스 전반에서 사용하는 도메인 모델
- **shared**: 공통 컴포넌트, 유틸, 스타일, 설정

---

## 🧭 네이밍 및 관리 규칙

협업 과정에서 파일과 폴더의 역할을 빠르게 파악할 수 있도록 기본 규칙을 정리해 적용했습니다.

### 🔹 폴더 규칙

- 도메인/기능 폴더: `camelCase`
- UI 컴포넌트 폴더: `PascalCase`

### 🔹 파일 규칙

- 컴포넌트: `PascalCase.tsx`
- 훅: `useName.ts`
- API: `name.api.ts`
- 스키마: `name.schema.ts`
- 스토어: `useName.store.ts`
- 쿼리: `useName.query.ts`
- 뮤테이션: `useName.mutation.ts`
- 타입: `name.type.ts`
- 상수: `name.constant.ts`
- 스타일: `name.style.ts`
- 공개 export: `index.ts`

이 규칙은 단순한 형식 통일보다는, **이름만으로 역할을 빠르게 이해할 수 있는 구조**를 만드는 데 목적이 있습니다.

---

## ✅ 기여한 부분

이 프로젝트에서 특히 집중한 부분은 다음과 같습니다.

- 사용자 페이지와 관리자 페이지를 함께 고려한 구조 설계
- FSD 기반의 기능 단위 책임 분리 구조 적용
- 공통 UI, 공통 유틸, 공통 API 처리 기준 정리
- 상태 관리 목적에 따른 역할 분리
- 협업을 위한 파일/폴더 규칙 및 개발 패턴 정리

---

## 🌱 기대 효과

정량 수치나 내부 운영 정보는 공개할 수 없지만, 다음과 같은 구조적 효과를 목표로 설계하고 개발했습니다.

- 기능 추가 시 수정 범위를 예측하기 쉬운 구조
- 반복 패턴을 줄일 수 있는 공통화 기반 마련
- 화면 로직과 데이터 처리 로직의 책임 분리
- 확장성과 유지보수성을 고려한 개발 환경 정리
- 협업 시 구조 이해 비용 감소

---

## 💭 회고

이 프로젝트는 단순히 화면을 구현하는 데서 끝나는 것이 아니라,
기능이 계속 확장되는 서비스에서 **어떤 구조가 장기적으로 더 유리한가**를 고민하게 만든 경험이었습니다.

특히 프론트엔드에서도 구조 설계와 책임 분리가 개발 생산성과 협업 효율에 직접적인 영향을 준다는 점을 다시 확인할 수 있었고, 앞으로도 기능 구현과 함께 **프로젝트에 맞는 아키텍처를 설계하고 정리하는 역할**을 중요하게 가져가고 싶습니다.
