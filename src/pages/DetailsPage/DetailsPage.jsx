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
		genres,
		runtime,
		tagline,
		overview,
		credits,
	} = cardDetails;

	useEffect(() => {
		let unmounted = false;
		setLoading(true);
		fetch(
			`https://api.themoviedb.org/3/movie/${cardId}?api_key=${API_KEY}&language=en-US&append_to_response=release_dates,credits`
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

	const getCrewMembers = () => {
		console.log(credits.crew);
	};

	const getReleaseYear = () => {
		return releaseDate.split('-')[0];
	};

	// Search for and return certification based on release date
	const getCertification = () => {
		const res = releaseDates.results.find(
			(releaseObj) => releaseObj['iso_3166_1'] === 'US'
		);
		// console.log(res);
		return res.release_dates[0].certification;
	};

	//Change date's format from yyyy-mm-dd to mm/dd/yyyy
	const getReleaseDate = () => {
		const [year, month, day] = releaseDate.split('-');
		return [month, day, year].join('/');
	};

	// Retrieve from api response and return list of genres
	const getGenresList = () => {
		return genres.reduce((acc, obj) => {
			acc.push(obj.name);
			return acc;
		}, []);
	};

	// Take runtime from state and return in '1h 1m' format
	const getRuntime = () => {
		let hours = Math.floor(runtime / 60);
		let minutes = runtime % 60;
		hours = hours > 0 ? `${hours}h` : '';
		minutes = minutes > 0 ? `${minutes}m` : '';
		return `${hours} ${minutes}`;
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
						<section className='mainInfo'>
							<h1 className='title'>
								{title} <span>({releaseDate && getReleaseYear()})</span>
							</h1>
							<div>
								<span className='certification'>
									{getCertification() || '16+'}{' '}
								</span>
								<span>{getReleaseDate()}</span>
								<div className='dot'></div>
								<span>{getGenresList().join(', ')}</span>
								<div className='dot'></div>
								<span>{getRuntime()}</span>
							</div>
							<p className='tagline'>{tagline}</p>
							<div className='overview'>
								<h4>Overview</h4>
								<p>{overview}</p>
							</div>
							<div className='crew'>{getCrewMembers()}</div>
						</section>
					</div>
					<div className='overlay'></div>
				</div>
			)}
		</div>
	);
}

export default DetailsPage;
