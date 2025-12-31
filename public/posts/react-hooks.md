---
title: "React Hooks 완전 정리"
date: "2024-01-15"
category: "React"
tags: ["React", "Hooks", "JavaScript"]
excerpt: "useState, useEffect, useContext 등 React Hooks에 대해 자세히 알아보겠습니다."
series: "React 학습"
seriesOrder: 1
---

# React Hooks 완전 정리

React Hooks는 함수형 컴포넌트에서 상태 관리와 생명주기 기능을 사용할 수 있게 해주는 기능입니다.

## useState

`useState`는 가장 기본적인 Hook으로, 함수형 컴포넌트에서 상태를 관리할 수 있게 해줍니다.

```javascript
import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)
  
  return (
    <div>
      <p>현재 카운트: {count}</p>
      <button onClick={() => setCount(count + 1)}>증가</button>
    </div>
  )
}
```

### useState의 특징

- 상태 변경 시 컴포넌트가 리렌더링됩니다
- 비동기적으로 상태가 업데이트됩니다
- 여러 개의 useState를 사용할 수 있습니다

## useEffect

`useEffect`는 함수형 컴포넌트에서 side effect를 수행할 수 있게 해줍니다.

```javascript
import { useState, useEffect } from 'react'

function UserProfile({ userId }) {
  const [user, setUser] = useState(null)
  
  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(data => setUser(data))
  }, [userId]) // userId가 변경될 때만 실행
  
  return <div>{user?.name}</div>
}
```

### useEffect의 의존성 배열

- 빈 배열 `[]`: 컴포넌트 마운트 시 한 번만 실행
- 의존성 포함: 해당 값이 변경될 때마다 실행
- 의존성 없음: 매 렌더링마다 실행

## useContext

`useContext`는 Context를 사용할 수 있게 해주는 Hook입니다.

```javascript
import { createContext, useContext } from 'react'

const ThemeContext = createContext('light')

function ThemedButton() {
  const theme = useContext(ThemeContext)
  return <button className={theme}>버튼</button>
}
```

## 결론

React Hooks를 사용하면 함수형 컴포넌트에서도 클래스형 컴포넌트의 기능을 사용할 수 있습니다. 이를 통해 더 간결하고 재사용 가능한 코드를 작성할 수 있습니다.

