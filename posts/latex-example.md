---
title: "LaTeX 수식 예제"
date: "2024-12-31"
category: "기타"
tags: ["LaTeX", "수식", "예제"]
excerpt: "LaTeX 수식 사용법을 보여주는 예제 문서입니다."
---

# LaTeX 수식 예제

이 문서는 블로그에서 LaTeX 수식을 사용하는 방법을 보여줍니다.

## 인라인 수식

인라인 수식은 `$...$`로 감싸서 사용합니다. 예를 들어, 아인슈타인의 질량-에너지 등가 공식은 $E = mc^2$입니다.

다른 예시로, 이차 방정식의 근의 공식은 $x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$입니다.

## 블록 수식

블록 수식은 `$$...$$`로 감싸서 사용합니다. 별도의 줄에 중앙 정렬로 표시됩니다.

### 적분 예제

$$
\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}
$$

### 합 공식

$$
\sum_{i=1}^{n} i = \frac{n(n+1)}{2}
$$

### 행렬 예제

$$
\begin{pmatrix}
a & b \\
c & d
\end{pmatrix}
\begin{pmatrix}
x \\
y
\end{pmatrix}
=
\begin{pmatrix}
ax + by \\
cx + dy
\end{pmatrix}
$$

### 복잡한 수식 예제

$$
f(x) = \lim_{n \to \infty} \sum_{i=0}^{n} \frac{f^{(i)}(a)}{i!}(x-a)^i
$$

$$
\nabla \times \vec{F} = \begin{pmatrix}
\frac{\partial F_z}{\partial y} - \frac{\partial F_y}{\partial z} \\
\frac{\partial F_x}{\partial z} - \frac{\partial F_z}{\partial x} \\
\frac{\partial F_y}{\partial x} - \frac{\partial F_x}{\partial y}
\end{pmatrix}
$$

## 참고

- 인라인 수식: `$수식$`
- 블록 수식: `$$수식$$`
- KaTeX를 사용하여 렌더링됩니다.

