import * as Konva from 'konva';
import * as React from 'react';
import * as ReactKonva from 'react-konva';

const KImage: any = ReactKonva.Image;

export default class PixelImage extends React.Component<
  { src?: any },
  { image?: any }
> {
  public state = {
    image: null
  };

  private ref: any;

  public componentDidMount() {
    const image = new (window as any).Image();
    image.onload = () => {
      this.setState({ image }, () => {
        this.ref.cache();
      });
    };
    image.crossOrigin = '';
    image.width = 48;
    image.height = 48;
    image.src = `https://functional-lancer.glitch.me?image=${this.props.src}`;
  }

  public render() {
    return (
      <ReactKonva.Stage width={48} height={48}>
        <ReactKonva.Layer>
          {this.state.image ? (
            <KImage
              image={this.state.image as any}
              red={150}
              green={255}
              blue={150}
              filters={[Konva.Filters.RGB]}
              ref={(node: any) => {
                this.ref = node;
              }}
            />
          ) : null}
        </ReactKonva.Layer>
      </ReactKonva.Stage>
    );
  }
}
