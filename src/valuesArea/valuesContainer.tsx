import * as React from 'react';
import './valuesContainer.scss';
import ValueBox from './valueBox';
import {INITIAL_DAYS_1, INITIAL_DAYS_2, INITIAL_DAYS_3, VALUE_1, VALUE_2, VALUE_3} from '../views/app/app';

interface IValuesContainerProps {
  days1?: number;
  days2?: number;
  days3?: number;
}

export default class ValuesContainer extends React.Component<IValuesContainerProps, {} > {
  render() {
    const days1 = this.props.days1 ? this.props.days1 : INITIAL_DAYS_1;
    const days2 = this.props.days2 ? this.props.days2 : INITIAL_DAYS_2;
    const days3 = this.props.days3 ? this.props.days3 : INITIAL_DAYS_3;
    return (
      <div className='values__container'>
        <ValueBox title='Calc 1'
                  containerClassName='values__container-section-1'
                  initialDays={INITIAL_DAYS_1}
                  days={days1}
                  value={VALUE_1}/>
        <ValueBox title='Calc 2'
                  containerClassName='values__container-section-2'
                  initialDays={INITIAL_DAYS_2}
                  days={days2}
                  value={VALUE_2}/>
        <ValueBox title='Calc 3'
                  containerClassName='values__container-section-3'
                  initialDays={INITIAL_DAYS_3}
                  days={days3}
                  value={VALUE_3}/>
      </div>
    );
  };
}