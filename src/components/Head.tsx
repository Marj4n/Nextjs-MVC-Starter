import React from "react"
import NextHead from "next/head"
import { useRouter } from "next/router"

export const WEBSITE_HOST_URL = "https://nextjs-typescript-mdx-blog.vercel.app"

const Head = (): JSX.Element => {
  const router = useRouter()

  return (
    <NextHead>
      <title>Next-MVC template</title>
      <meta property="og:url" content={`${WEBSITE_HOST_URL}${router.asPath}`} />
      <link rel="canonical" href={`${WEBSITE_HOST_URL}${router.asPath}`} />
      <meta property="og:site_name" content="Marjannnnnn - Website" />
    </NextHead>
  )
}

export default Head
