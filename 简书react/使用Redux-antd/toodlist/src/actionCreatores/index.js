import { CHANGE_INPUT_VALUE, ADD_ITEM, DELETE_ITEM  } from '../actionTypes'

export const getInputChangeAction = (value) => ({
  type: CHANGE_INPUT_VALUE,
  value
})