import React, { Component } from 'react';
import MovieList from './components/CardList/CardList';
import DetailsPage from './pages/DetailsPage/DetailsPage';
import { Link, Switch, Route } from 'react-router-dom';
import { API_KEY } from './config.jsx';
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: false,
			cards: [],
			page: 1,
			totalPages: 0,
			sortBy: 'popularity.desc',
			cardDetails: null,
		};
	}

	fetchData = () => {
		this.setState({ isLoading: true });
		fetch(
			`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=${this.state.sortBy}&page=${this.state.page}`
		)
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				return this.setState((state) => ({
					cards: [...state.cards, ...data.results],
					isLoading: false,
					totalPages: data.total_pages,
					page: data.page,
				}));
			});
	};

	componentDidMount() {
		this.fetchData();
	}

	loadMore = () => {
		const currPage = this.state.page;
		this.setState({ page: currPage + 1 }, () => {
			this.fetchData();
		});
	};

	render() {
		if (this.state.isLoading) {
			return <h3>Loading...</h3>;
		}
		return (
			<div className='App'>
				<Link to='/movie'>Movies</Link>
				<Switch>
					<Route exact path='/movie'>
						<MovieList cards={this.state.cards} />
					</Route>
					<Route path='/movie/:cardId'>
						<DetailsPage
							getCardDetails={this.getCardDetails}
							cardDetails={this.state.cardDetails}
						/>
					</Route>
				</Switch>
				<button onClick={this.loadMore} className='loadMore'>
					Load More
				</button>
			</div>
		);
	}
}

export default App;
