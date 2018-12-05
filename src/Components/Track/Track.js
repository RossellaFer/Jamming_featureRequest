import React from "react";
import "./Track.css";

class Track extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      play: false,
      audio: new Audio(this.props.track.preview)
    };
    this.renderAction = this.renderAction.bind(this);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.playSong = this.playSong.bind(this);
    this.pauseSong = this.pauseSong.bind(this);
    this.togglePlay = this.togglePlay.bind(this);
    this.renderPreview = this.renderPreview.bind(this);
  }

  // conditionally render something - if the onAdd method has been called, the plus sign will be displayed
  // and the addTrack method will be called
  // Then call the method in the element of the page
  renderAction() {
    if (this.props.onAdd) {
      return (
        <a className="Track-action" onClick={this.addTrack}>
          +
        </a>
      );
    } else {
      return (
        <a className="Track-action" onClick={this.removeTrack}>
          -
        </a>
      );
    }
  }

  addTrack() {
    this.props.onAdd(this.props.track);
  }

  removeTrack() {
    this.props.onRemove(this.props.track);
  }

  renderPreview() {
    if (this.props.track.preview !== null) {
      if (this.state.play === false) {
        return (
          <a onClick={this.togglePlay} id="preview">
            |
            <i className="fas fa-volume-up" />
          </a>
        );
      } else if (this.state.play === true) {
        return (
          <a onClick={this.togglePlay} id="preview">
            |
            <i className="fas fa-pause" />
          </a>
        );
      }
    }
  }

  playSong() {
    this.setState({
      play: true
    });
    this.state.audio.play();
  }

  pauseSong() {
    this.setState({
      play: false
    });
    this.state.audio.pause();
  }

  togglePlay(e) {
    e.preventDefault();
    this.state.play === true ? this.pauseSong() : this.playSong();
  }

  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3> {this.props.track.name} </h3>
          <p>
            {this.props.track.artist} | {this.props.track.album}
            {this.renderPreview()}
          </p>
        </div>
        {this.renderAction()}
      </div>
    );
  }
}

export default Track;
