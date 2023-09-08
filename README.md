# 원티드 프리온보딩 프론트엔드 인턴십 3주차 과제 
<br/><br/>

- 목표 : 검색창 구현 + 검색어 추천 기능 구현 + 캐싱 기능 구현
- 작업 기간 : 23.09.05 ~ 23.09.06
- 배포링크 : https://search-clinical-trials-3th.vercel.app/
<br/><br/><br/>

## 🛠 사용한 기술 스택

<img src="https://shields.io/badge/TypeScript-3178C6?logo=TypeScript&logoColor=FFF&style=flat-square"/> <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white"/> <img src="https://img.shields.io/badge/React Router-CA4245?style=flat-square&logo=React Router&logoColor=white"> <img src="https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=flat-square&logo=Tailwind%20CSS&logoColor=white"/>  <img src="https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=Axios&logoColor=white"/>

<br/><br/>

## 💭 설계 방향
**`주요 설계 목표`**
- api 호출의 성능 개선
- 사용자 경험 개선
  

**`구현 방법`**
1. 디바운싱을 통한 API의 호출 / 로컬 캐싱
2. 키보드만으로 추천 검색어들 이동

<br/><br/>

## 🏢 설계 및 구현 설명
### **`Debouncing을 통한 API 호출의 감소`** 
input의 값이 변할때 마다 api가 호출되는 것을 막기 위해 api 호출에서 Debounce를 수행하는 로직을 추가하였습니다.
이를 통해 이벤트 오버클럭으로 인한 리소스 사용량의 증가와 서버의 과부하를 예방하고자 하였습니다.
```
   const debouncingAPI = (queryStr: string) => {
    //검색어 입력창에 아무것도 없을 때 result list 초기화
    if (queryStr === '') setResultList([]);

    // 타자 입력으로 이전 타이머 취소 
    if (timer) clearTimeout(timeout);

    // 새로운 타이머 설정
    if (queryStr !== '') {
      timer = setTimeout(() => {
        getItems(queryStr);
      }, 300);
    }
  };
```

### **`로컬 캐싱`**
캐시를 저장하는 setCacheStorage, 저장된 캐시를 불러오는 getCachedData 유틸 함수를 만들어 API 호출별로 로컬 캐싱을 가능하도록 하였습니다.
이를 통해 캐시에 저장된 데이터를 빠르게 읽어와 어플리케이션을 사용하는 고객에게 쾌적한 서비스 경험의 제공을 기대하였습니다.

- utils/cache.ts
  - setCacheStorage : 원본 객체와 독립성 유지를 위해 복제하여 Header에 캐싱된 시간 추가하고 새로운 Response 객체로 생성하여 캐시 스토리지에 저장합니다.
  - getCachedData : 인자로 넘겨받은 queryString과 일치하는 캐시가 있는지 확인하여 data 또는 null을 반환합니다.
  - checkCacheExpired : 헤더에 저장된 FETCHED_DATE(캐싱된 시간)를 불러와 만료기한 계산하여 boolean 반환합니다.
- context/MainProvider.tsx
  - getItems : getCachedData()를 사용하여 저장된 캐시를 불러옵니다. 
    getCachedData의 반환값이 없을 경우 api를 호출하고, setCacheStorage()를 통해 캐시 스토리지에 저장합니다.
    getCachedData의 반환값이 있을 경우 저장된 캐시를 불러옵니다.


### **`사용자 경험 개선`**
input에 포커스 된 상태에서 keydown, keyup, escape 클릭 시 추천검색으로 이동이 가능하도록 하였습니다.
이를 통해 사용자가 마우스를 사용하지 않고도 추천 검색어로의 이동이 가능하게 하여 더 나은 사용자 경험 제공을 기대하였습니다.

-hooks/useChangeFocus.ts
  - index의 값과 현재 focus 된 index 번호를 비교하여 focus된 추천 검색어를 시각적으로 변경해줍니다.
  - 엔터 keydown 시 검색창에 입력된 검색어를 변경해줍니다.



