import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import AccordionSections from "./AccordionSections";

const CoursePreview = ({ course }: CoursePreviewProps) => {
  const price = formatPrice(course.price);

  return (
    <div className="course-preview">
      <div className="course-preview__container">
        <div className="course-preview__image-container">
          <Image
            src={`${course.courseImage}` || "/placeholder.png"}
            alt={course.courseTitle}
            width={640}
            height={300}
            className="w-full rounded-sm"
          />
        </div>

        <div>
          <h2 className="course-preview__title">{course.courseTitle}</h2>
          <p className="text-gray-400 text-md mb-4">{course.teacherName}</p>
          <p className="text-sm text-customgreys-dirtyGrey">
            {course.courseDescription}
          </p>
        </div>

        <div>
          <h4 className="text-white-50/90 font-semibold mb-2">
            Course Content
          </h4>
          <AccordionSections sections={course.sections} />
        </div>
      </div>

      <div className="course-preview__container">
        <h3 className="text-xl mb-4">Price</h3>
        <div className="flex justify-between mb-4 text-customgreys-dirtyGrey text-base">
          <span className="font-bold">{course.courseTitle}</span>
          <span className="font-bold">{price}</span>
        </div>
        <div className="flex justify-between border-t border-customgreys-dirtyGrey pt-4">
          <span className="font-bold">Total Amount</span>
          <span className="font-bold">{price}</span>
        </div>
      </div>
    </div>
  );
};

export default CoursePreview;
