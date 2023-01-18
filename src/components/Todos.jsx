import TodoItem from "./TodoItem";

const Todos = ({
	input, // 인풋에 입력되는 텍스트
	todos, // 할 일 목록이 들어 있는 객체
	onChangeInput, // 인풋 내용을 변경 할 때 호출 할 함수
	onInsert, // 새로운 할 일을 등록 할 때 호출 할 함수
	onToggle, // 할 일을 체크/체크 해제 할 때 호출 할 함수
	onRemove // 할 일을 제거 할 때 호출 할 함수
}) => {
	return (
			<div>
				<form>
					<input />
					<button type="submit">등록</button>
				</form>
				<div>
					<TodoItem />
					<TodoItem />
					<TodoItem />
					<TodoItem />
					<TodoItem />
				</div>
			</div>
	)
}
export default Todos;