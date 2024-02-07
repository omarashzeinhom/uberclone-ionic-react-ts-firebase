import { useContext } from "react";
import { RouteComponentProps } from "react-router";
import { __RouterContext } from "react-router";

import { useHistory, useLocation, useParams, useRouteMatch } from "react-router-dom";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const code = urlParams.get('code')

export const useRouter = <TParams extends {}>() => {
  return {
    history: useHistory(),
    location: useLocation(),
    match: useRouteMatch(),
    params: useParams<TParams>()
  } as RouteComponentProps<TParams>;
};
//https://codesandbox.io/s/3rwq8r85p?file=/src/useRouter.ts
