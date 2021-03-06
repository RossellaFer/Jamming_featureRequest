import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			term: ''
		}
		this.search = this.search.bind(this);
		this.handleTermChange = this.handleTermChange.bind(this);
	}

	search(){
		this.props.onSearch(this.state.term);
	}

	//This gets the term from the input box
	handleTermChange(e) {
		const searchTerm = e.target.value;
		this.setState({term: searchTerm});
	}

	render() {
		return  (
			<div className="SearchBar">
  				<input onChange={this.handleTermChange} placeholder="Enter A Song, Album, or Artist" />
  				<a onClick={this.search}> SEARCH</a>
			</div>
			);
	}
}

export default SearchBar;
