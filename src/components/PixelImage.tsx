import * as React from 'react';

export default class PixelImage extends React.Component<{ src?: any }> {
  public render() {
    return (
      <img
        src={`https://functional-lancer.glitch.me?image=${this.props.src}`}
        width={48}
        height={48}
        style={{
          WebkitFilter: 'grayscale(100%)',
          filter: 'grayscale(100%)'
        }}
      />
    );
  }
}
