import React, { useState, useEffect } from 'react'
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';
import instance from '../../axios'
import './Row.css'

function Row( props ) {

    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");
    
    useEffect( ()=>{
        async function fetchData() {
            const request = await instance.get(props.fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [props.fetchUrl]);

    const opts = {
        height: "390",
        width: "100%",
        playerVars: { autoplay:1 }
    }

    const handleClick = (movie)=> {
        if (trailerUrl) {
            setTrailerUrl("");
            console.log("Closed Trailer")
        } else {
            console.log("Opened Trailer")
            console.log(movie)
            movieTrailer(movie?.name).then(url=>console.log(url))
            movieTrailer(movie?.name || "").then(url => {
                const urlParams = new URLSearchParams(new URL(url).search);
                setTrailerUrl(urlParams.get('v'));
            }).catch(error => console.log(error))
        }
    }

    return (
        <div className='row'>
            <h2 className='row_heading'>{props.title}</h2>
            <div className='row_posters'>
                {movies.map(movie =>(
                    <img 
                        key={movie.id} 
                        className={`poster_image ${props.isLargeRow && 'poster_image_larger'}`} 
                        src={`https://image.tmdb.org/t/p/original/${props.isLargeRow?movie.poster_path:movie.backdrop_path}`} 
                        alt={movie.name}
                        onClick={()=>handleClick(movie)}
                    />
                ))}
            </div>
            { trailerUrl && <YouTube videoId={trailerUrl} opts={opts} /> }
        </div>
    )
} 

export default Row