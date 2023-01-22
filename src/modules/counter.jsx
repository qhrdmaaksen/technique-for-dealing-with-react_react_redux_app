//counter 모듈
import { createAction, handleActions } from "redux-actions";

// 액션 타입 정의
const INCREASE = "counter/INCREASE";
const DECREASE = "counter/DECREASE";

// 액션 생성 함수
export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);

// 초기 상태 및 리듀서 함수
const initialState = {
  number: 0,
};

/** redux-actions 사용 후 코드
 * redux-actions 를 사용하면 handleActions 함수를 사용하여 리듀서 함수를 작성할 수 있음
 * handleActions 함수의 파라미터에 첫 번째 파라미터에는 각 액션에 대한 업데이트 함수를 넣어줌
 * -두 번째 파라미터에는 초기 상태를 넣어줌*/
const counter = handleActions(
  {
    [INCREASE]: (state, action) => ({ number: state.number + 1 }),
    [DECREASE]: (state, action) => ({ number: state.number - 1 }),
  },
  initialState
);

/* redux-actions 사용 전 코드
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
}*/

export default counter; // 리듀서를 내보내줌
