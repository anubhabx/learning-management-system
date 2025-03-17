"use client";

import CourseCard from "@/components/shared/CourseCard";
import Header from "@/components/shared/Header";
import Loading from "@/components/shared/Loading";
import Toolbar from "@/components/shared/Toolbar";
import { useGetUserEnrolledCoursesQuery } from "@/state/api";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

const Courses = () => {
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const {
    data: courses,
    isLoading,
    isError,
  } = useGetUserEnrolledCoursesQuery(user?.id ?? "", {
    skip: !isLoaded || !user,
  });

  const filteredCourses = useMemo(() => {
    if (!courses) return [];

    return courses.filter((course: Course) => {
      const matchesSearch = course.courseTitle
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || course.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [courses, searchTerm, selectedCategory]);

  const handleGoToCourse = (course: Course) => {
    if (
      course.sections &&
      course.sections.length > 0 &&
      course.sections[0].chapters.length > 0
    ) {
      const firstChapter = course.sections[0].chapters[0];
      router.push(
        `/user/courses/${course._id}/chapters/${firstChapter._id}`,
        {
          scroll: false,
        }
      );
    } else {
      router.push(`/user/courses/${course._id}`, {
        scroll: false,
      });
    }
  };

  if (!isLoaded || isLoading) return <Loading />;
  if (!user) return <div>Please sign in to view your courses.</div>;
  if (isError || !courses || courses.length === 0)
    return <div>You are not enrolled in any courses yet.</div>;

  return (
    <div className="user-courses">
      <Header title="My Courses" subtitle="View your enrolled courses" />
      <Toolbar
        onSearch={setSearchTerm}
        onCategoryChange={setSelectedCategory}
      />
      <div className="user-courses__grid">
        {filteredCourses.map((course: Course) => (
          <CourseCard
            key={course._id}
            course={course}
            onGoToCourse={handleGoToCourse}
          />
        ))}
      </div>
    </div>
  );
};

export default Courses;
