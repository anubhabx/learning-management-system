"use client";

import Header from "@/components/shared/Header";
import Loading from "@/components/shared/Loading";
import TeacherCourseCard from "@/components/shared/TeacherCourseCard";
import Toolbar from "@/components/shared/Toolbar";
import { Button } from "@/components/ui/button";
import {
  useCreateCourseMutation,
  useDeleteCourseMutation,
  useGetCoursesQuery,
} from "@/state/api";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";

const Courses = () => {
  const router = useRouter();
  const { user } = useUser();
  const {
    data: courses,
    isLoading,
    isError,
  } = useGetCoursesQuery({ category: "all" });

  const [createCourse, { isLoading: isCreating }] = useCreateCourseMutation();
  const [deleteCourse] = useDeleteCourseMutation();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredCourses = useMemo(() => {
    if (!courses) return [];

    return courses.filter((course) => {
      const searchTermMatches = course.courseTitle
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const categoryMatches =
        selectedCategory === "all" || course.category === selectedCategory;

      return searchTermMatches && categoryMatches;
    });
  }, [courses, searchTerm, selectedCategory]);

  const handleEdit = (course: Course) => {
    router.push(`/teacher/courses/${course._id}`, {
      scroll: false,
    });
  };

  const handleDelete = async (course: Course) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      await deleteCourse(course._id).unwrap();
    }
  };

  const handleCreate = async () => {
    if (!user) return;

    const result = await createCourse({
      teacherId: user.id,
      teacherName: user.fullName || "Unknown Teacher",
    }).unwrap();
    router.push(`/teacher/courses/${result._id}`, {
      scroll: false,
    });
  };

  if (isLoading) return <Loading />;
  if (isError) return <div>Error fetching courses</div>;
  if (!courses) return <div>No courses found</div>;

  return (
    <div className="teacher-courses">
      <Header
        title="Courses"
        subtitle="Manage your courses"
        rightElement={
          <Button
            onClick={handleCreate}
            disabled={isCreating}
            className="teacher-courses__header"
          >
            Create Course
          </Button>
        }
      />
      <Toolbar
        onSearch={setSearchTerm}
        onCategoryChange={setSelectedCategory}
      />

      <div className="teacher-courses__grid">
        {filteredCourses.map((course) => (
          <TeacherCourseCard
            key={course._id}
            course={course}
            onEdit={handleEdit}
            onDelete={handleDelete}
            isOwner={course.teacherId === user?.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Courses;
