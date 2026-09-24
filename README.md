<p align="center">
  <img src="./assets/header.svg" width="100%" alt="Yoonsung Kim — Electronic Engineering × Artificial Intelligence" />
</p>

<p align="center">
  <b>전자공학과 인공지능을 기반으로, 센서와 제어부터 AI와 서비스까지 하나의 시스템으로 연결하는 개발자입니다.</b>
</p>

<p align="center">
  <a href="https://github.com/Nekerworld">GitHub</a> ·
  <a href="https://velog.io/@nekerworld/posts">Velog</a> ·
  <a href="mailto:chrisabc94@gmail.com">Email</a>
</p>

---

## About Me

전자공학을 전공하며 회로, 디지털 논리, MCU와 제어를 학습했고, 이후 인공지능을 함께 공부하며 Computer Vision과 Recommendation System까지 영역을 확장했습니다. 특정 기술 하나보다 **Hardware → Embedded → Control → AI → Software**가 연결되어 실제 문제를 해결하는 과정에 관심이 있습니다.

- **Education** — Tech University of Korea, Electronic Engineering · Artificial Intelligence
- **Training** — Samsung Software Academy For Youth (SSAFY)
- **Interests** — Intelligent Embedded Systems · Robotics · Computer Vision · Applied AI
- **Focus** — Building complete systems, not isolated features

## Highlights

| | Highlight |
|---|---|
| 🏆 | AI · Embedded · Robotics 프로젝트 및 경진대회 **5회 수상** |
| 🔬 | Matrix Factorization + GNN 기반 추천 시스템 연구 **제1저자** |
| 🤖 | UWB · Vision · STM32 기반 **자율 환자 추종 스마트 링거폴대** 개발 |
| ⚙️ | Embedded Hardware → Control → AI → Web/Cloud까지 이어지는 시스템 개발 경험 |

---

# Featured Projects

## Autonomous Smart IV Pole

> **UWB와 Vision Sensor를 이용해 환자를 인식하고 자율 추종하는 Mapless 의료 보조 시스템**

<p align="center">
  <img src="./assets/ivpole.gif" width="88%" alt="Autonomous Smart IV Pole demo" />
</p>

**Problem**  
환자가 이동할 때 링거폴대를 직접 끌어야 하는 불편을 줄이고, 복잡한 병원 환경에서도 별도의 지도 없이 환자를 안정적으로 추종하는 것을 목표로 했습니다.

**Solution**  
UWB 기반 거리 측정과 양측 Vision Sensor를 결합하고, 환자와의 거리·방향으로부터 곡률을 계산해 이동 속도와 조향을 제어하는 자율 추종 시스템을 구현했습니다.

**My Contribution**
- YOLO 기반 환자 자동 인식
- Curvature 기반 추종 알고리즘 설계
- STM32 기반 이동 및 모터 제어
- UWB · Vision · Ultrasonic Sensor Fusion
- 시스템 통합, QC 및 주행 테스트

**Tech** `STM32` `ESP32` `UWB` `Computer Vision` `YOLO` `Embedded C` `Sensor Fusion` `AWS`

**Result** — 한국공학대학교 전자공학부 **학부장상**

