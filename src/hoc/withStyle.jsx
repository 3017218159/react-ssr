import React, { Component } from 'react';

export default (DecoratedComponent, styles) => {
  return class NewComponent extends Component {
    UNSAFE_componentWillMount() {
      if (this.props.staticContext) {
        console.log('styles', styles, styles._getCss(), styles._getContent())
        this.props.staticContext.css.push(styles._getCss());
      }
    }

    render() {
      return <DecoratedComponent {...this.props} />;
    }
  };
};
