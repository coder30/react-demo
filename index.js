import ReactDom from './react-dom';
import React from './react';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            count: 0
        }
    }
    clickButton() {
        this.setState({
            count: this.state.count+1
        })
    }
    render() {
        return (
            <div style="font-size:100;">
                <span>{this.state.count}</span>
                <p onClick={()=>{this.clickButton()}}>+</p>
            </div>
        )
    }
}

function Child() {
    return (<div>123</div>)
}

const element = <Child/>

ReactDom.render(element, document.getElementById('root'))
