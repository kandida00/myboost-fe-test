import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { BlogProvider } from "@/context/BlogContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <BlogProvider>
      <Component {...pageProps} />
    </BlogProvider>
  );
}
