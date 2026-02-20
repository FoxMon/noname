# Bom

TypeScript 함수형 프로그래밍 유틸리티 라이브러리.
**data-first / data-last** 듀얼 시그니처와 **lazy 평가**를 지원합니다.

---

## 특징

- **듀얼 시그니처** — 모든 함수가 data-first / data-last 두 가지 방식으로 호출 가능
- **Lazy 평가** — `pipe` 내에서 `map`, `filter`, `flatMap`, `take` 등이 중간 배열 없이 연산
- **완전한 타입 안전성** — TypeScript 5.8 기반, type guard / type narrowing 지원
- **네임스페이스 지원** — `Bom.map(...)` 형태로 사용 가능

---

## 설치 (Git Submodule)

```bash
git submodule add <repo-url> src/submodules/bom
```

```typescript
// 네임스페이스 방식
import { Bom } from './submodules/bom/src';

// 개별 import 방식
import { map, filter, pipe } from './submodules/bom/src';
```

---

## 핵심 개념

### Data-first / Data-last

모든 함수는 두 가지 호출 방식을 지원합니다.

```typescript
// Data-first: 데이터를 첫 번째 인자로
map([1, 2, 3], (x) => x * 2); // [2, 4, 6]

// Data-last: 함수를 먼저 받고 데이터를 나중에
map((x) => x * 2)([1, 2, 3]); // [2, 4, 6]
```

### pipe

함수를 순서대로 합성합니다. data-last 방식과 함께 사용하는 것이 기본 패턴입니다.

```typescript
const result = pipe(
  [1, 2, 3, 4, 5],
  filter((x) => x % 2 === 0),
  map((x) => x * 10),
  take(2),
);
// [20, 40]
```

### Lazy 평가

`pipe` 안에서 lazy 지원 함수들은 **중간 배열을 생성하지 않고** 아이템을 하나씩 통과시킵니다.
`take`, `find`처럼 조기 종료가 가능한 함수는 불필요한 연산을 건너뜁니다.

```typescript
// [1..1000] 전체를 map하지 않고, take(3) 이후 즉시 중단
pipe(hugeArray, map(expensiveTransform), take(3));
```

---

## API

### 함수 합성

| 함수                     | 설명                                                       |
| ------------------------ | ---------------------------------------------------------- |
| `pipe(value, ...fns)`    | 값을 함수들에 순서대로 통과                                |
| `curry(fn, args, lazy?)` | data-first / data-last 시그니처 생성                       |
| `identity(value)`        | 입력값 그대로 반환                                         |
| `not(predicate)`         | predicate 결과를 반전. `isNot`으로도 사용 가능             |
| `tap(fn)`                | 사이드이펙트 삽입 후 원본값 반환. pipe 내 per-element 동작 |

### Array — 변환

| 함수                      | Lazy | 설명                          |
| ------------------------- | :--: | ----------------------------- |
| `map(data, fn)`           |  ✓   | 각 요소를 변환                |
| `flatMap(data, fn)`       |  ✓   | 변환 후 1단계 flatten         |
| `filter(data, predicate)` |  ✓   | 조건에 맞는 요소만 반환       |
| `forEach(data, fn)`       |      | 각 요소에 사이드이펙트 실행   |
| `reduce(data, fn, init)`  |      | 누적 값 계산                  |
| `sortBy(data, fn)`        |      | 키 함수 기준 정렬 (원본 불변) |

### Array — 검색

| 함수                         |         Lazy         | 설명                          |
| ---------------------------- | :------------------: | ----------------------------- |
| `find(data, predicate)`      | ✓ (단일값, 조기종료) | 첫 번째 일치 요소             |
| `findIndex(data, predicate)` |                      | 첫 번째 일치 인덱스           |
| `every(data, predicate)`     |                      | 모든 요소가 조건 만족 시 true |
| `some(data, predicate)`      |                      | 하나라도 조건 만족 시 true    |

### Array — 슬라이싱

