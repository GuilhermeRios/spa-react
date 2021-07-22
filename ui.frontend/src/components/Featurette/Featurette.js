import React, { Component } from 'react';
import './Featurette.scss';

/**
 * Featurette React component
 */
const FeaturetteEditConfig = {

  emptyLabel: 'Featurette',

  isEmpty: function (props) {
    return !props || (!props.header && !props.description);
  }
};

class Featurette extends Component {

  render() {
    console.log('Featurette', 'v0.1', this)
    return (
      <div className="row featurette">
        <div className="col-md-7">
          <h2 className="featurette-heading">{this.props.header}</h2>
          <p className="lead">{this.props.description}</p>
        </div>
        <div className="col-md-5">
          <img className="featurette-image img-fluid mx-auto" src={this.props.image.src} alt={this.props.image.alt} />
        </div>
      </div>
    );
  }
}

export { Featurette, FeaturetteEditConfig };