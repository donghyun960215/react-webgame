import React, { Component } from 'react';
import Try from './Try';

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

    
  fruits =[
    {fruit: '배', taste: '달다'},
    {fruit: '감', taste: '떫다'},
    {fruit: '밤', taste: '고소하다'},
    {fruit: '키위', taste: '맛있다'},
  ];



  render() {
    return(
      <>
        <h1>{this.state.result}</h1>
        <form onSubmit={this.onSubmitForm}>
          <input ref={this.onRefInput} maxLength={4} value={this.state.value} onChange={this.onChangeInput} />
        </form>
        <div>시도: {this.state.tries.length}</div>
        <ul>
          {this.fruits.map((v,i) => {
            return (
              <Try v={v} i={i}/>
            );
          })}
        </ul>
      </>
    );
  }
  
}

export default NumberBaseball;