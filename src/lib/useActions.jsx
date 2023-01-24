import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { useMemo } from "react";

/**
 * 아래 작성한 훅은 액션 생성 함수를 액션을 디스패치하는 함수로 변환해줌
 * 액션 생성 함수를 사용해 액션 객체를 만들고 이를 스토어에 디스패치하는 작업을 해주는 함수를 자동으로 만들어줌
 * useActions 에는 두가지 파라미터가 필요하며 첫번째는 액션 생성함수로 이뤄진 배열임
 * -두번째는 deps 배열이며 이 배열안에 들어있는 원소가 바뀌면 액션을 디스패치하는 함수를 새로 만들게됨
 * */
export default function useActions(actions, deps) {
  const dispatch = useDispatch();
  return useMemo(
    () => {
      if (Array.isArray(actions)) {
        return actions.map((a) => bindActionCreators(a, dispatch));
      }
      return bindActionCreators(actions, dispatch);
    },
    deps ? [dispatch, ...deps] : deps
  );
}
