export interface MovieSummary {
    id: string;
    name: string;
    genre: string;
    price: number;       // 타입스크리트는 문자, 숫자, 불링타입밖에없음
    releaseYear: number; // 계산이 필요한 숫자면 number타입 그냥 조회만할거면 string타입
}