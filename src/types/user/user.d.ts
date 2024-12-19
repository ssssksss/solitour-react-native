interface IUser {
  id: number;
  createdAt: string; // ISO 8601 날짜 문자열
  createdDate: string; // ISO 8601 날짜 문자열
  email: string;
  nickname: string;
  isAdmin: boolean;
  phoneNumber: string | null;
  provider: 'kakao' | 'google' | 'naver' | null; // 예시로 다른 provider를 추가
  sex: 'male' | 'female' | null; // null이 가능한 경우 포함
  age: number | null;
  userImage: {
    address: string,
    createDate: string;
  }
  address: string | null;
  userStatus: '활성화' | '비활성화' | '삭제됨'; // 예시로 다른 상태를 추가
}
