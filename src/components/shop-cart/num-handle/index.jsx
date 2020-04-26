import Taro, { Component } from '@tarojs/taro'
import { View, Image, Input } from '@tarojs/components'
import './index.scss'
import "../../../font/iconfont.css";
import "../../../style/common.scss";

export default class Index extends Component {

  config = {

  }

  state = {
    num: 0
  }

  static defaultProps = {
    theme: '#B62220',
    count: 0
  }

  componentWillMount() { }

  componentDidMount() { 
    let { count } = this.props;
    this.setState({num: count});
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  inputChange = e => {
    this.setState({num: e.target.value}, () => {
      if(this.props.onChange) {
        this.props.onChange(this.state.num);
      }
    });
  }

  addNum = () => {
    let { num } = this.state;

    this.setState({num: num + 1}, () => {
      if(this.props.onChange) {
        this.props.onChange(this.state.num);
      }
    });
    
  }

  minusNum = () => {
    let { num } = this.state;

    if(num > 0) {
      this.setState({num: num - 1}, () => {
        if(this.props.onChange) {
          this.props.onChange(this.state.num);
        }
      });
      
    }
  }

  render() {
    let { theme } = this.props;
    let { num } = this.state;

    const borderStyle = {
      borderColor: theme
    };

    return (
      <View style={borderStyle} className='num_handle flex flex_v_c'>
        <View onClick={this.minusNum} style={{color: theme}} className='iconfont iconremove'></View>
        <Input value={num} onChange={this.inputChange} className='num'>0</Input>
        <View onClick={this.addNum} style={{color: theme}} className='iconfont iconadd'></View>
      </View>
    )
  }
}
