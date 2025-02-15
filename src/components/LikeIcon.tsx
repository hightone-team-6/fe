interface IconProps {
  active?: boolean;
}

export const LikeIcon = ({ active }: IconProps) => {
  return (
    <>
      <svg
        width="24"
        height="25"
        viewBox="0 0 24 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 8.5C12 8.5 12 8.5 11.24 7.5C10.36 6.34 9.06 5.5 7.5 5.5C5.01 5.5 3 7.51 3 10C3 10.93 3.28 11.79 3.76 12.5C4.57 13.71 12 21.5 12 21.5M12 8.5C12 8.5 12 8.5 12.76 7.5C13.64 6.34 14.94 5.5 16.5 5.5C18.99 5.5 21 7.51 21 10C21 10.93 20.72 11.79 20.24 12.5C19.43 13.71 12 21.5 12 21.5"
          stroke={active ? "#2B8137" : "#888888"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
};
