import { VFC, useState, FormEvent } from 'react'
import { useQuery, useMutation } from '@apollo/client'

import { Layout } from '../components/Layout'
import { UserItem } from '../components/UserItem'
import {
  GetUsersQuery,
  CreateUserMutation,
  DeleteUserMutation,
  UpdateUserMutation,
} from '../types/generated/graphql.tsx/graphql'
import {
  GET_USERS,
  CREATE_USER,
  DELETE_USER,
  UPDATE_USER,
} from '../queries/queries'

const HasuraCRUD: VFC = () => {
  const [editedUser, setEditedUser] = useState({ id: '', name: '' })

  //ユーザーの取得
  const { data, error } = useQuery<GetUsersQuery>(GET_USERS, {
    fetchPolicy: 'cache-and-network',
  })

  //更新
  const [update_users_by_pk] = useMutation<UpdateUserMutation>(UPDATE_USER)

  //アカウント作成
  //CreateとDeleteの場合は処理が終わった後キャッシュが更新されないので自分で記載（updata）
  const [insert_users_one] = useMutation<CreateUserMutation>(CREATE_USER, {
    // insert_users_oneには作成したデータが格納されている
    update(cache, { data: { insert_users_one } }) {
      //作成したキャッシュのIDを取得（cacheId=type_nemeとidを組み合わせたもも）
      const cacheId = cache.identify(insert_users_one)
      cache.modify({
        fields: {
          //更新したいフィールド existingUsers=既存のキャッシュデータの配列
          users(existingUsers, { toReference }) {
            //toReference(cacheId)＝IDひもずいた、insert_users_oneのデータを取得できる
            //既存のキャッシュデータの配列に作成したinsert_users_oneのデータを先頭追加
            return [toReference(cacheId), ...existingUsers]
          },
        },
      })
    },
  })

  //削除
  const [delete_users_by_pk] = useMutation<DeleteUserMutation>(DELETE_USER, {
    update(cache, { data: { delete_users_by_pk } }) {
      cache.modify({
        fields: {
          // readField＝任意のフィールドの値を読むことができる
          users(existingUsers, { readField }) {
            return existingUsers.filter(
              //delete_users_by_pk.id=削除したIDとreadField('id', user)をIDで比較して一致しないユーザーは残す
              //一致した物だけ省かれキャッシュが更新される
              (user) => delete_users_by_pk.id !== readField('id', user)
            )
          },
        },
      })
    },
  })

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    //editedUser.idにIDがある時は編集モード
    if (editedUser.id) {
      try {
        await update_users_by_pk({
          variables: {
            id: editedUser.id,
            name: editedUser.name,
          },
        })
      } catch (err) {
        alert(err.message)
      }
      setEditedUser({ id: '', name: '' })
    } else {
      //editedUser.idにIDがない時は新規作成モード
      try {
        await insert_users_one({
          variables: {
            name: editedUser.name,
          },
        })
      } catch (err) {
        alert(err.message)
      }
      setEditedUser({ id: '', name: '' })
    }
  }

  //ユーザーの取得に失敗した場合
  if (error) return <Layout title="Hasura CRUD">Error: {error.message}</Layout>
  return (
    <Layout title="Hasura CRUD">
      <p className="mb-3 font-bold">Hasura CRUD</p>
      <form
        className="flex flex-col items-center justify-center"
        onSubmit={handleSubmit}
      >
        <input
          className="border border-gray-300 px-3 py-2"
          placeholder="New user ?"
          type="text"
          value={editedUser.name}
          onChange={(e) =>
            setEditedUser({ ...editedUser, name: e.target.value })
          }
        />
        <button
          disabled={!editedUser.name}
          className="my-3 rounded-2xl bg-indigo-600 py-1 px-3 text-white hover:bg-indigo-700 focus:outline-none disabled:opacity-40"
          data-testid="new"
          type="submit"
        >
          {editedUser.id ? 'Update' : 'Create'}
        </button>
      </form>

      {data?.users.map((user) => {
        return (
          <UserItem
            key={user.id}
            user={user}
            setEditedUser={setEditedUser}
            delete_users_by_pk={delete_users_by_pk}
          />
        )
      })}
    </Layout>
  )
}
export default HasuraCRUD
