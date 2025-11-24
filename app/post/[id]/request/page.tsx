"use client"

import { use } from "react"
import RequestManagement from "../RequestManagement"

interface PageProps {
  params: Promise<{ id: string }>
}

export default function Page({ params }: PageProps) {
  const { id } = use(params)
  return <RequestManagement postId={id} />
}
