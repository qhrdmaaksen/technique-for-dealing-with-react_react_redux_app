import React from "react";
import Todos from "../components/Todos";
import { connect, useDispatch, useSelector } from "react-redux";
import { changeInput, insert, remove, toggle } from "../modules/todos";
import { useCallback } from "react";
import useActions from "../lib/useActions";

const TodosContainer = () => {
  const { input, todos } = useSelector(({ todos }) => ({
    input: todos.input,
    todos: todos.todos,
  }));

  const [onChangeInput, onInsert, onToggle, onRemove] = useActions(
    [changeInput, insert, toggle, remove],
    []
  );

  /* useActions 를 사용 해서 더이상 사용 안함
  const dispatch = useDispatch();

  const onChangeInput = useCallback(
    (input) => dispatch(changeInput(input)),
    [dispatch]
  );

  // useDispatch 를 사용할때 각 액션을 디스패치하는 함수를 만듦
  const onInsert = useCallback((text) => dispatch(insert(text)), [dispatch]);
  const onToggle = useCallback((id) => dispatch(toggle(id)), [dispatch]);
  const onRemove = useCallback((id) => dispatch(remove(id)), [dispatch]);*/

  console.log("TodosContainer onInsert", onInsert);

  return (
    <>
      <Todos
        input={input}
        todos={todos}
        onChangeInput={onChangeInput}
        onInsert={onInsert}
        onToggle={onToggle}
        onRemove={onRemove}
      />
    </>
  );
};

export default React.memo(TodosContainer);
/* react hooks 사용으로 더이상 connect 사용 안함
export default connect(
  // 비구조화 할당을 통해 todos 내부의 값들을 분리하여
  // state.todos.input 대신 todos.input 을 사용
  ({ todos }) => ({
    input: todos.input,
    todos: todos.todos,
  }),
  {
    changeInput,
    insert,
    toggle,
    remove,
  }
)(TodosContainer);*/
