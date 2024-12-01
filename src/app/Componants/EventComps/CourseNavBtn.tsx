const CourseNavBtn: React.FC<{ content: string; onClick: () => void }> = ({
  content,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="transition-colors bg-hpal-500 text-hpal-200 p-1 px-2 rounded-xl hover:text-hpal-100 hover:bg-hpal-300"
    >
      {content}
    </button>
  );
};

export default CourseNavBtn;
