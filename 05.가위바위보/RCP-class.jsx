import React, {Component} from "react";

//클래스의 경우 -> constructor -> render -> ref -> componentDidMount -> 
//          (setState/prpos 바뀔때 -> shouldComponentUpdate(true) -> render -> componentDidUpdate)
//부모가 나를 없앴을 떄 -> componentWillUnmount -> 소멸

const rspCoords = {
  바위 : '0',
  가위 : '-142px',
  보: '-284px'
};
const scores = {
  가위: 1,
  바위: 0,
  보: -1
};
const comuterChoice = (imgCoord) => {
  return Object.entries(rspCoords).find(function(v) {
    return v[1] === imgCoord;
  })[0];
};
class RSP extends Component {
  state = {
    result: '',
    imgCoord: '0',
    score: 0,
    fullCount: 10
  };

  interval;

  componentDidMount() { //컴포트가 첫 렌더링 된 후 실행 리렌더링에서는 실행이 안된다. -> 비동기 요청을 많이한다.
    this.interval = setInterval(this.changHand,100);
  }

  componentDidUpdate() { //컴포넌트가 리렌더링 후 실행

  }

  componentWillUnmount() {  //컴포넌트가 제거되기 직전 실행 -> 비동기 여청 정리를 많이한다.
    clearInterval(this.interval);
  }

  changHand = () => {
    const {imgCoord} = this.state;
      if(imgCoord === rspCoords.바위) {
        this.setState({
          imgCoord: rspCoords.가위
        });
      }else if(imgCoord === rspCoords.가위) {
        this.setState({
          imgCoord: rspCoords.보
        });
      }else if(imgCoord === rspCoords.보) {
        this.setState({
          imgCoord: rspCoords.바위
        });
      }
  }

  onClickBtn = (choice) => () => {
    const {imgCoord} = this.state;
    clearInterval(this.interval);
    const myScore = scores[choice];
    const cpuScore = scores[comuterChoice(imgCoord)];
    const diff =  myScore - cpuScore;
    if(diff === 0 ){
      this.setState((prevState) =>{
        return {
          result: '비겼습니다.',
          fullCount: prevState.fullCount -1
        };
      });
    }else if([-1,2].includes(diff)){
      this.setState((prevState) => {
        return {
          result: '이겼습니다.',
          score: prevState.score + 1,  
          fullCount: prevState.fullCount -1
        };
      });
    }else {
      this.setState((prevState) => {
        return {
          result: '졌습니다.',
          score: prevState.score - 1,  
          fullCount: prevState.fullCount -1
        };
      });
    }
    if(this.state.fullCount === 0) {
      this.setState((prevState) => {
        return {
          result: '',
          score: 0,  
          fullCount: 10,
        };
      });
      alert(`총 점수는 ${this.state.score}점 입니다.`);
    }
    setTimeout(() => {
      this.interval = setInterval(this.changHand,100);
    },1500)
  };

  render() {
    const {result, score, imgCoord, fullCount} = this.state;
    return (
      <>
        <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }} />
        <div>
          <button id="rock" className="btn" onClick={this.onClickBtn('바위')}>바위</button>
          <button id="scissor" className="btn" onClick={this.onClickBtn('가위')}>가위</button>
          <button id="paper" className="btn" onClick={this.onClickBtn('보')}>보</button>
        </div>
        <div>{result}</div>
        <div>현재 {score}점</div>
        <div>남은 시도 횟수 {fullCount}번</div>
      </>
    );
  }
}

export default RSP;