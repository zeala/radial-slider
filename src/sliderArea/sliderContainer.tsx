import * as React from 'react';
import './styles/spinner.scss';
import RadialSlider from './slider';
import SliderBackground from './sliderBackground';

export interface ISliderContainerProps {
  rotationUpdateHandler: (degrees:number, type:number) => void;
}

interface ISliderContainerState {
  value1Days?: number;
  value2Days?: number;
  value3Days?: number;
}

export const NUMBER_OF_DAYS = 72;
const INITIAL_DAYS_1 = 31;
const INITIAL_DAYS_2 = 50;
const INITIAL_DAYS_3 = 36;

export const VALUE_1 = 3;
export const VALUE_2 = 4;
export const VALUE_3 = 5;

const rotation_outer = INITIAL_DAYS_1 / NUMBER_OF_DAYS * 360;
const rotation_mid = INITIAL_DAYS_2 / NUMBER_OF_DAYS * 360;
const rotation_inner = INITIAL_DAYS_3 / NUMBER_OF_DAYS * 360;

export default class SliderContainer extends React.Component<ISliderContainerProps, ISliderContainerState> {

  private initialValue = this.getInitialValue();

  constructor(props:ISliderContainerProps) {
    super(props);
    this.state = {value1Days: INITIAL_DAYS_1, value2Days: INITIAL_DAYS_2, value3Days: INITIAL_DAYS_3};
  }

  render() {

    const totalValue = this.getTotalValue();
    const delta = this.getDelta(totalValue);
   /* const deltaStyle = delta < 0 ? {transform: 'rotate(180deg)'} : null;*/
    return (
      <div className='spinner__container' >
        <div className='spinner__spinner' style={{rotate: '-90deg'}}>
          <SliderBackground showLabels={true} numberOfElements={NUMBER_OF_DAYS}/>
        </div>
        <RadialSlider className='slider__container-outer'
                      initialRotation={rotation_outer}
                      rotationUpdate={this.rotationUpdateHandler}
                      type={VALUE_1}/>
        <RadialSlider className='slider__container-mid'
                      initialRotation={rotation_mid}
                      rotationUpdate={this.rotationUpdateHandler}
                      type={VALUE_2}/>
        <RadialSlider className='slider__container-inner'
                      initialRotation={rotation_inner}
                      rotationUpdate={this.rotationUpdateHandler}
                      type={VALUE_3}/>
        <div className='slider__center'>
          <div className='slider__center-container'>
            <div className='slider__center-label'>Total</div>
            <div className='slider__center-value'> {totalValue.toString()}</div>
            <div className='slider__center-delta-content'>
              <div className='center-delta-triangle' >
                <div className='triangle'></div></div>
              <div className='center-delta-label'>{delta.toString()}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  private getInitialValue(): number {
    const val1 = INITIAL_DAYS_1 * VALUE_1;
    const val2 = INITIAL_DAYS_2 * VALUE_2;
    const val3 = INITIAL_DAYS_3 * VALUE_3;
    const initialValue = val2 + val3 - val1;
    return initialValue;
  }

  private getDelta(totalValue):number {

    return totalValue - this.initialValue;
  }

  private getTotalValue():number {
    const total = this.state.value2Days * VALUE_2
      + this.state.value3Days * VALUE_3
      - this.state.value1Days * VALUE_1;
    return total;
  }

  rotationUpdateHandler = (degrees:number, type:number) => {

    this.props.rotationUpdateHandler(degrees, type);
    const ratio = 360/NUMBER_OF_DAYS;
    const roundedVal = Math.round(degrees/ratio);
    switch(type) {
      case VALUE_1:

        this.setState({value1Days: roundedVal});
        break;

      case VALUE_2:
        this.setState({value2Days: roundedVal});
        break;

      case VALUE_3:
        this.setState({value3Days: roundedVal});
        break;

      default:
        break;
    }
  }
}