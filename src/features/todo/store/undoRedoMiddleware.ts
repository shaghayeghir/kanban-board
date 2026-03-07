import { Middleware } from "@reduxjs/toolkit"

export const undoRedoMiddleware: Middleware = store => next => action => {
  const stateBefore = store.getState()

  const result = next(action)

  const stateAfter = store.getState()

  // اینجا state تغییر کرده؟
  if (stateAfter.todo.todos !== stateBefore.todo.todos) {
    store.dispatch({ type: "__UNDO_REDO_SAVE__" })
  }

  return result
}
