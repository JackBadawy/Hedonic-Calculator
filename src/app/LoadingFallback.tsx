const LoadingFallback = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-hpal-200">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-hpal-500"></div>
    </div>
  );
};

export default LoadingFallback;
