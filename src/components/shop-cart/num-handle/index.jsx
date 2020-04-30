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

  addNum = e => {
    let { num } = this.state;
    e.stopPropagation();
    this.setState({num: parseInt(num) + 1}, () => {
      if(this.props.onChange) {
        this.props.onChange(this.state.num);
      }
    });
    
  }

  minusNum = e => {
    e.stopPropagation();
    let { num } = this.state;

    if(num > 0) {
      this.setState({num: parseInt(num) - 1}, () => {
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
        <Input onClick={e => {e.stopPropagation()}} value={num} onChange={this.inputChange} className='num'></Input>
        <View onClick={this.addNum} style={{color: theme}} className='iconfont iconadd'></View>
      </View>
    )
  }
}
