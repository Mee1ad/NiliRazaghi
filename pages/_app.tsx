import Layout from "@/components/layout";
import { Analytics } from "@vercel/analytics/react"

export default function MyApp({ Component, pageProps }:any) {
    return (
        <Layout>
            <Analytics />
            <Component {...pageProps} />
        </Layout>
    )
}