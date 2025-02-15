import styled from "styled-components";

const Container = styled.button`
  position: fixed;
  left: 16px;
  top: 16px;
  width: 36px;
  height: 36px;
  border-radius: 300px;
  background: rgba(0, 0, 0, 0.8);

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  z-index: 100;
`;

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface FloatButtonProps extends React.HTMLAttributes<HTMLButtonElement> {}

const FloatButton = ({ ...props }: FloatButtonProps) => {
  return (
    <Container {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <g clip-path="url(#clip0_3_132)">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M8.29303 12.707C8.10556 12.5194 8.00024 12.2651 8.00024 12C8.00024 11.7348 8.10556 11.4805 8.29303 11.293L13.95 5.63598C14.0423 5.54047 14.1526 5.46428 14.2746 5.41188C14.3966 5.35947 14.5279 5.33188 14.6606 5.33073C14.7934 5.32957 14.9251 5.35487 15.048 5.40516C15.1709 5.45544 15.2825 5.52969 15.3764 5.62358C15.4703 5.71747 15.5446 5.82913 15.5949 5.95202C15.6451 6.07492 15.6704 6.2066 15.6693 6.33938C15.6681 6.47216 15.6405 6.60338 15.5881 6.72538C15.5357 6.84739 15.4595 6.95773 15.364 7.04998L10.414 12L15.364 16.95C15.5462 17.1386 15.647 17.3912 15.6447 17.6534C15.6424 17.9156 15.5373 18.1664 15.3518 18.3518C15.1664 18.5372 14.9156 18.6424 14.6534 18.6447C14.3912 18.6469 14.1386 18.5461 13.95 18.364L8.29303 12.707Z"
            fill="white"
          />
        </g>
        <defs>
          <clipPath id="clip0_3_132">
            <rect width="24" height="24" rx="12" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </Container>
  );
};

export default FloatButton;
