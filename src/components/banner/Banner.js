import React, { useEffect, useState } from 'react'
import instance from '../../axios';
import requests from '../../requests';
import './Banner.css'

function Banner() {

    const [movie, setMovie] = useState([]);

    useEffect(()=>{
        async function fetchData(){
            const request = await instance.get(requests.fetchNetflixOriginals);
            setMovie(request.data.results[Math.floor(Math.random()*request.data.results.length -1)]);
            return request;
        }
        fetchData();
    }, []);
    
    const truncate = (str, n) => {
		return str?.length > n ? str.substr(0, n - 1) + "..." : str;
	};

    return (
        <div className='banner' style={{backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`}}>
            <div className="banner_content">
                <h1 className="banner_title">{movie?.title || movie?.name || movie?.original_name}</h1>
                <div className="banner_buttons">
                    <button className="banner_button">Play</button>
                    <button className="banner_button">My List</button>
                </div>
                <div className="banner_description">
                    { truncate( movie?.overview, 150 ) }
                </div>
            </div>
            <div className="banner_fadeBottom"></div>
        </div>
    )
}

export default Banner