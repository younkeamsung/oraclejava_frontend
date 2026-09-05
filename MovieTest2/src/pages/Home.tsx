import React, { useEffect, useState } from 'react'
import type { MovieSummary } from '../models/MovieSummary'
import MovieClients from '../clients/MovieClients';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
    const [movies, setMovies] = useState<MovieSummary[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true); // 로딩 상태를 관리하는 상태 변수 추가
    const client = new MovieClients();

    const fetchMovies = async () => {
        setIsLoading(true); // 데이터 요청 시작 시 로딩 상태를 true로 설정
        try {
            const data = await client.getMoviesAsync();
            setMovies(data);
        } catch(error){
            console.error('Error fetching movies:', error);
        } finally {
            setIsLoading(false); // 데이터 요청 완료 시 로딩 상태를 false로 설정
        }
        
    };

    useEffect(() => {
        fetchMovies();
    }, []); // 빈배열을 던지면 최초 마운트시 1회만 발생

    if (isLoading) {
        return <p className="mt-3"><em>영화 정보를 불러오는 중입니다...</em></p>; // 로딩 중일 때 표시할 내용
    }

    return (
        <div>
            <div className="row mt-2">
                <div className="col">
                    <Link className="btn btn-primary" to="/editmovie" 
                        role="button">
                        영화 추가
                    </Link>
                </div>
            </div>
            <table className='table table-striped table-bordered table-hover mt-3'>
                <thead className="table-dark">
                    <tr>
                        <th>제목</th>
                        <th>장르</th>
                        <th>가격</th>
                        <th>개봉년도</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {movies.map((movie)=>(
                    <tr key={movie.id}>
                        <td>{movie.name}</td>
                        <td>{movie.genre}</td>
                        <td>{movie.price}</td>
                        <td>{movie.releaseYear}</td>
                        <td>
                            <Link className="btn btn-primary" to={`/editmovie/${movie.id}`} 
                                role="button">
                                <i className="bi bi-pencil-square"></i> 수정
                            </Link>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}


export default Home