import { gql } from "@apollo/client"

export const GET_ME = gql`
  query GetMe {
    getMe {
      id
      name
      email
      bio
      skills
      hobbies
      languages
      createdAt
      updatedAt
    }
  }
`

export const GET_ALL_USERS = gql`
  query GetAllUsers {
    getAllUsers {
      id
      name
      email
      bio
      skills
      hobbies
      languages
    }
  }
`

export const GET_ALL_POSTS = gql`
  query GetAllPosts {
    getAllPosts {
      id
      title
      description
      createdBy {
        id
        name
      }
      applicants {
        id
        name
      }
      createdAt
    }
  }
`
