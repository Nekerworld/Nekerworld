---
title: "CSS Grid로 레이아웃 마스터하기"
date: "2024-01-05"
category: "CSS"
tags: ["CSS", "Grid", "Layout"]
excerpt: "CSS Grid를 활용한 현대적인 웹 레이아웃 설계 방법을 공유합니다."
---

# CSS Grid로 레이아웃 마스터하기

CSS Grid는 2차원 레이아웃 시스템으로, 복잡한 레이아웃을 쉽게 만들 수 있습니다.

## Grid Container

Grid를 사용하려면 컨테이너에 `display: grid`를 설정해야 합니다.

```css
.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 100px 200px;
  gap: 20px;
}
```

## Grid Items 배치

Grid 아이템을 배치하는 방법입니다.

```css
.item {
  grid-column: 1 / 3;
  grid-row: 1 / 2;
}

/* 또는 */
.item {
  grid-area: 1 / 1 / 2 / 3;
}
```

## 반응형 Grid

미디어 쿼리와 함께 사용하면 반응형 레이아웃을 만들 수 있습니다.

```css
.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}
```

## Grid vs Flexbox

- Grid: 2차원 레이아웃 (행과 열)
- Flexbox: 1차원 레이아웃 (행 또는 열)

## 결론

CSS Grid를 활용하면 복잡한 레이아웃도 쉽게 구현할 수 있습니다. Grid와 Flexbox를 적절히 조합하여 사용하는 것이 좋습니다.

