"use client"

import { use } from "react"
import RequestManagement from "./RequestManagement"

interface PageProps {
  params: Promise<{ postId: string }>
}

export default function Page({ params }: PageProps) {
  const { postId } = use(params)
  return <RequestManagement postId={postId} />
}
