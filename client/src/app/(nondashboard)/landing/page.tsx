/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useCarousel } from "@/hooks/useCarousel";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetCoursesQuery } from "@/state/api";
import CourseCardSearch from "@/components/shared/CourseCardSearch";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

const LoadingSkeleton = () => {
  return (
    <div className="landing-skeleton">
      <div className="landing-skeleton__hero">
        <div className="landing-skeleton__hero-content">
          <Skeleton className="landing-skeleton__title"></Skeleton>
          <Skeleton className="landing-skeleton__subtitle"></Skeleton>
          <Skeleton className="landing-skeleton__subtitle-secondary"></Skeleton>
          <Skeleton className="landing-skeleton__button"></Skeleton>
        </div>
        <Skeleton className="landing-skeleton__hero-image" />
      </div>

      <div className="landing-skeleton__featured">
        <Skeleton className="landing-skeleton__featured-title" />
        <Skeleton className="landing-skeleton__featured-description" />

        <div className="landing-skeleton__tags">
          {[...Array(6)].map((_, index) => (
            <Skeleton key={index} className="landing-skeleton__tag" />
          ))}
        </div>
      </div>
    </div>
  );
};

const Landing = () => {
  const { user } = useUser();
  const router = useRouter();
  const currentImage = useCarousel({ totalImages: 3 });
  const { data: courses, isLoading, isError } = useGetCoursesQuery({});

  const handleCourseClick = (courseId: string) => {
    router.push(`/search?id=${courseId}`, {
      scroll: false,
    });
  };

  // //   console.log("Courses", courses);
  // //   console.log("User", user);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="landing"
    >
      <motion.div
        className="landing__hero"
        initial={{
          y: 20,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.5,
        }}
      >
        <div className="landing__hero-content">
          <h1 className="landing__title">Empower Your Learning Journey</h1>
          <p className="landing__description">
            Discover a world of knowledge with our curated courses. Learn, grow,
            and achieve your goals—one step at a time.
          </p>

          <div className="landing__cta">
            <Link scroll={false} href="/search">
              <Button className="landing__cta-button">
                Search for courses
              </Button>
            </Link>
          </div>
        </div>

        <div className="landing__hero-images">
          {["/hero1.jpg", "/hero2.jpg", "/hero3.jpg"].map((image, index) => (
            <Image
              key={index}
              src={image}
              alt="hero image"
              fill
              className={`landing__hero-image ${index === currentImage ? "landing__hero-image--active" : ""}`}
              priority={currentImage === index}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px), 50vw, 33vw"
            />
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ amount: 0.3, once: true }}
        className="landing__featured"
      >
        <h2 className="landing__featured-title">Explore Our Courses</h2>
        <p className="landing__featured-description">
          Find the perfect course to match your learning goals. From programming
          to design, we have something for everyone.
        </p>

        <div className="landing__tags">
          {[
            "Web Development",
            "Mobile Development",
            "Data Science",
            "Machine Learning",
            "Artificial Intelligence",
            "UI/UX Design",
          ].map((tag, index) => (
            <span key={index} className="landing__tag">
              {tag}
            </span>
          ))}
        </div>

        <div className="landing__courses">
          {courses &&
            courses.slice(0, 4).map((course, index) => (
              <motion.div
                key={course._id}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ amount: 0.4, once: true }}
              >
                <CourseCardSearch
                  course={course}
                  onClick={() => handleCourseClick(course._id)}
                />
              </motion.div>
            ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Landing;
