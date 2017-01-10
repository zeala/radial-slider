import * as React from 'react';
import * as ReactDom from 'react-dom';
import SliderBackground from './sliderBackground';
import SliderHandler from './sliderHandler';
import './styles/radialSlider.scss';
import './styles/spinner.scss';
import {NUMBER_OF_DAYS} from './sliderContainer';

interface IRadialSliderProps {
  className?: string;
  initialRotation: number;
  rotationUpdate: (degrees:number, type:number) => void;
  type: number;
}

interface IRadialSliderState {
  rotation?: number;
  centerX?: number;
  centerY?: number;
  isMouseDown?: boolean;
}

// const RATIO = 360 / NUMBER_OF_DAYS;

export default class RadialSlider extends React.Component<IRadialSliderProps, IRadialSliderState> {
  private container: Element;
  constructor(props:IRadialSliderProps) {
    super(props);
    this.state = {rotation: null};
  }

  private rotate = ( event:MouseEvent) => {

    const pos_x = event.pageX;
    const pos_y = event.pageY;
    const delta_y = this.state.centerY - pos_y;
    const delta_x = this.state.centerX - pos_x;
    let angle = Math.atan2(delta_y, delta_x) * (180 / Math.PI);
    angle -= 90;
    if (angle < 0) {
      angle = 360 + angle;
    }
    angle = Math.round(angle);

    if (this.state.rotation < 0 && angle >=0) {
      angle = 360;
    }

    this.setState({rotation: angle});

    if(this.props.rotationUpdate ) {
      this.props.rotationUpdate(angle, this.props.type);
    }
  }

  private backgroundOffsetHandler = (offsetObj:{top:number, left: number}, width: number) => {
    const centerX = offsetObj.left + width/2;
    const centerY = offsetObj.top;

    this.setState({centerX, centerY});
  }

  private handleMouseDown = () => {
    this.setState({isMouseDown: true});
  }

  private handleMouseUp = () => {
    this.setState({isMouseDown: false});

    // snap to the nearest day
    const ratio = 360/ NUMBER_OF_DAYS;
    const rotationOffset = this.state.rotation % ratio;
    const adjustBy = rotationOffset < ratio/2 ? - rotationOffset : ratio - rotationOffset;
    const adjustedRotation = this.state.rotation + adjustBy;
    this.setState({rotation: adjustedRotation});
  }

  private onMouseMove = (event:MouseEvent) => {
    if (this.state.isMouseDown) {
      this.rotate(event);
    }
  }

  private onMouseUp = (event:MouseEvent) => {
    this.setState({isMouseDown: false});
  }

  render() {

    const {className } = this.props;
    const rotation = this.state.rotation ? this.state.rotation : this.props.initialRotation;
    const rotationLeft = rotation >= 180 ? rotation - 180 : 0;
    const rotationRight = rotation >= 180 ? 180 : rotation;
    const styleLeft= { transform: `rotate(${rotationLeft}deg)`};
    const styleRight = {transform: `rotate(${rotationRight}deg)`};
    const sliderContainerStyleName = className ? className : 'slider__container-outer';
    const containerStyle = this.state.isMouseDown ? {pointerEvents: 'auto', cursor: 'pointer'} : null;// : {pointerEvents: 'none'};
    return (
      <div className={sliderContainerStyleName}
        onMouseMove={this.onMouseMove}
           onMouseUp={this.onMouseUp}
           style={containerStyle}
      >
        <div className='slider__right-container'>
          <div className='slider__slice' style={styleRight}/>
        </div>
        <div className='slider__left-container'>
          <div className='slider__slice' style={styleLeft}/>
        </div>

        <div className='slider__inset'
             >
          <SliderBackground
            ref={(e) => this.container = ReactDom.findDOMNode(e)}
            numberOfElements={72} className='spinner__background'
            offsetHandler={this.backgroundOffsetHandler}
            />
        </div>
        <SliderHandler rotation={rotation}
          mouseDownHandler={this.handleMouseDown}
                       mouseUpHandler={this.handleMouseUp}
          />
      </div>
    );
  }
}