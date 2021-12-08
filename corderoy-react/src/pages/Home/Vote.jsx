import React from 'react';

class Vote extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            count: 
        }
    }

  
    render() {
        return (
            <div>
                <button onClick={this.props.increment}>
                    +
                </button>
                <span>{this.state.count}</span>
                <button onClick={this.props.decrement}>
                    -
                </button>
            </div>
        );
    }
}

export default Vote;