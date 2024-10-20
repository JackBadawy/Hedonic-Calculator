const LoadingFallback = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-violet-100">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-violet-900"></div>
    </div>
  );
};

export default LoadingFallback;
