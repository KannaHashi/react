import React from 'react'

class LifeCycle extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            count : 10
        }
        console.log('constructor')
    }
    static getDerivedStateFromProps(props, state){
        console.log('getDerivedStateFromProps')
        return true;
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({
                count : this.state.count - 1
            })
        }, 1000);
        console.log('componentDidMount')
    }
    shouldComponentUpdate(nextProps, nextState) {
        console.log('shouldComponentUpdate')
        return true;
    }
    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log('getSnapshotBeforeUpdate')
    }
    componentDidUpdate(prevProps, prevState) {
        console.log('componentDidUpdate')
        setTimeout(() => {
            this.setState({
                count : this.state.count - 1
            })
        }, 1000);
    }
    componentWillUnmount() {
        console.log('componentWillUnmount')
    }

    render(){
        return (
            <div>
                <h3 className="bg-primary text-white text-center p-3 mt-3 mb-3">{this.state.count}</h3>
            </div>
        )
    }
}

export default LifeCycle