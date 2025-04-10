"use client";

import Loading from "@/components/shared/Loading";
import { useGetCoursesQuery } from "@/state/api";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CourseCardSearch from "@/components/shared/CourseCardSearch";
import SelectedCourse from "./SelectedCourse";

const Search = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { data: courses, isLoading, isError } = useGetCoursesQuery({});
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const router = useRouter();

  const publishedCourses =
    courses?.filter((course) => course.status === "Published") || courses;

  useEffect(() => {
    if (courses) {
      if (id) {
        const course = courses.find((course) => course._id === id);
        setSelectedCourse(course || courses[0]);
      } else {
        setSelectedCourse(courses[0]);
      }
    }
  }, [courses, id]);

  if (isLoading) {
    return <Loading />;
  }
  if (isError || !courses) return <div>Failed to fetch courses.</div>;

  const handleCourseClick = (course: Course) => {
    setSelectedCourse(course);
    router.push(`/search?id=${course._id}`, {
      scroll: false,
    });
  };

  const handleEnrollNow = (courseId: string) => {
    router.push(`/checkout?step=1&id=${courseId}&showSignUp=false`, {
      scroll: false,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="search"
    >
      <h1 className="search__title">List of available courses</h1>
      <h2 className="search__subtitle">{courses.length} courses available</h2>
      <div className="search__content">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="search__courses-grid"
        >
          {publishedCourses?.map((course) => (
            <CourseCardSearch
              key={course._id}
              isSelected={selectedCourse?._id === course._id}
              course={course}
              onClick={() => handleCourseClick(course)}
            />
          ))}
        </motion.div>

        {selectedCourse && (
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="search__selected-course"
          >
            <SelectedCourse
              course={selectedCourse}
              handleEnrollNow={handleEnrollNow}
            />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Search;
