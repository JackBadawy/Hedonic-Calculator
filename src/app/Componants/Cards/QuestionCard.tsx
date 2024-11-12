interface QuestionCardProps {
  question: string;
  type: "text" | "agreement" | "boolean";
  value: any;
  onChange: (value: any) => void;
}

const QuestionCard = ({
  question,
  type,
  value,
  onChange,
}: QuestionCardProps) => {
  const renderInput = () => {
    switch (type) {
      case "text":
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className=" font-bold w-full p-2 border text-hpal-100 rounded-md focus:ring-2 focus:ring-hpal-500 outline-none bg-hpal-500"
            placeholder="Type your answer..."
          />
        );
      case "agreement":
        return (
          <div className="flex flex-col gap-3">
            {[
              "Strongly Agree",
              "Agree",
              "Neutral",
              "Disagree",
              "Strongly Disagree",
            ].map((option, index) => (
              <label
                key={index}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="radio"
                  checked={value === 10 - index * 2}
                  onChange={() => onChange(10 - index * 2)}
                  className="w-4 h-4 text-violet-600"
                />
                <span className="text-sm text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        );
      case "boolean":
        return (
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={value}
                onChange={(e) => onChange(e.target.checked)}
                className="w-4 h-4 rounded text-violet-600"
              />
              <span className="text-sm text-gray-700">Yes</span>
            </label>
          </div>
        );
    }
  };

  return (
    <div className="bg-hpal-100 p-6 rounded-lg shadow-sm border border-violet-100">
      <h3 className="text-lg font-medium text-hpal-500 mb-4">{question}</h3>
      {renderInput()}
    </div>
  );
};
export default QuestionCard;
