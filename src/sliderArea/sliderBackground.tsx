import * as React from 'react';
import * as ReactDom from 'react-dom';
import './styles/spinner.scss';

interface ISliderBackgroundProps {
  numberOfElements: number;
  showLabels?: boolean;
  className?: string;
  onMouseMove?: (event:MouseEvent) => void;
  offsetHandler?: (position:{left:number, top:number}, width:number) => void;
}

export default class SliderBackground extends React.Component<ISliderBackgroundProps, {}> {

  private container:Element;

  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  cumulativeOffset = (element) => {
    let top = 0, left = 0;
    do {
      top += element.offsetTop  || 0;
      left += element.offsetLeft || 0;
      element = element.offsetParent;
    } while(element);

    return {
      top: top,
      left: left
    };
  };

  renderBars () {
    let bars = [];
    const numBars = this.props.numberOfElements;
    const offsetRatio = 360/numBars;
    let getSpinnerLabelStyle = (index) => {
      const rotation = index < numBars /2 ? 0 : 180;
      return {transform: 'rotate(' + rotation + 'deg)'};
    };
    for (let i = 0; i < numBars; i++) {
      bars.push(
        <div style={{
            transform: 'rotate(' + (i * offsetRatio - 90) + 'deg)'
          }} key={Math.random()} >
          <div className='spinner__bar'  />
          {this.props.showLabels ?
            <div className='spinner__bar-label' style={getSpinnerLabelStyle(i)}>{i}</div> : null
          }

        </div>
      );
    };
    return bars;
  }

  private assignContainer = (e) => {
    this.container = ReactDom.findDOMNode(e);
    if (this.container) {
      if (this.props.offsetHandler) {
        this.props.offsetHandler(this.cumulativeOffset(this.container), this.container.clientWidth);
      }
    }
  }

  render() {

    return(
      <div
        ref={this.assignContainer}
        style={{position: 'absolute', width: '100%', height: '100%'}} className={this.props.className}>
        {this.renderBars()}
      </div>
    );
  }
}