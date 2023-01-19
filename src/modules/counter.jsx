//counter 모듈

// 액션 타입 정의
const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';

// 액션 생성 함수
export const increase = () => ({type: INCREASE})
export const decrease = () => ({type: DECREASE})

// 초기 상태 및 리듀서 함수
const initialState = {
	number: 0
}

const counter = (state = initialState, action) => {
	switch (action.type) {
		case INCREASE:
			return {
				number: state.number + 1
			}
		case DECREASE:
			return {
				number: state.number - 1
			}
		default:
			return state;
	}
}

export default counter; // 리듀서를 내보내줌
