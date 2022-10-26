import { ChangeEvent, FormEvent, useState, VFC } from 'react'
import { todoVar } from '../cache'
//useReactiveVar=方法された物を参照する事ができる
import { useReactiveVar } from '@apollo/client'
import Link from 'next/link'

export const LocalStateA: VFC = () => {
  const [input, setInput] = useState('')

  const todos = useReactiveVar(todoVar)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    //現在のstateの値を展開し末尾に追加する
    todoVar([...todoVar(), { title: input }])
    setInput('')
  }

  return (
    <>
      <p className="mb-3 font-bold">makeVar</p>
      {todos?.map((task, index) => {
        return (
          <p className="y-1 mb-3" key={index}>
            {task.title}
          </p>
        )
      })}
      <form
        className="flex flex-col items-center justify-center"
        onSubmit={handleSubmit}
      >
        <input
          className="mb-3 border border-gray-300 px-3 py-2"
          placeholder="New task ?"
          value={input}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setInput(e.target.value)
          }
        />
        <button
          disabled={!input}
          className="mb-3 rounded-2xl bg-indigo-600 py-1 px-3 text-white hover:bg-indigo-700 focus:outline-none disabled:opacity-40"
          type="submit"
        >
          Add new state
        </button>
      </form>
      <Link href="/local-state-b">
        <a>Next</a>
      </Link>
    </>
  )
}
