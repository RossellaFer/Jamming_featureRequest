import React from 'react';
import './Track.css';


class Track extends React.Component {


	constructor(props) {
		super(props);
		this.renderAction = this.renderAction.bind(this);
		this.addTrack = this.addTrack.bind(this);
		this.removeTrack = this.removeTrack.bind(this);
		this.launchPreview = this.launchPreview.bind(this);
	};

// conditionally render something - if the onAdd method has been called, the plus sign will be displayed
// and the addTrack method will be called
// Then call the method in the element of the page
	renderAction() {
		if(this.props.onAdd) {
			return <a className="Track-action" onClick={this.addTrack}>+</a>
		}
		else {
			return <a className="Track-action" onClick={this.removeTrack}>-</a>
		}
	}

	addTrack(){
		this.props.onAdd(this.props.track);
	}

	removeTrack(){
		this.props.onRemove(this.props.track);
	}

	launchPreview() {
		this.props.launchPreview(this.props.track)
	}


	render() {
		return(
			<div className="Track">
  			  <div className="Track-information">
    		<h3>{this.props.track.name}</h3>
    <p>{this.props.track.artist} | {this.props.track.album} |
		<a onClick={this.props.launchPreview} id="preview"><i className="fas fa-volume-up"></i></a></p>
  </div>
  {this.renderAction()}
</div>
			);
	}
}

export default Track;
