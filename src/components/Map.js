import React from 'react';
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
} from "react-simple-maps";
import tooltip from "wsdm-tooltip";

const wrapperStyles = {
  width: "100%",
  maxWidth: "100%",
  margin: "0 auto",
};

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zoom: 1,
    };
    this.handleZoomIn = this.handleZoomIn.bind(this)
    this.handleZoomOut = this.handleZoomOut.bind(this)
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    }
  componentDidMount() {
    this.tip = tooltip();
    this.tip.create();
  }
  handleMouseMove(geography, evt) {
    this.tip.show(`
      <div class="tooltip-inner">
        ${geography.properties.name}
      </div>
    `)
    this.tip.position({ pageX: evt.pageX, pageY: evt.pageY })
  }
  handleMouseLeave() {
    this.tip.hide();
  }
  handleZoomIn() {
    this.setState({
      zoom: this.state.zoom * 2,
    });
  }
  handleZoomOut() {
    this.setState({
      zoom: this.state.zoom / 2,
    });
  }
  render() {
    return (
      <div className='map' style={wrapperStyles}>
        <div onClick={ this.handleZoomOut } className='button-zoom'>-</div>
        <div onClick={ this.handleZoomIn } className='button-zoom'>+</div>
        <ComposableMap
          projectionConfig={{
            scale: 205,
            rotation: [-11,0,0],
          }}
          width={980}
          height={551}
          style={{
            width: "100%",
            maxWidth: 980,
            height: "auto",
          }}
          >
          <ZoomableGroup
            center={[0,20]}
            zoom={this.state.zoom}
            onMoveStart={this.handleMoveStart}
            onMoveEnd={this.handleMoveEnd}>
            <Geographies geography="/world-50m.json" disableOptimisation={true}>
              {(geographies, projection) => geographies.map((geography, i) => {
                return <Geography
                  key={i}
                  geography={geography}
                  onMouseMove={this.handleMouseMove}
                  onMouseLeave={this.handleMouseLeave}
                  onClick={() => {
                    this.props.onCountryClick(geography.id);
                  }}
                  projection={projection}
                  style={{
                    default: {
                      fill: "#ECEFF1",
                      stroke: "#607D8B",
                      strokeWidth: 0.75,
                      outline: "none",
                    },
                    hover: {
                      fill: "#607D8B",
                      stroke: "#607D8B",
                      strokeWidth: 0.75,
                      outline: "none",
                    },
                    pressed: {
                      fill: "#b5e0dc",
                      stroke: "#607D8B",
                      strokeWidth: 0.75,
                      outline: "none",
                    },
                  }}
                />
              })}
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      </div>
    )
  }
}

export default Map;
