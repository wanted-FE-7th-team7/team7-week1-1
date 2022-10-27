import { useEffect } from 'react';

/** 유효성 검사 커스텀 훅
 *
 * checkFunction : 유효성 검사 함수

 * checkedArg : checkFunction의 인자
 *
 * setIsState : 변경할 상태
 */
export default function useCheck(checkFunction, checkedArg, setIsState) {
  useEffect(() => {
    if (checkFunction(checkedArg) === true) {
      setIsState(true);
    } else if (checkFunction(checkedArg) === false) {
      setIsState(false);
    }
  }, [checkFunction, checkedArg, setIsState]);
}
