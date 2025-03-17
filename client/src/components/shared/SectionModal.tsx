import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { SectionFormData, sectionSchema } from "@/lib/schemas";
import { addSection, closeSectionModal, editSection } from "@/state";
import { useAppDispatch, useAppSelector } from "@/state/redux";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import CustomFormField from "./CustomFormField";
import CustomModal from "./CustomModal";

const SectionModal = () => {
  const dispatch = useAppDispatch();
  const { isSectionModalOpen, selectedSectionIndex, sections } = useAppSelector(
    (state) => state.global.courseEditor
  );

  const section =
    selectedSectionIndex !== null ? sections[selectedSectionIndex] : null;

  // console.log("Modal state:", {
  //   isSectionModalOpen,
  //   selectedSectionIndex,
  //   section,
  // });

  const methods = useForm<SectionFormData>({
    resolver: zodResolver(sectionSchema),
    defaultValues: {
      sectionTitle: "",
      sectionDescription: "",
    },
    mode: "onSubmit",
  });

  useEffect(() => {
    if (section) {
      methods.reset({
        sectionTitle: section.sectionTitle,
        sectionDescription: section.sectionDescription,
      });
    } else {
      methods.reset({
        sectionTitle: "",
        sectionDescription: "",
      });
    }
  }, [section, methods]);

  const onClose = () => {
    dispatch(closeSectionModal());
  };

  // const handleFormSubmit = async (e: React.FormEvent) => {
  //   console.log("Form state on submit attempt:", methods.formState);
  //   console.log("Form errors:", methods.formState.errors);
  // };

  const onSubmit = (data: SectionFormData) => {
    // console.log("Form submission triggered with data:", data);

    try {
      const newSection: Section = {
        // _id: section?._id || `temp-section-${Date.now()}`, // Ensure ID exists
        sectionTitle: data.sectionTitle,
        sectionDescription: data.sectionDescription,
        chapters: section?.chapters || [],
      };

      // console.log("New section object:", newSection);

      if (selectedSectionIndex === null) {
        // console.log("Dispatching addSection");
        dispatch(addSection(newSection));
      } else {
        // console.log(`Dispatching editSection for index ${selectedSectionIndex}`);
        dispatch(
          editSection({
            index: selectedSectionIndex,
            section: newSection,
          })
        );
      }

      toast.success(
        `Section ${selectedSectionIndex === null ? "added" : "updated"} successfully but you need to save the course to apply the changes`
      );
      onClose();
    } catch (error) {
      console.error("Error in section submission:", error);
      toast.error("Failed to save section. Please try again.");
    }
  };

  return (
    <CustomModal isOpen={isSectionModalOpen} onClose={onClose}>
      <div className="section-modal">
        <div className="section-modal__header">
          <h2 className="section-modal__title">
            {selectedSectionIndex === null ? "Add Section" : "Edit Section"}
          </h2>
          <button onClick={onClose} className="section-modal__close">
            <X className="w-6 h-6" />
          </button>
        </div>

        <Form {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="section-modal__form"
            // onClick={(e) => console.log("Form clicked", e.target)}
          >
            <CustomFormField
              name="sectionTitle"
              label="Section Title"
              placeholder="Write section title here"
            />

            <CustomFormField
              name="sectionDescription"
              label="Section Description"
              type="textarea"
              placeholder="Write section description here"
            />

            <div className="section-modal__actions">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-primary-700"
                onClick={methods.handleSubmit(onSubmit)}
              >
                Save
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </CustomModal>
  );
};

export default SectionModal;
