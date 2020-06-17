import React from 'react';

class MicroFrontend extends React.Component {

  state = {
    hostURL: null,
  };

  componentDidMount() {
    const {name, host, document} = this.props;
    const scriptId = `micro-frontend-script-${name}`;

    if (document.getElementById(scriptId)) {
      this.renderMicroFrontend();
      return;
    }

    const hostURL = `${host}/asset-manifest.json`;

    this.setState({hostURL});

    fetch(hostURL).
        then(res => res.json()).
        then(manifest => {
          const script = document.createElement('script');
          script.id = scriptId;
          script.crossOrigin = '';
          script.src = `${host}${manifest['files']['main.js']}`;
          script.onload = this.renderMicroFrontend;
          document.head.appendChild(script);
          this.setState({success: true});
        }).
        catch((error) => {
          this.setState({error, success: false});
        });
  }

  componentWillUnmount() {
    const {name, window} = this.props;

    window[`unmount${name}`] && window[`unmount${name}`](`${name}-container`);
  }

  renderMicroFrontend = () => {
    const {name, window, history} = this.props;

    window[`render${name}`] &&
    window[`render${name}`](`${name}-container`, history);
  };

  render() {
    return <main id={`${this.props.name}-container`}>
      <h1>{`${this.props.name}-container`}</h1>
      {this.state.error &&
      <ErrorView error={this.state.error} hostURL={this.state.hostURL}/>}
    </main>;
  }
}

const containerStyle = {
  height: '10em',
  borderColor: 'black',
  borderRadius: 8,
  backgroundColor: 'red',
  padding: 16,
  alignItems: 'center',
  justifyContent: 'center',
};

const testStyle = {
  color: 'white',
  alignSelf: 'center',
  justifyContent: 'center',
  textAlign: 'center',
};

const ErrorView = ({error, hostURL}) => {
  return <div style={containerStyle}>
    <h3 style={testStyle}>No Micro-Frontend available</h3>
    <h5 style={testStyle}>{error.message}</h5>
    <h5 style={testStyle}>hostURL: {hostURL}</h5>
    <h5 style={testStyle}>Micro-Frontend is probably not started yet. Navigate
      into micro-frontend, install dependencies and start react app</h5>
  </div>;
};

MicroFrontend.defaultProps = {
  document,
  window,
};

export default MicroFrontend;