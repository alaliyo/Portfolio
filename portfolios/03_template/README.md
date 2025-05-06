# ⚙️ MVVM React Starter Template

> **Author** | 김성원 (Solo Design & Code)  
> **Purpose** | 실무 프로젝트를 빠르게 시작할 수 있는 **MVVM + Zustand** 기반 골격 및 프로젝트 설계  
> **Note** | 포트폴리오용으로 **일부 소스가 제거**되어 바로 실행 시 컴파일 오류가 날 수 있습니다.

> 💡 **Solo Ownership**  
> 이 템플릿의 **아키텍처 설계, 폴더 구조, 코딩 컨벤션, 문서화** 전 과정을 **혼자** 고민하고 구현했습니다.


<p align="center">
  <img alt="React" src="https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB&style=for-the-badge"/>
  <img alt="TypeScript" src="https://img.shields.io/badge/TS-3178C6?logo=typescript&logoColor=white&style=for-the-badge"/>
  <img alt="Zustand" src="https://img.shields.io/badge/Zustand-000?logo=Zustand&logoColor=white&style=for-the-badge"/>
  <img alt="Styled Components" src="https://img.shields.io/badge/styled--components-DB7093?logo=styled-components&logoColor=white&style=for-the-badge"/>
</p>

---

## 📌 Template Highlights
| 카테고리 | 내용 |
|----------|------|
| **Architecture** | MVVM 3‑Layer (Page ➜ Custom Hook ➜ Service ➜ apiClient) |
| **State Mgmt** | Zustand – 전역 `auth`, `ui`, `domain` 스토어 예시 |
| **Data Layer** | Axios `apiClient` Interceptor + 유형별 `apiService` 함수 |
| **Styling** | Styled‑Components 동적 스타일 |

---

## 🔑 Key Contributions (내가 한 일)
1. **MVVM 아키텍처 설계 & 가이드 문서화**  
   - Page 컴포넌트 → Custom Hook → Service → apiClient 흐름 정의  
   - `README`, Notion Wiki에 패턴·코딩 컨벤션 정리

2. **Zustand 전역 스토어 구축**  
   - `authStore`(JWT), `uiStore`(모달·로딩), `domainStore` 예시 작성  
   - Immer 미들웨어로 불변성 자동 관리

3. **apiClient & Error Handling**  
   - Axios Interceptor로 Access/Refresh Token 자동 교체  
   - 커스텀 오류 코드별 Toast 알림 & Fallback UI 구현

--- 

## 📂 Folder Structure
src/     
├── api/ # apiClient · Service 래퍼       
├── components/ # Button, Modal 등 (예시)       
├── dtos/ # DTO 정의        
├── hooks/ # useAuth, useLogin 등       
├── pages/ # LoginPage 등       
├── store/ # Zustand stores       
├── styles/ # GlobalStyle, theme.ts       
├── types/ # 전역 인터페이스       
├── App.tsx          
└── Router.tsx          

---