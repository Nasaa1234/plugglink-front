"use client"
import React, { useEffect } from "react"
import { ApolloProvider } from "@apollo/client/react"
import { apolloClient } from "@/app/graphql"

export const Providers = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    console.log(localStorage.getItem("token")) // safe: runs only in browser
  }, [])

  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
}
