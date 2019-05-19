import * as React from 'react';
import { connect } from 'react-redux';
import { block } from 'bem-cn';

import { IAppReduxState, ICommunication } from 'shared/types/redux';
import { Spinner } from 'shared/view/elements';

import { IOption } from '../../../namespace';

import { selectors, actions } from '../../../redux';

import './DomainConfiguration.scss';

const b = block('domain-configuration');

interface IStateProps {
  countryOptions: IOption[];
  loadingCountries: ICommunication;
}

type IActionsDispatch = typeof actionsDispatch;

type IProps = IActionsDispatch & IStateProps;
class DomainConfiguration extends React.PureComponent<IProps> {

  public componentDidMount() {
    this.props.loadCountriesOptions();
  }

  public render() {

    const { loadingCountries } = this.props;

    const isLoading = loadingCountries.isRequesting;

    return (
      <Spinner spinning={isLoading} size="large" tip="Loading ..." delay={600}>
        <div className={b()}>
          React Redux Saga Starter Kit
        </div>
      </Spinner>
    );
  }

}

function mapState(state: IAppReduxState): IStateProps {
  return {
    countryOptions: selectors.selectCountryOptions(state),
    loadingCountries: selectors.selectCommunication(state, 'loadingCountries'),
  };
}

const actionsDispatch = {
  loadCountriesOptions: actions.loadCountries,
};

// TODO: with redux-thunk cannot use object as actionsDispatch
export default connect(mapState, actionsDispatch as any)(DomainConfiguration);
