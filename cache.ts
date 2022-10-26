import { makeVar } from '@apollo/client'
type Task = {
  title: string
}

//todoVarには入力された値がはいる
export const todoVar = makeVar<Task[]>([])