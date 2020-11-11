import React, { useEffect, useState, useCallback } from 'react';
import { API_KEY } from '../../config.jsx';
import { useParams } from 'react-router-dom';
import './DetailsPage.styles.scss';

function DetailsPage(props) {
	// console.log(this.props.match);
	const [cardDetails, setCardDetails] = useState({});
	const [isLoading, setLoading] = useState(false);
	let { cardId } = useParams();
	const {
		poster_path: posterPath,
		title,
		backdrop_path: backdropPath,
	} = cardDetails;
	useEffect(() => {
		let unmounted = false;
		setLoading(true);
		fetch(
			`https://api.themoviedb.org/3/movie/${cardId}?api_key=${API_KEY}&language=en-US&append_to_response=images`
		)
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				if (!unmounted) {
					setCardDetails(data);
					setLoading(false);
				}
			});
		return () => {
			unmounted = true;
		};
	}, []);

	if (isLoading) {
		return <div>Loading...</div>;
	}
	return (
		<div>
			<div
				className='Backdrop-container'
				style={{
					backgroundImage: `url(
						https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${backdropPath}
					)`,
				}}
			>
				{/* <img
					className='Backdrop'
					src={`https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${backdropPath}`}
					alt={`${title}`}
					title={`${title}`}
				/> */}
				<div className='overlay'></div>
			</div>
		</div>
	);
}

export default DetailsPage;
