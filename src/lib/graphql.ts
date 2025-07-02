import { gql } from '@apollo/client'

// User queries
export const GET_USER_PROFILE = gql`
  query GetUserProfile($userId: uuid!) {
    users_by_pk(id: $userId) {
      id
      email
      displayName
      avatarUrl
      createdAt
      metadata
    }
  }
`

export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      email
      displayName
      avatarUrl
      createdAt
      lastSeen
    }
  }
`

// Course/Lesson queries
export const GET_USER_PROGRESS = gql`
  query GetUserProgress($userId: uuid!) {
    userProgress: user_progress(where: {userId: {_eq: $userId}}) {
      id
      userId
      lessonId
      moduleId
      completed
      completedAt
      progress
    }
  }
`

export const GET_ASSIGNMENTS = gql`
  query GetAssignments($userId: uuid!) {
    assignments(where: {userId: {_eq: $userId}}) {
      id
      title
      description
      dueDate
      status
      moduleId
      lessonId
      submittedAt
      feedback
    }
  }
`

// Submission mutations
export const CREATE_SUBMISSION = gql`
  mutation CreateSubmission($input: submissions_insert_input!) {
    insert_submissions_one(object: $input) {
      id
      userId
      assignmentId
      audioUrl
      notes
      status
      submittedAt
    }
  }
`

export const UPDATE_USER_PROGRESS = gql`
  mutation UpdateUserProgress($userId: uuid!, $lessonId: String!, $progress: Int!) {
    insert_user_progress_one(
      object: {
        userId: $userId
        lessonId: $lessonId
        progress: $progress
        completed: true
        completedAt: "now()"
      }
      on_conflict: {
        constraint: user_progress_pkey
        update_columns: [progress, completed, completedAt]
      }
    ) {
      id
      progress
      completed
    }
  }
` 