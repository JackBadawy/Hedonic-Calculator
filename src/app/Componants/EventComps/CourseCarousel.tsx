import { HEvent } from "@/app/Types/hedon";
import TTable from "./TTable";
import CourseNavBtn from "./CourseNavBtn";
import { useState } from "react";

interface CourseCaroselProps {
  event: HEvent;
}

type NavData = { curCourse: number; courseCount: number };

const CourseCarousel: React.FC<CourseCaroselProps> = ({ event }) => {
  const [navData, setNavData] = useState<NavData>({
    curCourse: 1,
    courseCount: event.coursesOfAction.length,
  });

  function onClick(direction: string) {
    switch (direction) {
      case "&#11164;": //l
        setNavData({
          curCourse: iterateCourse("-"),
          courseCount: navData.courseCount,
        });
        break;
      case "&#11166;": //r
        setNavData({
          curCourse: iterateCourse("+"),
          courseCount: navData.courseCount,
        });
        break;
    }
  }

  function iterateCourse(charge: string): number {
    switch (charge) {
      case "-":
        return navData.curCourse !== 1
          ? navData.curCourse - 1
          : navData.courseCount;
      case "+":
        return navData.curCourse < navData.courseCount
          ? navData.curCourse + 1
          : 1;
      default:
        return 1;
    }
  }

  const course = event.coursesOfAction[navData.curCourse - 1];
  const isIdealCourse = event.idealCourse?.id === course.id;

  return (
    <div className="mt-2 flex flex-col flex-wrap gap-2 ">
      <div
        className={`flex flex-row-reverse justify-between gap-2 items-center ${
          navData.courseCount == 1 && "invisible"
        }`}
      >
        <div className="flex justify-end gap-2 items-center">
          <CourseNavBtn
            content="&#11164;"
            onClick={() => onClick("&#11164;")}
          />
          <div className="">
            {navData.curCourse}/{navData.courseCount}
          </div>
          <CourseNavBtn
            content="&#11166;"
            onClick={() => onClick("&#11166;")}
          />
        </div>
        {isIdealCourse && (
          <p className="pl-1 animate-pulse text-yellow-500 visible text-2xl">
            ★
          </p>
        )}
      </div>

      <div className={`w-[508px] mt-0.5 h-72 p-2 bg-hpal-500 rounded`}>
        <p className="font-medium">{course.description}</p>

        <TTable course={course} />
        <div className="px-2 mt-4 border-t border-hpal-400 pt-4 flex justify-between">
          <p className="text-sm font-semibold">
            {course.hedonicValue && Math.abs(course.hedonicValue)}{" "}
            {course.hedonicValue && course.hedonicValue < 0
              ? "Dolors"
              : "Hedons"}
          </p>
          <p className="text-sm">
            {course.isPublic ? "Public " : "Private "}Impact
          </p>
        </div>
      </div>
    </div>
  );
};

export default CourseCarousel;
