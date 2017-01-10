import * as React from 'react';
import SliderContainer from '../../sliderArea/sliderContainer';
import ValuesContainer from '../../valuesArea/valuesContainer';

export const NUMBER_OF_DAYS = 72;
export const INITIAL_DAYS_1 = 31;
export const INITIAL_DAYS_2 = 50;
export const INITIAL_DAYS_3 = 36;

export const VALUE_1 = 3;
export const VALUE_2 = 4;
export const VALUE_3 = 5;

interface IApplicationState {
  days1?: number;
  days2?: number;
  days3?: number;
}

export default class Application extends React.Component<{}, IApplicationState> {

  constructor(props:any) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <SliderContainer rotationUpdateHandler={this.rotationUpdateHandler}/>
        <ValuesContainer
          days1={this.state.days1}
          days2={this.state.days2}
          days3={this.state.days3}/>
      </div>
    );
  }

  private rotationUpdateHandler = (degrees:number, valueType:number) => {
    const ratio = 360/NUMBER_OF_DAYS;
    const roundedVal = Math.round(degrees/ratio);
    switch (valueType) {
      case VALUE_1:
            this.setState({days1: roundedVal});
            break;

      case VALUE_2:
        this.setState({days2: roundedVal});
            break;

      case VALUE_3:
        this.setState({days3: roundedVal});
            break;

      default:
            break;
    }
  }
}
