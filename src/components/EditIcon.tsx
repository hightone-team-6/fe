interface IconProps {
  active?: boolean;
}

export const EditIcon = ({ active }: IconProps) => {
  return (
    <>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M22 20V22H2.00002V20H22ZM15 2L20 7.00002L9 18H4.00003V13L15 2ZM11.7069 8.12108L6 13.828V16H8.172L13.8789 10.2931L11.7069 8.12108ZM15 4.82802L13.1211 6.70686L15.2931 8.87886L17.172 7.00002L15 4.82802Z"
          fill={active ? "#2B8137" : "#888888"}
        />
      </svg>
    </>
  );
};
