"use client"

import { useLazyQuery } from "@apollo/client/react"
import { GET_ALL_USERS } from "../graphql"

interface User {
  id: string
  name: string
  email: string
  bio?: string
  skills?: string[]
  hobbies?: string[]
  languages?: string[]
}

interface GetAllUsersData {
  getAllUsers: User[]
}

export default function LogUsersButton() {
  const [getAllUsers, { data, loading, error }] =
    useLazyQuery<GetAllUsersData>(GET_ALL_USERS)

  const handleClick = async () => {
    try {
      const result = await getAllUsers()
      console.log(result.data?.getAllUsers ?? [])
    } catch (err) {
      console.error(err)
      if (err) {
        console.error("Apollo Error:")
      }
    }
  }

  return (
    <div>
      <button onClick={handleClick}>Log All Users</button>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
    </div>
  )
}
