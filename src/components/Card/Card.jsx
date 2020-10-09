import React, { Component } from 'react';
import './Card.scss';

class Card extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const { title, posterPath, voteAverage, releaseDate } = this.props;
		return (
			<div className='Card'>
				<img
					src={`https://image.tmdb.org/t/p/w220_and_h330_face${posterPath}`}
					alt={`${title}`}
					title={`${title}`}
				/>
				<div className='CardInfo'>
					<div>
						{voteAverage * 10}
						<sup>%</sup>
					</div>
					<p className='title'>{title}</p>
					<p>{releaseDate}</p>
				</div>
			</div>
		);
	}
}

export default Card;
