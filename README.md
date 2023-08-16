# 원티드 프리온보딩 백엔드 인턴십 사전 과제

## 성명

황인우

## 애플리케이션 실행

### Prerequisites

```plaintext
- Docker version 24.0.2
- Docker Compose version v2.19.1
- Docker Image
  - mysql:8.0
```

### 서버 애플리케이션 이미지 생성

```bash
cd wanted-pre-onboarding-backend
docker build . -t wanted-pre-onboarding-backend-server
```

### Docker Compose 환경 구축 및 실행

```bash
docker compose up
```

### Endpoint 호출 방법

- REST API 요청 생성 도구를 이용하여 (ex. Postman) HTTP 요청 송신
  - 각 요청 명세는 'API 명세'를 참조
    - 명세에 추가적인 요소가 포함된 경우 해당 요소를 포함

## 데이터베이스 테이블 구조

### users: TABLE

- id: BIGINT, PRIMARY KEY
- email: VARCHAR(255)
- password: VARCHAR(255)

### posts: TABLE

- id: BIGINT, PRIMARY KEY
- user_id: BIGINT
- title: VARCHAR(255)
- description_text: VARCHAR(4095)
- deleted: BOOLEAN, DEFAULT FALSE

## 시연 영상

[![시연_영상](https://github.com/hsjkdss228/wanted-pre-onboarding-backend/assets/50052512/ce753297-b04e-47ac-b049-eb0adab71bb1)](https://youtu.be/GVpQZk-Jul4)

## 구현 방식 및 아키텍처

### Tech Stacks

- 언어 및 프레임워크: JavaScript, Express.js
  - 9월 중순부터 TypeScript 기반의 서버리스 애플리케이션 프로젝트에 참여하게 되었습니다. 이에 기존에 사용하던 Java와 Spring Boot 기반의 애플리케이션이 아닌 Node.js 기반의 서버 애플리케이션 작성 역량을 높이기 위해 JavaScript와 Express.js를 선택해 구현을 진행했습니다.
- 빌드: Babel
  - Express.js의 소스코드 작성은 CommonJS 문법을 기반으로 하지만, 본 서버 애플리케이션은 ES6+ 문법을 기반으로 작성되었습니다. 따라서 빌드 시 소스코드를 CommonJS 이전 문법으로 치환시키기 위해 Babel Complier를 사용했습니다.
- ORM: TypeORM
  - JavaScript 진영에서 관계-객체 간 변환 프레임워크로 가장 널리 쓰이는 TypeORM을 사용했습니다.
- 라이브러리
  - ESLint
    - 소스코드를 정적으로 분석해 통용되는 문법을 따르고 오류를 검출하기 위해 사용했습니다.
  - Jest
    - 테스트 코드를 작성하기 위해 사용했습니다.
  - SuperTest
    - 테스트 코드 작성 시 HTTP 요청을 효과적으로 추상화하기 위해 사용했습니다.
  - cors
    - 교차 출처 리소스 공유를 허용하여 다른 출처에서 요청을 송신하더라도 정상적으로 처리할 수 있도록 하기 위해 사용했습니다.
  - jsonwebtoken
    - 본 애플리케이션은 사용자 식별을 위해 사용자 정보를 HMAC SHA-256 알고리즘을 기반으로 인코딩한 액세스 토큰을 사용자에게 반환하고, 사용자는 액세스 토큰을 요청에 포함시키는 방식으로 사용자를 인증합니다. 이러한 JWT 인코딩 및 디코딩을 간편하게 수행하기 위해 사용했습니다.
  - argon2
    - 데이터베이스에 사용자 계정의 비밀번호를 디코딩 불가능한 암호문으로 해싱하고, 검증 시 평문과 암호문을 비교하는 방식으로 비밀번호를 검증하기 위해 사용했습니다.

### 아키텍처

- 아키텍처: Layered Architecture
  - REST API 요청을 처리하기 위한 전체 동작에서 각 관심사를 효과적으로 분리해 각 Layer의 복잡도를 낮추고 유지보수성을 높이기 위해 적용했습니다.
  - View: routes
  - Application: services, models
  - Infrastructures: repositories, utils

## API 명세

### 회원가입

- 요청
  - 메서드 및 경로
    - POST /users
  - 본문
    - Accept: application/json
    - SignUpRequestDto: Object
      - email: String
      - password: String

- 응답
  - 성공
    - 201 Created
    - 본문
      - Content-type: application/json
      - SignUpResultDto: Object
        - userId: Long
  - 실패
    - Content-type: text/html
    - 400 Bad Request
      - '유효하지 않은 이메일 혹은 비밀번호입니다.'

### 로그인

- 요청
  - 메서드 및 경로
    - POST /session
  - 본문
    - Accept: application/json
    - LoginRequestDto: Object
      - email: String
      - password: String

- 응답
  - 성공
    - 201 Created
    - 본문
      - Content-type: application/json
      - LoginResultDto: Object
        - accessToken: String
  - 실패
    - Content-type: text/html
    - 400 Bad Request
      - '아이디나 비밀번호를 입력하지 않았습니다.'
      - '비밀번호가 올바르지 않습니다.'
    - 404 Not Found
      - '존재하지 않는 사용자입니다.'

### 게시글 생성

- 요청
  - 메서드 및 경로
    - POST /posts
  - 헤더
    - Authorization: 'Bearer ACCESS_TOKEN'
  - 본문
    - Accept: application/json
    - CreatePostRequestDto: Object
      - title: String
      - descriptionText: String

- 응답
  - 성공
    - 201 Created
    - 본문
      - Content-type: application/json
      - PostCreationResultDto: Object
        - postId: Long
  - 실패
    - Content-type: text/html
    - 400 Bad Request
      - 'Access Token이 없거나 잘못되었습니다.'
    - 404 Not Found
      - '존재하지 않는 사용자입니다.'

### 게시글 목록 조회

- 요청
  - 메서드 및 경로
    - GET /posts
  - 쿼리 파라미터
    - page: Integer
    - count: Integer

- 응답
  - 성공
    - 200 OK
    - 본문
      - Content-type: application/json
      - PostsDto: Object
        - posts: Array[PostDto]
          - PostDto: Object
            - id: Long
            - title: String
            - userId: Long
            - userEmail: String
        - totalCount: Integer
  - 실패
    - Content-type: text/html
    - 400 Bad Request
      - '페이지 또는 게시글 개수 값이 주어지지 않았습니다.'
      - '잘못된 페이지 또는 게시글 개수 값입니다.'

### 특정 게시글 조회

- 요청
  - 메서드 및 경로
    - GET /posts/:postId
  - Path Variable
    - postId: Long

- 응답
  - 성공
    - 200 OK
    - 본문
      - Content-type: application/json
      - PostDto: Object
        - id: Long
        - title: String
        - descriptionText: String
        - userId: Long
        - userEmail: String
  - 실패
    - Content-type: text/html
    - 404 Not Found
      - '존재하지 않는 게시글입니다.'
      - '삭제된 게시글입니다.'

### 특정 게시글 수정

- 요청
  - 메서드 및 경로
    - PATCH /posts/:postId
  - Path Variable
    - postId: Long
  - 헤더
    - Authorization: 'Bearer ACCESS_TOKEN'
  - 본문
    - Accept: application/json
    - ModifyPostRequestDto: Object
      - title: String
      - descriptionText: String

- 응답
  - 성공
    - 204 No Content
  - 실패
    - Content-type: text/html
    - 400 Bad Request
      - 'Access Token이 없거나 잘못되었습니다.'
      - '게시글 작성자가 아닙니다.'
    - 404 Not Found
      - '존재하지 않는 사용자입니다.'
      - '존재하지 않는 게시글입니다.'
      - '삭제된 게시글입니다.'

### 특정 게시글 삭제

- 요청
  - 메서드 및 경로
    - DELETE /posts/:postId
  - Path Variable
    - postId: Long
  - 헤더
    - Authorization: 'Bearer ACCESS_TOKEN'

- 응답
  - 성공
    - 204 No Content
  - 실패
    - Content-type: text/html
    - 400 Bad Request
      - 'Access Token이 없거나 잘못되었습니다.'
      - '게시글 작성자가 아닙니다.'
    - 404 Not Found
      - '존재하지 않는 사용자입니다.'
      - '존재하지 않는 게시글입니다.'
      - '이미 삭제된 게시글입니다.'
