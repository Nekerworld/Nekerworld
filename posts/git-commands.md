---
title: "Git 명령어 정리"
date: "2024-01-01"
category: "Git"
tags: ["Git", "Version Control"]
excerpt: "자주 사용하는 Git 명령어들과 워크플로우를 정리했습니다."
---

# Git 명령어 정리

Git은 분산 버전 관리 시스템으로, 프로젝트의 변경 사항을 추적하고 관리할 수 있습니다.

## 기본 명령어

### 초기화 및 설정

```bash
git init                    # 저장소 초기화
git config user.name "이름"  # 사용자 이름 설정
git config user.email "이메일" # 이메일 설정
```

### 파일 추가 및 커밋

```bash
git add .                   # 모든 변경사항 스테이징
git add 파일명               # 특정 파일만 스테이징
git commit -m "메시지"       # 커밋 생성
```

### 상태 확인

```bash
git status                  # 현재 상태 확인
git log                     # 커밋 히스토리 확인
git diff                    # 변경사항 확인
```

## 브랜치 관리

```bash
git branch                  # 브랜치 목록 확인
git branch 브랜치명          # 새 브랜치 생성
git checkout 브랜치명        # 브랜치 전환
git merge 브랜치명           # 브랜치 병합
```

## 원격 저장소

```bash
git remote add origin URL   # 원격 저장소 추가
git push origin main        # 원격 저장소로 푸시
git pull origin main        # 원격 저장소에서 가져오기
git clone URL               # 저장소 복제
```

## 유용한 명령어

```bash
git stash                   # 임시 저장
git stash pop               # 임시 저장 복원
git reset HEAD~1            # 마지막 커밋 취소
git revert 커밋ID           # 특정 커밋 되돌리기
```

## 결론

Git을 잘 활용하면 프로젝트 관리가 훨씬 수월해집니다. 자주 사용하는 명령어들을 외워두면 개발 효율이 높아집니다.