| 함수            |     Lazy     | 설명            |
| --------------- | :----------: | --------------- |
| `take(data, n)` | ✓ (조기종료) | 앞에서 n개      |
| `drop(data, n)` |      ✓       | 앞에서 n개 제외 |
| `first(data)`   |              | 첫 번째 요소    |
| `last(data)`    |              | 마지막 요소     |

### Array — 그룹 / 중복제거

| 함수                         | 설명                              |
| ---------------------------- | --------------------------------- |
| `groupBy(data, fn)`          | 키 함수 기준으로 그룹화           |
| `partition(data, predicate)` | `[truthy[], falsy[]]` 튜플로 분리 |
| `countBy(data, fn)`          | 카테고리별 개수 집계              |
| `uniq(data)`                 | 중복 제거 (`===` 기준)            |
| `uniqBy(data, fn)`           | 키 함수 기준 중복 제거            |

### Array — 집계

| 함수        | 설명           |
| ----------- | -------------- |
| `sum(data)` | 숫자 배열 합계 |

### Object

| 함수                  | 설명                         |
| --------------------- | ---------------------------- |
| `keys(data)`          | 타입 안전한 `Object.keys`    |
| `values(data)`        | 타입 안전한 `Object.values`  |
| `entries(data)`       | 타입 안전한 `Object.entries` |
| `pick(data, keys)`    | 지정 키만 선택               |
| `omit(data, keys)`    | 지정 키를 제외               |
| `mapValues(data, fn)` | 값만 변환, 키 유지           |
| `prop(data, key)`     | 특정 키의 값 접근            |

### Math

| 함수                     | 설명      |
| ------------------------ | --------- |
| `add(a, b)`              | 덧셈      |
| `subtract(a, b)`         | 뺄셈      |
| `clamp(value, min, max)` | 범위 제한 |

### Type Guards

| 함수                | 설명                                |
| ------------------- | ----------------------------------- |
| `isArray(value)`    | 배열 여부                           |
| `isDefined(value)`  | `!== undefined`                     |
| `isEmpty(value)`    | 빈 배열 / 문자열 / 객체 / Map / Set |
| `isNotNull(value)`  | `!== null`                          |
| `isNullish(value)`  | `null \| undefined` 여부            |
| `isTruthy(value)`   | truthy 여부                         |
| `isString(value)`   | string 여부                         |
| `isNumber(value)`   | number 여부                         |
| `isFunction(value)` | function 여부                       |
| `isDate(value)`     | Date 여부                           |

### 기타

| 함수                                | 설명                              |
| ----------------------------------- | --------------------------------- |
| `clone(value)`                      | 깊은 복사 (순환 참조 지원)        |
| `constant(value)`                   | 항상 같은 값을 반환하는 함수 생성 |
| `when(predicate, onTrue, onFalse?)` | 조건부 실행                       |
| `conditional(...cases)`             | 다중 분기 (패턴 매칭)             |

---

## 사용 예시

### 네임스페이스 방식 (`Bom.`)

```typescript
import { Bom } from './submodules/bom/src';

const result = Bom.pipe(
  users,
  Bom.filter(Bom.isNotNull),
  Bom.sortBy((u) => u.name),
  Bom.take(10),
);
```

### pipe 합성

```typescript
import { pipe, filter, map, groupBy, not, isNullish } from './submodules/bom/src';

const activeUsersByRole = pipe(
  users,
  filter(not(isNullish)),
  filter((u) => u.isActive),
  groupBy((u) => u.role),
);
```

### 조기 종료 (lazy)

```typescript
// 1,000,000개 배열에서 조건 만족 첫 3개만 — 전체 순회 없음
const result = pipe(largeArray, filter(isEven), map(double), take(3));
```

### Object 변환

```typescript
const sanitized = pipe(
  rawUser,
  omit(['password', 'token']),
  mapValues((v) => v ?? ''),
);
```

### 타입 narrowing

```typescript
// filter에 type guard를 넘기면 반환 타입이 좁아짐
const strings = filter(['hello', null, 'world', undefined], isString); // string[]
```

### conditional (패턴 매칭)

```typescript
const label = conditional(
  [isString, (s) => `문자열: ${s}`],
  [isNumber, (n) => `숫자: ${n}`],
  [isNullish, () => '없음'],
);
```

