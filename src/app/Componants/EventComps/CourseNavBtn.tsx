const CourseNavBtn: React.FC<{ content: string; onClick: () => void }> = ({
  content,
  onClick,
}) => {
  return (
    <button onClick={onClick} className="bg-hpal-500">
      {content}
    </button>
  );
};

export default CourseNavBtn;
