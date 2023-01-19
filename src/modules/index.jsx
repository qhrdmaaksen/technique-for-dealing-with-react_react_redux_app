import {combineReducers} from "redux";
import counter from "./counter";
import todos from "./todos";

// 루트 리듀서를 만들어서 내보내줌
/* 후에 createStore 함수를 사용해 store 를 생성할땐 리듀서를 하나만 사용해야함
* - 이작업은 리덕스에서 제공하는 combineReducers 유틸 함수를 사용해 처리할 수 있음*/
const rootReducer = combineReducers({
	counter,
	todos,
})
export default rootReducer;