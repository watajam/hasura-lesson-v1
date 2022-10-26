/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

const documents = {
    "\n  query GetUsers {\n    #   //hasuraからコピー\n    users(order_by: { created_at: desc }) {\n      id\n      name\n      created_at\n    }\n  }\n": types.GetUsersDocument,
    "\n  query GetUserIds {\n    users(order_by: { created_at: desc }) {\n      id\n    }\n  }\n": types.GetUserIdsDocument,
    "\n  query GetUserById($id: uuid!) {\n    users_by_pk(id: $id) {\n      id\n      name\n      created_at\n    }\n  }\n": types.GetUserByIdDocument,
    "\n  mutation CreateUser($name: String!) {\n    insert_users_one(object: { name: $name }) {\n      id\n      name\n      created_at\n    }\n  }\n": types.CreateUserDocument,
    "\n  mutation DeleteUser($id: uuid!) {\n    delete_users_by_pk(id: $id) {\n      id\n      name\n      created_at\n    }\n  }\n": types.DeleteUserDocument,
    "\n  mutation UpdateUser($id: uuid!, $name: String!) {\n    update_users_by_pk(pk_columns: { id: $id }, _set: { name: $name }) {\n      id\n      name\n      created_at\n    }\n  }\n": types.UpdateUserDocument,
};

export function graphql(source: "\n  query GetUsers {\n    #   //hasuraからコピー\n    users(order_by: { created_at: desc }) {\n      id\n      name\n      created_at\n    }\n  }\n"): (typeof documents)["\n  query GetUsers {\n    #   //hasuraからコピー\n    users(order_by: { created_at: desc }) {\n      id\n      name\n      created_at\n    }\n  }\n"];
export function graphql(source: "\n  query GetUserIds {\n    users(order_by: { created_at: desc }) {\n      id\n    }\n  }\n"): (typeof documents)["\n  query GetUserIds {\n    users(order_by: { created_at: desc }) {\n      id\n    }\n  }\n"];
export function graphql(source: "\n  query GetUserById($id: uuid!) {\n    users_by_pk(id: $id) {\n      id\n      name\n      created_at\n    }\n  }\n"): (typeof documents)["\n  query GetUserById($id: uuid!) {\n    users_by_pk(id: $id) {\n      id\n      name\n      created_at\n    }\n  }\n"];
export function graphql(source: "\n  mutation CreateUser($name: String!) {\n    insert_users_one(object: { name: $name }) {\n      id\n      name\n      created_at\n    }\n  }\n"): (typeof documents)["\n  mutation CreateUser($name: String!) {\n    insert_users_one(object: { name: $name }) {\n      id\n      name\n      created_at\n    }\n  }\n"];
export function graphql(source: "\n  mutation DeleteUser($id: uuid!) {\n    delete_users_by_pk(id: $id) {\n      id\n      name\n      created_at\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteUser($id: uuid!) {\n    delete_users_by_pk(id: $id) {\n      id\n      name\n      created_at\n    }\n  }\n"];
export function graphql(source: "\n  mutation UpdateUser($id: uuid!, $name: String!) {\n    update_users_by_pk(pk_columns: { id: $id }, _set: { name: $name }) {\n      id\n      name\n      created_at\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateUser($id: uuid!, $name: String!) {\n    update_users_by_pk(pk_columns: { id: $id }, _set: { name: $name }) {\n      id\n      name\n      created_at\n    }\n  }\n"];

export function graphql(source: string): unknown;
export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;