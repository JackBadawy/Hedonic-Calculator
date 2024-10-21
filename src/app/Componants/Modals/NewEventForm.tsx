import { useState } from "react";
import { useModal } from "@/app/Contexts/ModalContext";
import { HEvent, HCourseOfAction } from "@/app/Types/hedon";
import { calculateUtility } from "@/app/Utilities/UtilityFuncs";

interface NewEventFormProps {
  onSubmit: (event: HEvent) => Promise<void>;
}

const NewEventForm: React.FC<NewEventFormProps> = ({ onSubmit }) => {
  const [eventDescription, setEventDescription] = useState("");
  const [coursesOfAction, setCoursesOfAction] = useState<HCourseOfAction[]>([]);
  const { closeModal } = useModal();

  const handleAddCourse = () => {
    const newCourse: HCourseOfAction = {
      description: "",
      intensity: 5,
      duration: 5,
      certainty: 5,
      propinquity: 5,
      fecundity: 5,
      purity: 5,
      extent: 5,
      isPublic: false,
    };
    setCoursesOfAction([...coursesOfAction, newCourse]);
  };

  const handleCourseChange = (
    index: number,
    field: keyof HCourseOfAction,
    value: string | number | boolean
  ) => {
    const updatedCourses = [...coursesOfAction];
    updatedCourses[index] = {
      ...updatedCourses[index],
      [field]:
        field === "description"
          ? value
          : typeof value === "string"
          ? parseInt(value, 10) || 0
          : value,
    };
    setCoursesOfAction(updatedCourses);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (eventDescription.trim() && coursesOfAction.length > 0) {
      const newEvent: HEvent = {
        description: eventDescription.trim(),
        coursesOfAction: coursesOfAction,
      };
      await onSubmit(newEvent);
      closeModal();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-gray-700">
      <div>
        <label
          htmlFor="eventDescription"
          className="block text-sm font-medium text-gray-700"
        >
          Event Description
        </label>
        <input
          type="text"
          id="eventDescription"
          value={eventDescription}
          onChange={(e) => setEventDescription(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-violet-900"
          required
        />
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-700 flex">
          Courses of Action
        </h3>
        {coursesOfAction.map((course, index) => (
          <div key={index} className="mt-2 p-2 bg-gray-100 rounded flex">
            <input
              type="text"
              value={course.description}
              onChange={(e) =>
                handleCourseChange(index, "description", e.target.value)
              }
              className="w-full mb-2"
              placeholder="Course description"
            />
            {[
              "intensity",
              "duration",
              "certainty",
              "propinquity",
              "fecundity",
              "purity",
              "extent",
            ].map((factor) => (
              <div key={factor} className="mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  {factor.charAt(0).toUpperCase() + factor.slice(1)}
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={course[factor as keyof HCourseOfAction] as number}
                  onChange={(e) =>
                    handleCourseChange(
                      index,
                      factor as keyof HCourseOfAction,
                      e.target.value
                    )
                  }
                  className="w-full"
                />
                <span>{course[factor as keyof HCourseOfAction]}</span>
              </div>
            ))}
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={course.isPublic}
                onChange={(e) =>
                  handleCourseChange(index, "isPublic", e.target.checked)
                }
                className="mr-2"
              />
              Is Public
            </label>
            <p className="mt-2">
              Total Calculation: {calculateUtility(course)}
            </p>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddCourse}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Add Course of Action
        </button>
      </div>
      <div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-violet-600 text-white rounded-md hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-opacity-50"
          disabled={coursesOfAction.length === 0}
        >
          Add Event
        </button>
      </div>
    </form>
  );
};

export default NewEventForm;
