"use client"

import { use } from "react"
import PostDetail from "./PostDetail"

interface PageProps {
  params: Promise<{ id: string }>
}

export default function Page({ params }: PageProps) {
  const { id } = use(params)
  return <PostDetail postId={id} />
}
