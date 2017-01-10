import * as React from 'react';
import './styles/radialSlider.scss';
import './styles/spinner.scss';

interface ISliderHandlerProps {
  rotation: number;
  rotateHandler?: (deltaX:number, deltaY:number, mouseEvent:MouseEvent) => void;
  mouseDownHandler?: () => void;
  mouseUpHandler?: () => void;
}

interface ISliderHandlerState {
  storedXPos?: number;
  storedYPos?: number;
  deltaX?: number;
  deltaY?: number;
}

export default class SliderHandler extends React.Component<ISliderHandlerProps, ISliderHandlerState> {

  constructor(props:ISliderHandlerProps) {
    super(props);
    this.state = {
      storedXPos: 0,
      storedYPos: 0,
      deltaX: 0,
      deltaY: 0
    };
  }

  render() {
    const {rotation} = this.props;
    const style = {transform: `rotate(${rotation}deg`};
    return (
      <div className='slider__handle' style={style}>
        <div className='slider_handle-dot'
             onMouseDown={this.onHandleMouseDown}
             onMouseUp={this.onHandleMouseUp}
          >
          <div className='triangle__container'>
            <div  style={{transform: 'rotate(-90deg)'}}>
              <div className='triangle'></div>
            </div>
            <div style={{transform: 'rotate(90deg)'}}>
              <div className='triangle'></div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  private onHandleMouseDown = (event:MouseEvent) => {
    this.setState({storedXPos: event.clientX, storedYPos: event.clientY});
    // const target = event.target;
    // target.addEventListener('mousemove', this.onHandleMouseMove);
    if (this.props.mouseDownHandler) {
      this.props.mouseDownHandler();
    }
  }

  private onHandleMouseUp = (event:Event) => {
    console.log(' mouse UP');
    // const target = event.target;
    // target.removeEventListener('mousemove', this.onHandleMouseMove);
    if (this.props.mouseUpHandler) {
      this.props.mouseUpHandler();
    }
  }

}