import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import type { MovieDetails } from '../models/MovieDetails';
import MovieClients from '../clients/MovieClients';
import GenreClients from '../clients/GenreClients';
import type { Genre } from '../models/Genre';

const EditMovie: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // useParams를 사용하여 URL에서 id를 가져옴
    const [title, setTitle] = useState<string>('');
    const navigate = useNavigate(); // import해서 사용하고 클릭하면 정해놓은 page로 이동함
    const [movie, setMovie] = useState<MovieDetails | null>(null);
    const [genres, setGenres] = useState<Genre[] | null>(null); // 장르 목록을 저장할 상태 변수 추가
    const genreClient = new GenreClients();
    const movieClient = new MovieClients();

    // 장르
    useEffect(() => {
        const fetchData = async () => {

            try {
                if (id) {
                    const movieData = await movieClient.getMovieAsync(id);
                    setMovie(movieData);
                    setTitle("영화 수정");
                } else {
                    setMovie({
                        id: '',
                        name: '',
                        genreId: '',
                        price: 0,
                        releaseYear: new Date().getFullYear()
                    });
                    setTitle("영화 추가");
                }

                const genresData = await genreClient.getGenresAsync();
                setGenres(genresData);
            } catch (error) {
                console.error('Failed to fetch genres:', error);
            }
        };
        fetchData();
    }, []); // 최초 1회만 반복

    const handleInputChange = 
    (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setMovie((prevMovie) => ({
            ...prevMovie!,
            [name]: value
        }));
    };

    // 영화 추가 버튼 클릭 시 호출되는 함수
    const handleSubmit = async(event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(!movie) return;
        console.log(movie); //handleSubmit 이벤트가 발생되면 콘솔에 movie 객체를 출력
        const movieClient = new MovieClients();
        const result = await movieClient.addMovieAsync(movie);
        if(result.succeeded){
            navigate('/'); // 영화 추가 성공 시 홈으로 이동
        } else {
            alert(`영화 추가 실패: ${result.errors.join(', ')}`); // 영화 추가 실패 시 에러 메시지 표시
        }

    }

    return (
        <div>   
            <h3>{title}</h3>
            <div className="row mb-2">
                <div className="col-md-4">
                    <form onSubmit={handleSubmit}> 
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">제목:</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                value={movie?.name}
                                onChange={handleInputChange}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="genreId" className="form-label">장르:</label>
                            <select
                                id="genreId"
                                name="genreId"
                                value={movie?.genreId}
                                onChange={handleInputChange}
                                className="form-select"
                                required
                            >
                                <option value="">장르 선택</option>
                                {genres?.map((genre) => (
                                    <option key={genre.id} value={genre.id}>
                                        {genre.name}
                                    </option>
                                ))}
                            </select>
                            {/*<input
                                id="genreId"
                                name="genreId"
                                onChange={handleInputChange}
                                className="form-control"
                                required
                            >
                                
                            />*/}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="price" className="form-label">가격:</label>
                            <input
                                id="price"
                                name="price"
                                type="number"
                                value={movie?.price}
                                onChange={handleInputChange}
                                className="form-control"
                                required min="1" max="100000" //step="1000" = 1000 단위로 입력 가능
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="releaseYear" className="form-label">출시 연도:</label>
                            <input
                                id="releaseYear"
                                name="releaseYear"
                                type="number"
                                value={movie?.releaseYear}
                                onChange={handleInputChange}
                                className="form-control"
                                required min="1895" max="2099"
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">저장</button>
                        <button type="button" className="btn btn-secondary ms-2"
                            onClick={() => navigate('/')}
                        >
                            취소
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditMovie