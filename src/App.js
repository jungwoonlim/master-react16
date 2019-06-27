import React, { Component, Fragment } from "react";
import { createPortal } from "react-dom";

const BoundaryHOC = ProtectedComponent =>
  class Boundary extends Component {
    state = {
      hasError: false
    };
    componentDidCatch = () => {
      this.setState({
        hasError: true
      });
    };
    render() {
      const { hasError } = this.state;
      if (hasError) {
        return <ErrorFallback />;
      } else {
        return <ProtectedComponent />;
      }
    }
  };

class ErrorMaker extends Component {
  state = {
    frineds: ["L", "J", "W", "cloud"]
  };
  componentDidMount = () => {
    setTimeout(() => {
      this.setState({
        frineds: undefined
      });
    }, 2000);
  };
  render() {
    const { frineds } = this.state;
    return frineds.map(frined => ` ${frined} `);
  }
}

const PErrorMaker = BoundaryHOC(ErrorMaker);

class Portals extends Component {
  render() {
    return createPortal(<Message />, document.getElementById("touchme"));
  }
}

const PPortals = BoundaryHOC(Portals);

const Message = () => "just touched it!";

class ReturnTypes extends Component {
  render() {
    return "hello";
  }
}

const PReturnTypes = BoundaryHOC(ReturnTypes);

const ErrorFallback = () => "sry";

class App extends Component {
  render() {
    return (
      <Fragment>
        <PReturnTypes />
        <PPortals />
        <PErrorMaker />
      </Fragment>
    );
  }
}

export default BoundaryHOC(App);
