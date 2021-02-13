export const SET_ALERT = 'SET_ALERT' as const;
export const REMOVE_ALERT = 'REMOVE_ALERT' as const;
export const setAlert = (msg: string) => ({ type: SET_ALERT, payload: msg });
export const removeAlert = (id: string) => ({
  type: REMOVE_ALERT,
  payload: id,
});
