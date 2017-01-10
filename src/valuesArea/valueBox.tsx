import * as React from 'react';
import './valuesContainer.scss';

interface IValueBoxProps {
  containerClassName:string;
  title:string;
  initialDays:number;
  days:number;
  value:number;
}

export default class ValueBox extends React.Component<IValueBoxProps, {}> {
  render () {

    const value = this.props.days * this.props.value;
    const delta = this.getValueDelta(value);
    /*const deltaContainerClass = delta < 0 ? {transform: 'rotate(180deg', textAlign: 'left'} : null;*/
    return (
      <div className={this.props.containerClassName}>
        <div className='values-container__section-title'>
          {this.props.title}
        </div>
        <div className='values-container__section-content'>
          <div className='values-container__inner-section--left'>
            <div className='values-container__inner-section-label'>Days</div>
            <div className='values-container__inner-section-value'>{this.props.days}</div>
          </div>

          <div className='values-container__inner-section'>
            <div className='values-container__inner-section-label'>Value</div>
            <div className='values-container__inner-section-value'>
              {value}
              <div className='values-container__inner-section-delta'>
                <div className='value-box__delta-triangle-container'>
                  <div className='triangle'></div>
                </div>
                <span className='delta-label'>{delta}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  private getValueDelta(newValue):number {
    const initialValue = this.props.initialDays * this.props.value;
    const delta = newValue - initialValue;
    return delta;
  }
}