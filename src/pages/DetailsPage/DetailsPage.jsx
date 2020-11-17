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
		release_date: releaseDate,
		release_dates: releaseDates,
	} = cardDetails;

	useEffect(() => {
		let unmounted = false;
		setLoading(true);
		fetch(
			`https://api.themoviedb.org/3/movie/${cardId}?api_key=${API_KEY}&language=en-US&append_to_response=release_dates`
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

	const getReleaseYear = () => {
		return releaseDate.split('-')[0];
	};

	// Search for release details based on release date
	const getCertification = () => {
		const res = releaseDates.results.find(
			(releaseObj) => releaseObj['iso_3166_1'] === 'US'
		);
		// console.log(res);
		return res.release_dates[0].certification;
	};

	//Change date's format from yyyy-mm-dd to mm/dd/yyyy
	const formatDate = () => {
		const [year, month, day] = releaseDate.split('-');
		return [month, day, year].join('/');
	};
	// Conditional rendering
	if (isLoading) {
		return <div>Loading...</div>;
	}
	return (
		<div>
			{backdropPath && (
				<div
					className='Backdrop-container'
					style={{
						backgroundImage: `url(
						https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${backdropPath}
					)`,
					}}
				>
					<div className='container'>
						{posterPath && (
							<img
								className='poster'
								src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${posterPath}`}
								alt={`${title}`}
								title={`${title}`}
							/>
						)}
						<div className='mainInfo'>
							<h1 className='title'>
								{title} <span>({releaseDate && getReleaseYear()})</span>
							</h1>
							<div>
								<span>{getCertification()} </span>
								<span>{formatDate()}</span>
							</div>
						</div>
					</div>
					<div className='overlay'></div>
				</div>
			)}
		</div>
	);
}

export default DetailsPage;
