// 액션 타입 정의
import { createAction, handleAction, handleActions } from "redux-actions";
import produce from "immer";

const CHANGE_INPUT = "todos/CHANGE_INPUT"; // input 값 변경\
const INSERT = "todos/INSERT"; // 새로운 todo 등록
const TOGGLE = "todos/TOGGLE"; // todo 체크/체크 해제
const REMOVE = "todos/REMOVE"; // todo 제거

// 액션 생성 함수
export const changeInput = (input) => ({
  type: CHANGE_INPUT,
  input,
});

/**
 * 아래 액션 함수 중에 insert 함수는 액션 객체를 만들때 파라미터외에 사전에 이미 선언된 id 값에도 의존하며
 * -이 액션 생성 함수는 호출될때마다 id 값에 1씩 더해주도록하고 id 값은 각 todo 객체가 들고있게될 고윳값임
 * -여기서 id 값이 3인 이유로는 다음 초기 상태를 작성할때 todo 객체 두개를 사전에 미리 넣어둘것이므로 그다음에 새로
 * --추가될 항목의 id 가 3이기 때문임*/
let id = 3; // insert 가 호출 될 때마다 1씩 더해짐

/**
 * redux-actions 사용 후 액션 생성 함수
 * insert 함수는 파라미터로 text 를 받아와서 액션 객체를 만들어줌
 * 나머지 액션 함수는 파라미터를 그대로 반환하는 함수를 넣어줌
 * 굳이 안해도되지만 액션 생성 함수의 파라미터로 어떤 값이 필요한지 쉽게 파악할수 있는 장점이있음
 * */
export const insert = createAction(INSERT, (text) => ({
  id: id++,
  text,
  done: false,
}));

export const toggle = createAction(TOGGLE, (id) => id);

export const remove = createAction(REMOVE, (id) => id);

/* redux-actions 를 사용하면 이렇게 액션 생성 함수를 작성할 필요가 없음
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
});*/

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

/**
 * redux-actions 사용 및 immer 사용 리듀서 함수
 * 이머를 사용한다고 모든 업데이트 함수에 immer 를 적용할 필요는 없음(일반 js 로 처리하는것이 편할땐 immer 를 적용하지않아도됨)
 * 아래 코드에서
 * */
const todos = handleAction(
  {
    [CHANGE_INPUT]: (state, { payload: input }) =>
      produce(state, (draft) => {
        draft.input = input;
      }),
    [INSERT]: (state, { payload: todo }) =>
      produce(state, (draft) => {
        draft.todos.push(todo);
      }),
    [TOGGLE]: (state, { payload: id }) =>
      produce(state, (draft) => {
        const todo = draft.todos.find((todo) => todo.id === id);
        todo.done = !todo.done;
      }),
    [REMOVE]: (state, { payload: id }) =>
      produce(state, (draft) => {
        const index = draft.todos.findIndex((todo) => todo.id !== id);
        draft.todos.splice(index, 1);
      }),
  },
  initialState
);

/**
 * redux-actions 사용 후 리듀서 함수
 * 모든 추가 데이터 값을 action.payload 로 사용하기 때문에 나중에 리듀서 코드 다시 볼때 헷갈릴수있음
 * -객체 비구조화 할당 문법으로 action 값의 payload 이름을 새로 설정해 주면 action.payload 가 정확히 어떤 값을 의미하는지 알수있음
 * */
/*
const todos = handleActions(
  {
    [CHANGE_INPUT]: (state, { payload: input }) => ({
      ...state, input }),
    [INSERT]: (state, { payload: todo }) => ({
      ...state,
      todos: state.todos.concat(todo),
    }),
    [TOGGLE]: (state, { payload: id }) => ({
      ...state,
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      ),
    }),
    [REMOVE]: (state, { payload: id }) => ({
      ...state,
      todos: state.todos.filter((todo) => todo.id !== id),
    }),
  },
  initialState
);*/

/* redux-actions 사용 전 코드
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
};*/

export default todos;
