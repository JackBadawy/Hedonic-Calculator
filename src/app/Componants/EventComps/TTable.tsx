import { HCourseOfAction } from "@/app/Types/hedon";

interface TTTableProps {
  course: HCourseOfAction;
}

const TTable: React.FC<TTTableProps> = ({ course }) => {
  const interpretValue = (field: string, value: number) => {
    if (value === 6) return null;

    const interpretations: Record<string, { high: string; low: string }> = {
      intensity: {
        high: "Will bring intense pleasure",
        low: "Will incur strong pain",
      },
      duration: {
        high: "Benefits will last a long time",
        low: "Negative effects will persist",
      },
      certainty: {
        high: "Very likely to succeed",
        low: "High risk of failure",
      },
      propinquity: {
        high: "Immediate positive results",
        low: "Delayed or uncertain benefits",
      },
      fecundity: {
        high: "Will lead to more future pleasures",
        low: "May cause chain of negative outcomes",
      },
      purity: {
        high: "Free from negative side effects",
        low: "Has significant drawbacks",
      },
      extent: {
        high: "Benefits many people",
        low: "Negative impact on many",
      },
    };

    const interpretation = interpretations[field];
    return value > 6 ? interpretation.high : interpretation.low;
  };

  const effects = [
    "intensity",
    "duration",
    "certainty",
    "propinquity",
    "fecundity",
    "purity",
    "extent",
  ]
    .map((field) => ({
      field,
      value: course[field as keyof HCourseOfAction] as number,
      interpretation: interpretValue(
        field,
        course[field as keyof HCourseOfAction] as number
      ),
    }))
    .filter((effect) => effect.interpretation !== null);

  const pleasureEffects = effects.filter((effect) => effect.value > 6);
  const painEffects = effects.filter((effect) => effect.value < 6);

  return (
    <div className="grid grid-cols-2 gap-4 border-t border-hpal-300  mt-4">
      <div className="border-r border-hpal-300 pr-4">
        <h4 className="text-lg font-semibold mb-3 text-green-400">Pleasure</h4>
        <ul className="space-y-2">
          {pleasureEffects.map((effect, index) => (
            <li key={index} className="text-sm text-green-500">
              • {effect.interpretation}
            </li>
          ))}
        </ul>
      </div>
      <div className="pl-4">
        <h4 className="text-lg font-semibold mb-3 text-red-400">Pain</h4>
        <ul className="space-y-2">
          {painEffects.map((effect, index) => (
            <li key={index} className="text-sm text-red-500">
              • {effect.interpretation}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TTable;
