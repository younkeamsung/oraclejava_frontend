import React from 'react'
import type { MovieSummary } from '../models/MovieSummary';

interface DeleteMovieModalProps {
    movie: MovieSummary;
    onDelete: (movieId: string) => void; // 삭제 버튼 클릭 시 호출되는 콜백 함수
}

const DeleteMovieModal: React.FC<DeleteMovieModalProps> = ({ movie, onDelete }) => {
    return (

    <div className="modal fade" id={`deleteModal-${movie.id}`} tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog">
        <div className="modal-content">
        <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">{movie.name} 삭제</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
            {movie.name}을(를) 삭제하시겠습니까?
        </div>
        <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
            <button type="button" className="btn btn-primary" 
                data-bs-dismiss="modal"
                onClick={() => onDelete(movie.id)}>
                삭제
            </button>
        </div>
        </div>
    </div>
    </div>
    )
}

export default DeleteMovieModal