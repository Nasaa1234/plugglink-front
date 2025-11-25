import { gql } from "@apollo/client"

export const SIGNUP = gql`
  mutation Signup($name: String!, $email: String!, $password: String!) {
    signup(name: $name, email: $email, password: $password) {
      token
      user {
        id
        name
        email
      }
    }
  }
`

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        name
        email
      }
    }
  }
`

export const CREATE_POST = gql`
  mutation CreatePost($input: PostInput!) {
    createPost(input: $input) {
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
      likes {
        id
      }
      comments {
        id
      }
      createdAt
    }
  }
`

export const LIKE_POST = gql`
  mutation LikePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
      }
    }
  }
`

export const ADD_COMMENT = gql`
  mutation AddComment($postId: ID!, $content: String!) {
    addComment(postId: $postId, content: $content) {
      id
      content
      author {
        id
        name
      }
      createdAt
    }
  }
`

export const FOLLOW_USER = gql`
  mutation FollowUser($userId: ID!) {
    followUser(userId: $userId) {
      id
      followers {
        id
      }
      following {
        id
      }
    }
  }
`

export const UNFOLLOW_USER = gql`
  mutation UnfollowUser($userId: ID!) {
    unfollowUser(userId: $userId) {
      id
      followers {
        id
      }
      following {
        id
      }
    }
  }
`

export const SAVE_POST = gql`
  mutation SavePost($postId: ID!) {
    savePost(postId: $postId) {
      id
      savedPosts {
        id
      }
    }
  }
`

export const UPDATE_PROFILE = gql`
  mutation UpdateProfile($input: UpdateProfileInput!) {
    updateProfile(input: $input) {
      id
      name
      bio
      skills
      experience {
        company
        role
        startYear
        endYear
      }
      education {
        school
        degree
        year
      }
      languages
      hobbies
      socialLinks
      location
      profileImage
    }
  }
`
