import { ReduxState } from "../store";
import { useSelector } from "react-redux";

export const useReduxState = <S>(selector: Selector<S>): S =>
  useSelector<ReduxState, S>(selector);

type Selector<S> = (reduxState: ReduxState) => S;
