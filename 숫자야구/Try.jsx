import React, {memo} from 'react';

const Try = memo(({tryInfo}) => { //props 구조분해 방식
  return(
    <li>
      <div>{tryInfo.try}</div>
      <div>{tryInfo.result}</div>
    </li>
  )
});

// 자식 컴포넌트는 리랜더링이 필요 없다. 
// 하지만 부모 컨포넌트가 리렌더링이 되면 자식 컴포넌트도 자동으로 리렌더링이 된다.
// 그걸 막기 위해 사용하는게  memo 이다 함수 컴포넌트를 memo로 감싸주면 된다.
// 하지만 memo를 사용하면 컴포넌트 이름이 자동적으로 이상하게 바뀌게 된다.
// 그러므로 하단과  같이 컴포넌트 이름을 다시 정의해준다.
Try.displayName = 'Try';  

export default Try;