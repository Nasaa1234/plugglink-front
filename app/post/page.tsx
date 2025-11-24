"use client"

import { useState, ChangeEvent } from "react"
import { CREATE_POST, GET_ALL_POSTS } from "../graphql"
import { useMutation, useQuery } from "@apollo/client/react"

interface PostForm {
  title: string
  description: string
  roles: string[]
}

interface User {
  id: string
  name: string
}

interface Post {
  id: string
  title: string
  description: string
  createdBy: User
  applicants: User[]
  createdAt: string
}

interface GetAllPostsData {
  getAllPosts: Post[]
}

interface CreatePostData {
  createPost: Post
}

interface CreatePostVars {
  input: PostForm
}

export default function CreatePost() {
  const {
    data,
    loading: queryLoading,
    error: queryError,
  } = useQuery<GetAllPostsData>(GET_ALL_POSTS)

  const [form, setForm] = useState<PostForm>({
    title: "",
    description: "",
    roles: [],
  })

  const [createPost, { loading: mutationLoading, error: mutationError }] =
    useMutation<CreatePostData, CreatePostVars>(CREATE_POST, {
      refetchQueries: [{ query: GET_ALL_POSTS }],
    })

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async () => {
    try {
      await createPost({ variables: { input: form } })
      alert("Post created!")
      setForm({ title: "", description: "", roles: [] })
    } catch (err: any) {
      const message = err?.message || ""

      if (message.includes("Not authenticated")) {
        alert("Please login first!")
        return
      }

      alert("Failed to create post")
      console.error(err)
    }
  }

  if (queryLoading) return <p>Loading posts...</p>
  if (queryError) return <p>Error: {queryError.message}</p>

  return (
    <div
      style={{
        padding: "1rem",
        border: "1px solid #ccc",
        borderRadius: "8px",
        marginBottom: "2rem",
      }}
    >
      <h2 className="text-red">Create a Post</h2>
      <input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        style={{ display: "block", marginBottom: "0.5rem", width: "100%" }}
      />
      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        style={{
          display: "block",
          marginBottom: "0.5rem",
          width: "100%",
          height: "80px",
        }}
      />
      <input
        name="roles"
        placeholder="Roles (comma separated)"
        onChange={(e) =>
          setForm({
            ...form,
            roles: e.target.value.split(",").map((r) => r.trim()),
          })
        }
      />
      <button onClick={handleSubmit} disabled={mutationLoading}>
        {mutationLoading ? "Creating..." : "Create Post"}
      </button>
      {mutationError &&
        !mutationError.message.includes("Not authenticated") && (
          <p style={{ color: "red" }}>Something went wrong</p>
        )}

      <div>
        <h2>All Posts</h2>
        {data &&
          data?.getAllPosts?.map((post) => (
            <div
              key={post.id}
              style={{
                border: "1px solid #ccc",
                padding: "1rem",
                marginBottom: "1rem",
              }}
            >
              <h3>{post.title}</h3>
              <p>{post.description}</p>
              <p>
                Created by: <b>{post.createdBy.name}</b>
              </p>
              <p>
                Applicants:{" "}
                {post.applicants.map((a) => a.name).join(", ") || "None"}
              </p>
              <p>Created at: {new Date(post.createdAt).toLocaleString()}</p>
            </div>
          ))}
      </div>
    </div>
  )
}
