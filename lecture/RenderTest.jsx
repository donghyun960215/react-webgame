import React, {Component} from "react";

class ResponseCheck extends Component {
  state = {
    counter: 0,
  };

  onClicks = () => {
    this.setState( {
      
    });
  };

  render() {
    console.log('렌더링', this.state);
    return(
      <div>
        <button onClick={this.onClicks}>클릭</button>
      </div>
    );
  }

}