import React, {useState, useRef, useEffect, useMemo, useCallback}from "react";
                        //useRef = 간단한 값을 기억
                        //useMemo = 복잡한 함수 값을 기억(return값)한다 []안에 값이 바뀌기 전까지
                        //useCallback = 함수 값이 아닌 함수 자체를 기억한다 []안에 값이 바뀌기 전까지
import Ball from "./Ball";

function getWinNumbers() {
  console.log('getWinNumbers');
  const candidate = Array(45).fill().map((v,i) => i + 1);
  const shuffle = [];
  while(candidate.length > 0){
    shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
  }
  const bonusNumber = shuffle[shuffle.length - 1];
  const winNumbers = shuffle.slice(0,6).sort((p,c) => p - c);
  return [...winNumbers, bonusNumber];
}


const Lotto = () => {
  const lottoNumbers = useMemo(() => getWinNumbers(), []);  //useMemo를 사용하여 함수 실행한 결과값을 저장해놓는다.
  const [winNumbers, setWinNumbers] = useState(lottoNumbers);
  const [winBalls, setWinBalls] = useState([]);
  const [bonus, setBonus] = useState(null);
  const [redo, setRedo] = useState(false);
  const timeouts = useRef([]);

  useEffect(() => {
    console.log('useEffect');
    for(let i = 0; i < winNumbers.length - 1; i++) {
      timeouts.current[i] = setTimeout(() => {
        setWinBalls((prevBalls) => [...prevBalls, winNumbers[i]]);
      }, (i + 1) * 1000);
    }
    timeouts.current[6] = setTimeout(() => {
      setBonus(winNumbers[6]);
      setRedo(true);
    }, 7000);
    return () => {          //componentWillUnmount 역할 수행
      timeouts.current.forEach((v) => {
        clearTimeout(v);
      });
    };
  },[timeouts.current]);  //빈 배열이면  componentDidMount와 동일
                          //배열에 요소가 있으면  componentDidMount랑 componentDidupdate 둘 다 수행

  const onClickRedo = useCallback(() => {
    console.log('onClickRedo');
    console.log(winNumbers)
    setWinNumbers(getWinNumbers());
    setWinBalls([]);
    setBonus(null);
    setRedo(false);
    timeouts.current = [];
  }, [winNumbers]);
    //onClickRedo 을 useCallback로 감싸면 좋은점은 함수  return 값을 기억하는게 아니라 
    //함수 자체를 기억한다. 함수가 재실행이 된다 해도 onClickRedo가 새로 실행되지 않는다.
    //input에  winNumbers를 넣어줘야지 재실행 할 경우 결과깂 저장이 새로 저장이 된다. 입력을 안하게 되면 처음 렌더링 한 숫자만 기억하고 
    //클릭시 재실행된 숫자들은 기억하지 못 한다.
    //자식컴포넌트에 함수를 넘길 때에는 꼭 useCallbakc를 해줘야한다.
  useEffect(() => {
    console.log('로또번호를 생성합니다.')
  },[winNumbers])
  
  return(
    <>
      <div>당첨숫자</div>
      <div id="결과창">
        {winBalls.map((v) => <Ball key={v} number={v}/>)}
      </div>
      <div>보너스!</div>
      {bonus && <Ball number={bonus} onClic={onClickRedo}/>}
      <br />
      {redo && <button onClick={onClickRedo}>한 번 더!</button>}
    </>
  );
};
export default Lotto;