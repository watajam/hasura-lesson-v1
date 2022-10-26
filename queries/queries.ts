import { gql } from '@apollo/client'

//ユーザー一覧取得
export const GET_USERS = gql`
  query GetUsers {
    #   //hasuraからコピー
    users(order_by: { created_at: desc }) {
      id
      name
      created_at
    }
  }
`

//@clientは最初にサーバーを見にいくのではなくキャッシュからデータを見に行く (キャッシュから状態管理みたいにあつかえる)
export const GET_USERS_LOCAL = gql`
  query GetUsers {
    users(order_by: { created_at: desc }) @client {
      id
      name
      created_at
    }
  }
`
//ユーザーID [id] 個別ページの作成
export const GET_USERIDS = gql`
  query GetUserIds {
    users(order_by: { created_at: desc }) {
      id
    }
  }
`

//ユーザーID [id]を取得して特定のオブジェクトを取得する
export const GET_USERBY_ID = gql`
  query GetUserById($id: uuid!) {
    users_by_pk(id: $id) {
      id
      name
      created_at
    }
  }
`

// !=必須 $=変数
export const CREATE_USER = gql`
  mutation CreateUser($name: String!) {
    insert_users_one(object: { name: $name }) {
      id
      name
      created_at
    }
  }
`
export const DELETE_USER = gql`
  mutation DeleteUser($id: uuid!) {
    delete_users_by_pk(id: $id) {
      id
      name
      created_at
    }
  }
`
//set=変更する場所
export const UPDATE_USER = gql`
  mutation UpdateUser($id: uuid!, $name: String!) {
    update_users_by_pk(pk_columns: { id: $id }, _set: { name: $name }) {
      id
      name
      created_at
    }
  }
`
