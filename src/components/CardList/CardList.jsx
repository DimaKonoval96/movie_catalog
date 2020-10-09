import React, { Component } from 'react';
import Card from '../Card/Card';
import './CardList.scss';

class CardList extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div className='CardList'>
				{this.props.cards.map((card) => {
					return (
						<Card
							key={card.id}
							id={card.id}
							posterPath={card.poster_path}
							title={card.title}
							voteAverage={card.vote_average}
							releaseDate={card.release_date}
						/>
					);
				})}
			</div>
		);
	}
}

export default CardList;
