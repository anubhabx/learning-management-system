"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface ErrorPageProps {
  statusCode?: number;
  title?: string;
  description?: string;
  showBackButton?: boolean;
  showHomeButton?: boolean;
}

const ErrorPage = ({
  statusCode = 404,
  title = "Page not found",
  description = "Sorry, we couldn't find the page you're looking for.",
  showBackButton = true,
  showHomeButton = true,
}: ErrorPageProps) => {
  const router = useRouter();

  return (
    <div className="error-page">
      <div className="error-page__container">
        <motion.div
          className="error-page__content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="error-page__status">{statusCode}</div>
          <h1 className="error-page__title">{title}</h1>
          <p className="error-page__description">{description}</p>

          <div className="error-page__illustration">
            {/* SVG illustration */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 500 500"
              fill="none"
              className="error-page__svg"
            >
              <circle
                cx="250"
                cy="250"
                r="200"
                stroke="currentColor"
                strokeWidth="5"
                strokeDasharray="15 10"
              />
              <path
                d="M250 150V250L300 300"
                stroke="currentColor"
                strokeWidth="10"
                strokeLinecap="round"
              />
              <circle
                cx="250"
                cy="250"
                r="210"
                stroke="currentColor"
                strokeWidth="2"
                opacity="0.3"
              />
              <circle
                cx="250"
                cy="250"
                r="180"
                stroke="currentColor"
                strokeWidth="2"
                opacity="0.4"
              />
              <circle cx="250" cy="250" r="10" fill="currentColor" />
            </svg>
          </div>

          <div className="error-page__actions">
            {showBackButton && (
              <Button
                onClick={() => router.back()}
                variant="outline"
                className="error-page__button error-page__button--back"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go Back
              </Button>
            )}

            {showHomeButton && (
              <Button
                asChild
                className="error-page__button error-page__button--home"
              >
                <Link href="/" scroll={false}>
                  <Home className="mr-2 h-4 w-4" />
                  Go Home
                </Link>
              </Button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ErrorPage;
