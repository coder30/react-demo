import { renderComponent } from '../react-dom/render';
class Component {
    constructor(props) {
        this.state = {}
        this.props = props
    }
    setState(state) {
        Object.assign(this.state, state)
        renderComponent(this)
    }
}

export default Component