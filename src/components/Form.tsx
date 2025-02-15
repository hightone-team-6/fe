import styled from "styled-components";
import { useForm, FormState } from "@/hooks/useForm";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  width: 100%;
  max-width: 60rem;
  margin: 0 auto;
  padding: 2rem;
`;

const StyledTextArea = styled.textarea`
  width: 100%;
  min-height: 12rem;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.4rem;
  resize: vertical;
`;

// HACK 이거 예시 useForm 사용한 form이야

export const Form = () => {
  const { formState, handleFileChange, handleDescriptionChange, handleSubmit } =
    useForm({
      onSubmit: (data) => {
        console.log("제출된 데이터:", data);
      },
    });

  return (
    <StyledForm onSubmit={handleSubmit}>
      <input
        type="file"
        onChange={handleFileChange}
        multiple
        accept="image/*"
      />
      <StyledTextArea
        value={formState.description}
        onChange={handleDescriptionChange}
        placeholder="설명을 입력하세요"
      />
      <button type="submit">제출하기</button>
    </StyledForm>
  );
};
