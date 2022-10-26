/* eslint-disable react/display-name */
import { MutationFunction } from '@apollo/client'
import { VFC, memo, Dispatch, SetStateAction } from 'react'
import {
  DeleteUserMutation,
  DeleteUserMutationVariables,
  Users,
} from '../types/generated/graphql.tsx/graphql'

export type DeleteUserMutationFn = MutationFunction<
  DeleteUserMutation,
  DeleteUserMutationVariables
>


type Props = {
  user: {
    __typename?: 'users'
  } & Pick<Users, 'id' | 'name' | 'created_at'>
  delete_users_by_pk: DeleteUserMutationFn
  setEditedUser: Dispatch<
    SetStateAction<{
      id: string
      name: string
    }>
  >
}

export const UserItem: VFC<Props> = memo(
  ({ user, delete_users_by_pk, setEditedUser }) => {
    return (
      <div className="my-1">
        <span className="mr-2">{user.name}</span>
        <span className="mr-2">{user.created_at}</span>
        <button
          className="mr-1 rounded-2xl bg-green-600 py-1 px-3 text-white hover:bg-green-700 focus:outline-none"
          data-testid={`edit-${user.id}`}
          onClick={() => {
            setEditedUser(user)
          }}
        >
          Edit
        </button>

        <button
          className="rounded-2xl bg-pink-600 py-1 px-3 text-white hover:bg-pink-700 focus:outline-none"
          data-testid={`delete-${user.id}`}
          onClick={async () => {
            await delete_users_by_pk({
              variables: {
                id: user.id,
              },
            })
          }}
        >
          Delete
        </button>
      </div>
    )
  }
)
