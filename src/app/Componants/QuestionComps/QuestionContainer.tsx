interface QuestionContainerProps {
  dimensions: { height: string; width: string };
  isTransitioning: boolean;
  children: React.ReactNode;
  contentRef: React.RefObject<HTMLDivElement>;
}

const QuestionContainer = ({
  dimensions,
  isTransitioning,
  children,
  contentRef,
}: QuestionContainerProps) => {
  return (
    <div
      style={{
        height: dimensions.height,
        width: dimensions.width,
        minWidth: "320px",
        maxWidth: "100%",
      }}
      className="overflow-hidden transition-[height,width] duration-200 ease-in-out mx-auto"
    >
      <div
        ref={contentRef}
        className={`transform transition-opacity duration-200 ease-in-out ${
          isTransitioning ? "opacity-0" : "opacity-100"
        }`}
      >
        {children}
      </div>
    </div>
  );
};
export default QuestionContainer;
