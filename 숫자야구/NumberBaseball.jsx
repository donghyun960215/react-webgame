import React, { Component } from 'react';

function getNumbers() { //숫자 4개를 겹차자 얺고 랜덤하게 뽑는 함수

}


class NumberBaseball extends Component  {
  state = {
    result: '',
    value:'',
    answer: getNumbers(),
    tries:[]

  }

  onSubmitForm = () => {

  };

  input;
  onRefInput = (c) => {
    this.input= c;
  };

  onChangeInput = () => {

  };


  render() {
    return(
      <>
        <h1>{this.state.result}</h1>
        <form onSubmit={this.onSubmitForm}>
          <input ref={this.onRefInput} maxLength={4} value={this.state.value} onChange={this.onChangeInput} />
        </form>
        <div>시도: {this.state.tries.length}</div>
        <ul>
          {['1','2','3','4','5'].map((v) => {
            return (
              <li key={v}>{v}</li>
            );
          })}
        </ul>
      </>
    );
  }
  
}

export default NumberBaseball;