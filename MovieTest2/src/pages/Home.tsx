import React, { useEffect, useState } from 'react'
import type { MovieSummary } from '../models/MovieSummary'
import MovieClients from '../clients/MovieClients';
import { Link } from 'react-router-dom';
import DeleteMovieModal from '../components/DeleteMovieModal';

declare global {
    interface Window {
        bootstrap: any;
    }
}

const Home: React.FC = () => {
    const [movies, setMovies] = useState<MovieSummary[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true); // 로딩 상태를 관리하는 상태 변수 추가
    const [movieToDelete, setMovieToDelete] = useState<MovieSummary | null>(null); // 삭제할 영화의 ID를 저장하는 상태 변수 추가
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

    useEffect(() => {
        if (movieToDelete) {
            // 맨 처음 모달은 제외
            const modalElement = document.getElementById(`deleteModal-${movieToDelete.id}`)!;
            const modal = new window.bootstrap.Modal(modalElement!);

            const handleModalHide = () => {
                setMovieToDelete(null);
            }
            modalElement.addEventListener('hidden.bs.modal', handleModalHide);

            modal.show();

            return () => {
                modalElement.removeEventListener('hidden.bs.modal', handleModalHide);
            }
        }
    }, [movieToDelete]); // movieToDelete 상태가 변경될 때마다 실행

    const handleDeleteMovie = async (movieId: string) => {
        try {
            const result = await client.deleteMovieAsync(movieId);
            if (result.succeeded) {
                setMovieToDelete(null); // 모달 닫기
                fetchMovies(); // 영화 목록 새로고침
            } else {
                alert(`영화 삭제 실패: ${result.errors.join(', ')}`);
            }
        } catch (error) {
            console.error('Error deleting movie:', error);
        }
    };

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
                            <button className="btn btn-danger"
                                onClick={() => setMovieToDelete(movie)}> 
                                <i className="bi bi-trash"></i> 삭제
                            </button>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
            {movieToDelete && (
                <DeleteMovieModal movie={movieToDelete} onDelete={handleDeleteMovie} />
            )}
        </div>
    )
}


export default Home