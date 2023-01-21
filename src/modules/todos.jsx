// 액션 타입 정의
const CHANGE_INPUT = "todos/CHANGE_INPUT"; // input 값 변경\
const INSERT = "todos/INSERT"; // 새로운 todo 등록
const TOGGLE = "todos/TOGGLE"; // todo 체크/체크 해제
const REMOVE = "todos/REMOVE"; // todo 제거

// 액션 생성 함수
export const changeInput = (input) => ({
  type: CHANGE_INPUT,
  input,
});

/** 아래 액션 함수 중에 insert 함수는 액션 객체를 만들때 파라미터외에 사전에 이미 선언된 id 값에도 의존하며
 * -이 액션 생성 함수는 호출될때마다 id 값에 1씩 더해주도록하고 id 값은 각 todo 객체가 들고있게될 고윳값임
 * -여기서 id 값이 3인 이유로는 다음 초기 상태를 작성할때 todo 객체 두개를 사전에 미리 넣어둘것이므로 그다음에 새로
 * --추가될 항목의 id 가 3이기 때문임*/
let id = 3; // insert 가 호출 될 때마다 1씩 더해짐
export const insert = (text) => ({
  type: INSERT,
  todo: {
    id: id++,
    text,
    done: false,
  },
});

export const toggle = (id) => ({
  type: TOGGLE,
  id,
});

export const remove = (id) => ({
  type: REMOVE,
  id,
});

// 초기 상태 및 리듀서 함수
const initialState = {
  input: "",
  todos: [
    {
      id: 1,
      text: "리덕스 기초 배우기",
      done: true,
    },
    {
      id: 2,
      text: "리액트와 리덕스 사용하기",
      done: false,
    },
  ],
};

const todos = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_INPUT:
      return {
        ...state,
        input: action.input,
      };
    case INSERT:
      return {
        ...state,
        todos: state.todos.concat(action.todo),
      };
    case TOGGLE:
      return {
        ...state,
        todos: state.todos.map((todo) => {
          return todo.id === action.id ? { ...todo, done: !todo.done } : todo;
        }),
      };
    case REMOVE:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.id),
      };
    default:
      return state;
  }
};

export default todos;
