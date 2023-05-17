const React = require('react');
const {useState, useRef} = React;

const GuGuDan = () => {
  // Hooks에서 state 선언하는 방법
  const [first, setFirst] = useState(Math.ceil(Math.random() * 9));
  const [second, setSecond] = useState(Math.ceil(Math.random() * 9));
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');
  const inputRef = useRef(null);   // focus 설정하기

  // value 값 받기
  const onChangeInput = (e) => {
    setValue(e.target.value);
  };

  //받은값 계산하기
  const onSubmitForm = (e) => {
    e.preventDefault();
    if(parseInt(value) === first * second){
      setResult('정답: ' + value);
      setFirst(Math.ceil(Math.random() * 9));
      setSecond(Math.ceil(Math.random() * 9));
      setValue('');
      inputRef.current.focus();  // focus 사용시 기존 방식과 다르게 current를 입력해줘야 한다.
    }else {
      setResult('떙');
      setValue('');
      inputRef.current.focus();
    }
  }

  return (
    <>
      <div>{first} 곱하기 {second}는?</div>
      <form onSubmit={onSubmitForm}>
        <input ref={inputRef} type="number" onChange={onChangeInput} value={value} />
        <button>입력!</button>  
      </form>
      <div id="result">{result}</div>
    </>
  );
}

module.exports = GuGuDan;