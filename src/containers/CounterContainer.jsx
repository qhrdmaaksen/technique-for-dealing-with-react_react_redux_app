import { bindActionCreators } from "redux";
import Counter from "../components/Counter";
import { connect } from "react-redux";
import { increase, decrease } from "../modules/counter";

const CounterContainer = ({ number, increase, decrease }) => {
  return (
    <Counter number={number} onIncrement={increase} onDecrement={decrease} />
  );
};

/** mapStateToProps 와 mapDispatchToProps 에서 반환하는 객체 내부의 값들은 \
 * -컴포넌트의 props 로 전달되며 mapStateToProps 는 state 를 파라미터로 받아오며
 * --이 값은 현재 스토어가 지니고있는 상태를 가리킴
 * mapDispatchToProps 의 경우 store 의 내장함수 dispatch 를 파라미터로 받아옴
 */
/* 첫 번째 작성 방법
const mapStateToProps = (state) => ({
  number: state.counter.number,
});

const mapDispatchToProps = (dispatch) => ({
  increase: () => {
    dispatch(increase())
  },
  decrease: () => {
    dispatch(decrease())
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CounterContainer);*/

// 두 번째 작성 방법
// mapStateToProps 와 mapDispatchToProps 를 사용하지 않고 코드 작성
/*export default connect(
    (state) => ({
      number: state.counter.number,
    }),
    dispatch => ({
      increase: () => dispatch(increase()),
      decrease: () => dispatch(decrease())
    })
)(CounterContainer)*/

// 세 번째 작성 방법 - bindActionCreators 사용

/*export default connect(
  (state) => ({
    number: state.counter.number,
  }),
  (dispatch) =>
    bindActionCreators(
      {
        increase,
        decrease,
      },
      dispatch
    )
)(CounterContainer);*/

/* 네 번째 작성 방법 - connect 함수에 mapDispatchToProps 에 해당하는 파라미터를
  * 함수 형태가 아닌 액션 생성 함수로 이뤄진 객체 형태로 넣어주는 방법
*/
export default connect(
    (state) => ({
      number: state.counter.number
    }),
    {
      increase,
      decrease
    }
)(CounterContainer)
// 위와 같이 작성하면 connect 함수가 내부적으로 bindActionCreators 작업을 대신해줌

