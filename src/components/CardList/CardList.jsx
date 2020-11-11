import React, { Component } from 'react';
import Card from '../Card/Card';
import { Link } from 'react-router-dom';
import './CardList.scss';

class CardList extends Component {
	constructor(props) {
		super(props);
		this.state = { strId: '' };
	}

	render() {
		return (
			<div className='CardList'>
				{this.props.cards.map((card) => {
					return (
						<Link to={`/movie/${card.id}`} key={card.id}>
							<Card
								id={card.id}
								posterPath={card.poster_path}
								title={card.title}
								voteAverage={card.vote_average}
								releaseDate={card.release_date}
							/>
						</Link>
					);
				})}
			</div>
		);
	}
}

export default CardList;
