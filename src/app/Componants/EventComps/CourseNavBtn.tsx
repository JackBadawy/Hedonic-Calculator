const CourseNavBtn: React.FC<{ content: string; onClick: () => void }> = ({
  content,
  onClick,
}) => {
  const triangleCoOrds =
    content === "left" ? "10,10 10,0 0,5" : "10,5 0,0 0,10";
  return (
    <button
      onClick={onClick}
      className="flex justify-center items-center transition-colors bg-hpal-500 fill-hpal-200 p-2 py-3 rounded-xl hover:fill-hpal-100 hover:bg-hpal-300"
    >
      <svg height="10" width="10" xmlns="http://www.w3.org/2000/svg">
        <polygon points={triangleCoOrds} />
      </svg>
    </button>
  );
};

export default CourseNavBtn;
