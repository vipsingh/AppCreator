import React from 'react';
import { ChromePicker } from 'react-color';
import { Input } from "antd";

const popover = {
    position: 'absolute',
    zIndex: '2',
  }
  const cover = {
    position: 'fixed',
    top: '0px',
    right: '0px',
    bottom: '0px',
    left: '0px',
  }

export default class ColorPicker extends React.Component<any,any> {
    state = {
      displayColorPicker: false,
      color: {r:'0', g: '0', b: '0'}
    };
  
    handleClick = () => {
      this.setState({ displayColorPicker: !this.state.displayColorPicker })
    };
  
    handleClose = () => {
      this.setState({ displayColorPicker: false })
    };

    onChange = (v: any) => {
        if (v) {
            this.setState({ color: v.rgb });
            this.props.onChange(v.hex);
        }
    }
  
    render() {
      
      return (
        <div>
          <Input value={this.props.value || ""} readOnly onClick={ this.handleClick } />
          { this.state.displayColorPicker ? <div style={ popover as any }>
            <div style={ cover as any } onClick={ this.handleClose }/>
            <ChromePicker color={ this.props.value || "#fff" } onChange={this.onChange} />
          </div> : null }
        </div>
      )
    }
  }