import { HCourseOfAction } from "@/app/Types/hedon";

interface TTableProps {
  course: HCourseOfAction;
}

const TTable: React.FC<TTableProps> = ({ course }) => {
  const interpretValue = (field: string, value: number) => {
    if (value === 6) return null;

    const interpretations: Record<
      string,
      { veryHigh: string; high: string; low: string; veryLow: string }
    > = {
      intensity: {
        veryHigh: "Will bring exceptional pleasure",
        high: "Will bring significant pleasure",
        low: "Will cause discomfort",
        veryLow: "Will cause severe pain",
      },
      duration: {
        veryHigh: "Benefits will be long-lasting",
        high: "Benefits will last a while",
        low: "Negative effects will linger",
        veryLow: "Negative effects will persist long-term",
      },
      certainty: {
        veryHigh: "Almost guaranteed to succeed",
        high: "Likely to succeed",
        low: "Risk of failure",
        veryLow: "High risk of failure",
      },
      propinquity: {
        veryHigh: "Immediate positive results",
        high: "Quick positive results",
        low: "Delayed benefits",
        veryLow: "Very delayed or uncertain benefits",
      },
      fecundity: {
        veryHigh: "Will create many future opportunities",
        high: "Will lead to more positive outcomes",
        low: "May lead to negative outcomes",
        veryLow: "Will likely cause chain of problems",
      },
      purity: {
        veryHigh: "No negative side effects",
        high: "Minimal drawbacks",
        low: "Has significant drawbacks",
        veryLow: "Severe negative side effects",
      },
      extent: {
        veryHigh: "Benefits a large community",
        high: "Benefits several people",
        low: "Negatively affects several people",
        veryLow: "Widespread negative impact",
      },
    };

    const interpretation = interpretations[field];
    switch (value) {
      case 2:
        return interpretation.veryHigh;
      case 1:
        return interpretation.high;
      case -1:
        return interpretation.low;
      case -2:
        return interpretation.veryLow;
      default:
        return null;
    }
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

  const pleasureEffects = effects.filter((effect) => effect.value > 0);
  const painEffects = effects.filter((effect) => effect.value < 0);

  const getEffectClasses = (value: number) => {
    const baseClasses = "text-xs";
    switch (value) {
      case 2:
        return `${baseClasses} text-green-300 font-bold`;
      case 1:
        return `${baseClasses} text-green-500`;
      case -1:
        return `${baseClasses} text-red-500`;
      case -2:
        return `${baseClasses} text-red-300 font-bold`;
      default:
        return "text-xs";
    }
  };

  return (
    <div className="h-[168px]  grid grid-cols-2 gap-1 border-t border-hpal-400 mt-4">
      <div className="border-r border-hpal-400 pr-4  ">
        <h4 className="text-lg font-semibold mb-1 text-green-400 text-center">
          Pleasure
        </h4>
        <ul className="space-y-1 flex flex-col justify-between">
          {pleasureEffects.map((effect, index) => (
            <li key={index} className={getEffectClasses(effect.value)}>
              • {effect.interpretation}
            </li>
          ))}
        </ul>
      </div>
      <div className="pl-1 ">
        <h4 className="text-lg font-semibold mb-1 text-red-400 text-center">
          Pain
        </h4>
        <ul className="space-y-1">
          {painEffects.map((effect, index) => (
            <li key={index} className={getEffectClasses(effect.value)}>
              • {effect.interpretation}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TTable;
