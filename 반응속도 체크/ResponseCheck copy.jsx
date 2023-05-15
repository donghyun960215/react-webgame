import React, {useState} from "react";

const ResponseCheck = () => {
  const [state, setState] = useState('waiting');
  const [result, setResult] = useState('클릭해서 시작하세요.');
  const [message, setMessage] = useState([]);


  const onClickScreen = () => {
    if(state === 'waiting'){
      setState('ready');
      setMessage('초록색이 되면 클릭하세요.');
      this.timeout = setTimeout(() => {
        setState('now');
        setMessage('지금 클릭')
        this.startTime = new Date();
      }, Math.floor(Math.random() * 1000) + 2000); //2초 ~3초 랜덤
    }else if(state === 'ready') { //성급하게 클릭
      clearTimeout(this.timeout);
      setState('waiting');
      setMessage('너무 성급하군요! 초록색이 된 후에 클릭하세요.')
    }else if (state === 'now') {  //반응속도 체크
      this.endTime = new Date();
      this.setState((prevState) => {
        return {
          state: 'waiting',
          message: '클릭해서 시작하세요.',
          result: [...prevState.result, this.endTime - this.startTime]
        };
      });
    }
  };

  const onReset = () => {
    setResult([])
  };

  const renderAverage = () => {
    return result.length === 0 
    ? null 
    : <>
      <div>평균시간: {result.reduce((a,c) => a + c) / result.length}ms</div>
      <button onClick={onReset}>리셋</button>
    </> 
  };

  return(
    <>
      <div 
          id="screen"
          className={state}
          onClick={onClickScreen}>
            {message}
      </div>
        {renderAverage()}
    </>
  );
}

export default ResponseCheck;