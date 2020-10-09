import React, { Component } from 'react';
import MovieListComponent from './components/CardList/CardList';
import { API_KEY } from './config.jsx';
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = { isLoading: false, cards: [] };
	}
	componentDidMount() {
		this.setState({ isLoading: true });
		fetch(
			`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&page=1`
		)
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				return this.setState({ cards: data.results, isLoading: false });
			});
	}

	render() {
		if (this.state.isLoading) {
			return <h3>Loading...</h3>;
		}
		return (
			<div>
				<MovieListComponent cards={this.state.cards} />
			</div>
		);
	}
}

export default App;
