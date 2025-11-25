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
      followers {
        id
      }
      following {
        id
      }
      posts {
        id
      }
      savedPosts {
        id
      }
      notifications {
        id
        type
        sender {
          id
          name
        }
        post {
          id
          title
        }
        read
        createdAt
      }
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
      followers {
        id
      }
      following {
        id
      }
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
        profileImage
      }
      applicants {
        id
        name
      }
      likes {
        id
      }
      comments {
        id
        content
        author {
          id
          name
        }
        createdAt
      }
      createdAt
    }
  }
`

export const GET_NOTIFICATIONS = gql`
  query GetNotifications {
    getNotifications {
      id
      type
      sender {
        id
        name
      }
      post {
        id
        title
      }
      read
      createdAt
    }
  }
`