[View Repository →](https://github.com/Wake-Up-It-s-a-Hospital)

---

## Hybrid Retrieve–then–Rank Recommendation System

> **Matrix Factorization의 검색 효율성과 Graph Neural Network의 표현력을 결합한 대규모 추천 프레임워크**

**Problem**  
대규모 전자상거래 환경에서 모든 사용자–상품 조합을 복잡한 딥러닝 모델로 직접 평가하면 계산 비용이 급격히 증가합니다.

**Approach**  
Matrix Factorization을 후보 검색 단계에 사용하고, Graph Neural Network를 Ranking 단계에 적용하는 **Retrieve–then–Rank 구조**를 설계해 효율성과 추천 성능을 함께 다루었습니다.

**My Contribution**
- Hybrid recommendation architecture 설계 및 실험
- Matrix Factorization 기반 candidate retrieval
- GNN 기반 ranking model 구성
- 대규모 e-commerce interaction data 실험 및 분석
- 논문 작성 — **First Author**

**Tech** `Python` `PyTorch` `Recommendation System` `Matrix Factorization` `GNN`

**Research** — *A Hybrid Retrieve–then–Rank Framework Integrating Matrix Factorization and Graph Neural Networks*  
IEEE Access · First Author · Revision in progress

---

## Refactory

> **LLM을 활용해 GitHub Pull Request의 코드 리뷰를 자동화하는 개발자 협업 플랫폼**

<p align="center">
  <img src="./assets/refactory.gif" width="88%" alt="Refactory demo" />
</p>

**Problem**  
팀 프로젝트에서 반복적인 코드 리뷰의 부담을 줄이고, 개발자가 Pull Request 단계에서 빠르게 피드백을 받을 수 있는 환경을 만들고자 했습니다.

**Solution**  
GitHub Pull Request와 LLM을 연결해 코드 변경 사항을 분석하고 자동 리뷰 결과를 제공하는 웹 플랫폼을 개발했습니다.

**My Contribution**
- Frontend Development
- UI / UX Design
- 코드 리뷰 결과와 사용자 흐름을 고려한 인터페이스 설계

**Tech** `React` `JavaScript` `LLM` `GitHub` `UI/UX`

**Result** — Techeer Winter BootCamp **공동 3위**

[View Repository →](https://github.com/2024-Winter-BootCamp-TeamD)

---

## Smart Farm

> **YOLOv8 기반 작물 성장 판단과 자동 생육 관리를 결합한 수경재배 스마트팜**

Computer Vision을 이용해 작물 상태를 판단하고, Embedded System과 연계해 생육 환경을 자동으로 관리하는 시스템을 구현했습니다.

**Tech** `YOLOv8` `Computer Vision` `Embedded System` `Automation`

**Result** — 제8회 임베디드 시스템 경진대회 **최우수상**

---

# Research

### A Hybrid Retrieve–then–Rank Framework Integrating Matrix Factorization and Graph Neural Networks

대규모 추천 시스템에서 발생하는 계산 비용 문제를 다루기 위해 Matrix Factorization 기반 Retrieval과 Graph Neural Network 기반 Ranking을 결합한 하이브리드 추천 구조를 연구했습니다.

| Item | Information |
|---|---|
| Role | **First Author** |
| Journal | IEEE Access |
| Publisher | IEEE |
| Field | Recommender Systems · Graph Neural Networks |
| Status | 최초 제출 후 Revision 대기 중 |

---

# Awards

| Year | Award | Project / Competition |
|---:|---|---|
| 2025 | 🏅 **학부장상** | 환자 추종 스마트 링거폴대 · 한국공학대학교 전자공학부 |
| 2024 | 🥇 **최우수상** | 수경재배식 스마트팜 · 제8회 임베디드 시스템 경진대회 |
| 2024 | 🥈 **은상** | Waveshare JetRacer · 제2회 미래형 자동차 자율주행 경진대회 |
| 2024 | 🥉 **공동 3위** | Refactory · Techeer Winter BootCamp |
| 2024 | 🎖️ **장려상** | EV3 Robot Programming · 제5회 총장배 로봇 프로그래밍 경진대회 |

---

# Technical Skills

**Core**  
`Python` `C` `C++` `STM32` `ESP32` `PyTorch` `Computer Vision` `Embedded Systems`

**AI / Data**  
`PyTorch` `TensorFlow` `Keras` `YOLO` `GNN` `Recommendation System`

**Embedded / Engineering**  
`STM32` `ESP32` `PlatformIO` `Verilog` `Quartus` `PSpice` `Motor Control` `Sensor Fusion`

**Software / Web**  
`JavaScript` `TypeScript` `React` `Vue` `Vite` `Django` `MySQL` `Firebase`

---

# Engineering Background

| Area | Experience |
|---|---|
| Digital Logic | Verilog · Quartus |
| Circuit Design | PSpice · Electronic Circuit Design |
| Microcontroller | STM32 · ESP32 |
| Control | Motor Control · Curvature-based Tracking |
| Computer Vision | YOLO · Camera-based Object Recognition |
| Artificial Intelligence | Deep Learning · Recommendation System · GNN |
| Software Engineering | Frontend · Backend · Cloud |

---

# Certification

| Certification | Organization | Acquired |
|---|---|---:|
| 데이터분석 준전문가 ADsP | 한국데이터산업진흥원 | 2026.06 |

---

# GitHub Activity

<p align="center">
  <img width="55%" src="https://github-readme-stats.vercel.app/api?username=Nekerworld&show_icons=true&theme=github_dark&hide_border=true&count_private=true&include_all_commits=true" alt="Nekerworld GitHub Stats" />
</p>

---

# Contact

<p align="center">
  <a href="https://github.com/Nekerworld"><b>GitHub</b></a> ·
  <a href="https://velog.io/@nekerworld/posts"><b>Velog</b></a> ·
  <a href="mailto:chrisabc94@gmail.com"><b>Email</b></a>
</p>

<p align="center">
  <sub>From circuits to intelligence — building complete systems from hardware to AI.</sub>
</p>
