import AuthWrapper from "./AuthWrapper";
import { Suspense } from "react";
import LoadingFallback from "./LoadingFallback";

export default function Home() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <AuthWrapper />
    </Suspense>
  );
}
