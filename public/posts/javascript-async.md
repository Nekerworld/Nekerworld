---
title: "JavaScript 비동기 처리 이해하기"
date: "2024-01-10"
category: "JavaScript"
tags: ["JavaScript", "Async", "Promise"]
excerpt: "Promise, async/await를 활용한 비동기 프로그래밍 패턴을 정리했습니다."
---

# JavaScript 비동기 처리 이해하기

JavaScript는 싱글 스레드 언어이지만, 비동기 처리를 통해 효율적으로 작업을 수행할 수 있습니다.

## Callback

전통적인 JavaScript 비동기 처리 방식입니다.

```javascript
function fetchData(callback) {
  setTimeout(() => {
    callback('데이터')
  }, 1000)
}

fetchData((data) => {
  console.log(data)
})
```

### Callback의 문제점

- Callback Hell: 여러 비동기 작업이 중첩되면 코드가 복잡해집니다
- 에러 처리 어려움

## Promise

Promise는 비동기 작업의 결과를 나타내는 객체입니다.

```javascript
function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('데이터')
    }, 1000)
  })
}

fetchData()
  .then(data => console.log(data))
  .catch(error => console.error(error))
```

### Promise의 장점

- 체이닝을 통해 연속적인 비동기 작업을 처리할 수 있습니다
- 에러 처리가 용이합니다

## async/await

async/await는 Promise를 더 쉽게 사용할 수 있게 해주는 문법입니다.

```javascript
async function fetchData() {
  try {
    const data = await fetch('/api/data')
    const json = await data.json()
    console.log(json)
  } catch (error) {
    console.error(error)
  }
}
```

### async/await의 장점

- 동기 코드처럼 보이게 작성할 수 있습니다
- 에러 처리가 간단합니다
- 가독성이 좋습니다

## 결론

현대적인 JavaScript 개발에서는 async/await를 주로 사용하며, Promise를 이해하는 것이 중요합니다.

