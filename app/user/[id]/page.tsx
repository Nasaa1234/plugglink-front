import { use } from "react"
import UserProfile from "./UserProfile"

interface PageProps {
  params: Promise<{ id: string }>
}

export default function Page({ params }: PageProps) {
  const { id } = use(params)
  return <UserProfile userId={id} />
}
