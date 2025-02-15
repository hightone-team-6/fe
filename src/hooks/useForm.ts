import { FormEvent } from "react";

import { useState } from "react";

import { ChangeEvent } from "react";

import { useCallback } from "react";

export interface FormState {
  files: File[];
  description: string;
}

interface UseFormProps {
  onSubmit: (data: FormState) => void;
}

export const useForm = ({ onSubmit }: UseFormProps) => {
  const [formState, setFormState] = useState<FormState>({
    files: [],
    description: "",
  });

  const handleFileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFormState((prev) => ({
      ...prev,
      files: [...Array.from(e.target.files!)],
    }));
  }, []);

  const handleDescriptionChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      setFormState((prev) => ({
        ...prev,
        description: e.target.value,
      }));
    },
    []
  );

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      onSubmit(formState);
    },
    [formState, onSubmit]
  );

  return {
    formState,
    handleFileChange,
    handleDescriptionChange,
    handleSubmit,
  };
};
