import useGetReservations from "@/api/hooks/reservations/useGetReservations";
import { Typography } from "@/components/Typography";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const DatePicker = styled.div`
  width: 100%;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.08);

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 14px 16px 8px 16px;
  margin-right: auto;
`;

const Dates = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 6px;
  justify-content: center;
  align-items: center;
`;

const Day = styled.div<{ $width: number }>`
  color: #000 !important;
  text-align: center;
  width: ${({ $width }) => $width}px;
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
`;

const DateTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
  width: 228px;
  text-align: center;
  justify-content: center;
`;

const DateComponent = styled.div<{
  $dateType: "active" | "unActive" | "blue" | "red";
  $isSelected: boolean;
}>`
  width: 21px;
  height: 21px;
  color: ${({ $dateType, $isSelected }) =>
    $isSelected
      ? "#fff"
      : $dateType === "active"
      ? "#000"
      : $dateType === "unActive"
      ? "#828282"
      : $dateType === "blue"
      ? "#2E7DC1"
      : "#F00"};
  text-align: center;
  font-size: 12px;
  font-weight: 400;
  background-color: ${({ $isSelected }) =>
    $isSelected ? "rgba(43, 129, 55, 0.50)" : "none"};
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button`
  position: fixed;
  bottom: 100px;
  display: flex;
  width: 361px;
  height: 60px;
  padding: 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 300px;
  background: #2b8137;

  color: #fff;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 700;
`;

const ReservationList = styled.div`
  display: flex;
  width: 361px;
  height: 60px;
  padding: 0px 16px;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.12);
  cursor: pointer;
`;

const ReservationListTitle = styled.div`
  color: #000;

  /* BodyRegular */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const Line = () => (
  <svg
    width="218"
    height="22"
    viewBox="0 0 218 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1.0625 17L1.04688 15.9688L4.90625 11.9062C6.25 10.4844 6.89062 9.71875 6.89062 8.67188C6.89062 7.51562 5.90625 6.75 4.64062 6.75C3.29688 6.75 2.4375 7.60938 2.4375 8.875H1.10938C1.09375 6.875 2.64062 5.53125 4.6875 5.53125C6.73438 5.53125 8.20312 6.90625 8.20312 8.67188C8.20312 9.9375 7.60938 10.9219 5.60938 12.9844L3.01562 15.6562V15.75H8.40625V17H1.0625ZM11.4219 17.0938C10.875 17.0938 10.4062 16.6406 10.4219 16.0781C10.4062 15.5312 10.875 15.0781 11.4219 15.0781C11.9688 15.0781 12.4219 15.5312 12.4219 16.0781C12.4219 16.6406 11.9688 17.0938 11.4219 17.0938ZM17.1562 5.6875V17H15.7344V7.15625H15.6719L12.9219 8.98438V7.5625L15.7344 5.6875H17.1562ZM23.9531 17.1562C21.5781 17.1562 19.9219 15.8438 19.9375 14C19.9219 12.5312 20.9375 11.3281 22.2344 11.125V11.0625C21.1094 10.7969 20.375 9.76562 20.375 8.53125C20.375 6.79688 21.8906 5.53125 23.9531 5.53125C26.0156 5.53125 27.5312 6.79688 27.5469 8.53125C27.5312 9.76562 26.7812 10.7969 25.6719 11.0625V11.125C26.9531 11.3281 27.9688 12.5312 27.9844 14C27.9688 15.8438 26.3125 17.1562 23.9531 17.1562ZM23.9531 15.9219C25.5781 15.9219 26.5781 15.1094 26.5781 13.9219C26.5781 12.6719 25.4688 11.75 23.9531 11.75C22.4375 11.75 21.3125 12.6719 21.3438 13.9219C21.3125 15.1094 22.3281 15.9219 23.9531 15.9219ZM23.9531 10.5625C25.2344 10.5625 26.1719 9.78125 26.1719 8.64062C26.1719 7.51562 25.2812 6.75 23.9531 6.75C22.6094 6.75 21.7344 7.51562 21.7344 8.64062C21.7344 9.78125 22.6562 10.5625 23.9531 10.5625ZM34.3438 11.1719C34.8438 10.5938 35.4688 10.2812 36.1562 10.2812C37.3438 10.2812 38.4219 11.1875 39.5625 11.1875C40.2656 11.1875 40.875 10.8438 41.3438 10.2031V11.5C40.8281 12.0938 40.2188 12.3906 39.5312 12.3906C38.3438 12.3906 37.2656 11.4844 36.1094 11.4844C35.4219 11.4844 34.8125 11.8281 34.3438 12.4688V11.1719ZM47.9375 17L47.9219 15.9688L51.7812 11.9062C53.125 10.4844 53.7656 9.71875 53.7656 8.67188C53.7656 7.51562 52.7812 6.75 51.5156 6.75C50.1719 6.75 49.3125 7.60938 49.3125 8.875H47.9844C47.9688 6.875 49.5156 5.53125 51.5625 5.53125C53.6094 5.53125 55.0781 6.90625 55.0781 8.67188C55.0781 9.9375 54.4844 10.9219 52.4844 12.9844L49.8906 15.6562V15.75H55.2812V17H47.9375ZM58.2969 17.0938C57.75 17.0938 57.2812 16.6406 57.2969 16.0781C57.2812 15.5312 57.75 15.0781 58.2969 15.0781C58.8438 15.0781 59.2969 15.5312 59.2969 16.0781C59.2969 16.6406 58.8438 17.0938 58.2969 17.0938ZM61.3906 17L61.375 15.9688L65.2344 11.9062C66.5781 10.4844 67.2188 9.71875 67.2188 8.67188C67.2188 7.51562 66.2344 6.75 64.9688 6.75C63.625 6.75 62.7656 7.60938 62.7656 8.875H61.4375C61.4219 6.875 62.9688 5.53125 65.0156 5.53125C67.0625 5.53125 68.5312 6.90625 68.5312 8.67188C68.5312 9.9375 67.9375 10.9219 65.9375 12.9844L63.3438 15.6562V15.75H68.7344V17H61.3906ZM74.7812 5.6875V17H73.3594V7.15625H73.2969L70.5469 8.98438V7.5625L73.3594 5.6875H74.7812Z"
      fill="black"
    />
    <path
      d="M101 1L101 21"
      stroke="#2B8137"
      stroke-width="2"
      stroke-linecap="round"
    />
    <path
      d="M123.922 7.45312C124.729 7.45312 125.466 7.61719 126.133 7.94531C126.799 8.27344 127.326 8.72917 127.711 9.3125C128.102 9.89583 128.297 10.5521 128.297 11.2812C128.297 12.0052 128.102 12.6589 127.711 13.2422C127.326 13.8203 126.799 14.2734 126.133 14.6016C125.466 14.9297 124.729 15.0938 123.922 15.0938C123.115 15.0938 122.375 14.9297 121.703 14.6016C121.036 14.2734 120.51 13.8203 120.125 13.2422C119.74 12.6589 119.547 12.0052 119.547 11.2812C119.547 10.5521 119.74 9.89844 120.125 9.32031C120.51 8.73698 121.036 8.28125 121.703 7.95312C122.375 7.61979 123.115 7.45312 123.922 7.45312ZM120.75 11.2812C120.745 11.8021 120.883 12.276 121.164 12.7031C121.445 13.125 121.828 13.4583 122.312 13.7031C122.797 13.9427 123.333 14.0625 123.922 14.0625C124.51 14.0625 125.044 13.9427 125.523 13.7031C126.008 13.4583 126.391 13.125 126.672 12.7031C126.953 12.276 127.094 11.8021 127.094 11.2812C127.094 10.7604 126.953 10.2891 126.672 9.86719C126.391 9.44531 126.008 9.11719 125.523 8.88281C125.044 8.64844 124.51 8.53125 123.922 8.53125C123.333 8.53125 122.794 8.65104 122.305 8.89062C121.82 9.125 121.438 9.45312 121.156 9.875C120.88 10.2917 120.745 10.7604 120.75 11.2812ZM137.75 7.45312C138.557 7.45312 139.294 7.61719 139.961 7.94531C140.628 8.27344 141.154 8.72917 141.539 9.3125C141.93 9.89583 142.125 10.5521 142.125 11.2812C142.125 12.0052 141.93 12.6589 141.539 13.2422C141.154 13.8203 140.628 14.2734 139.961 14.6016C139.294 14.9297 138.557 15.0938 137.75 15.0938C136.943 15.0938 136.203 14.9297 135.531 14.6016C134.865 14.2734 134.339 13.8203 133.953 13.2422C133.568 12.6589 133.375 12.0052 133.375 11.2812C133.375 10.5521 133.568 9.89844 133.953 9.32031C134.339 8.73698 134.865 8.28125 135.531 7.95312C136.203 7.61979 136.943 7.45312 137.75 7.45312ZM134.578 11.2812C134.573 11.8021 134.711 12.276 134.992 12.7031C135.273 13.125 135.656 13.4583 136.141 13.7031C136.625 13.9427 137.161 14.0625 137.75 14.0625C138.339 14.0625 138.872 13.9427 139.352 13.7031C139.836 13.4583 140.219 13.125 140.5 12.7031C140.781 12.276 140.922 11.8021 140.922 11.2812C140.922 10.7604 140.781 10.2891 140.5 9.86719C140.219 9.44531 139.836 9.11719 139.352 8.88281C138.872 8.64844 138.339 8.53125 137.75 8.53125C137.161 8.53125 136.622 8.65104 136.133 8.89062C135.648 9.125 135.266 9.45312 134.984 9.875C134.708 10.2917 134.573 10.7604 134.578 11.2812ZM151.578 7.45312C152.385 7.45312 153.122 7.61719 153.789 7.94531C154.456 8.27344 154.982 8.72917 155.367 9.3125C155.758 9.89583 155.953 10.5521 155.953 11.2812C155.953 12.0052 155.758 12.6589 155.367 13.2422C154.982 13.8203 154.456 14.2734 153.789 14.6016C153.122 14.9297 152.385 15.0938 151.578 15.0938C150.771 15.0938 150.031 14.9297 149.359 14.6016C148.693 14.2734 148.167 13.8203 147.781 13.2422C147.396 12.6589 147.203 12.0052 147.203 11.2812C147.203 10.5521 147.396 9.89844 147.781 9.32031C148.167 8.73698 148.693 8.28125 149.359 7.95312C150.031 7.61979 150.771 7.45312 151.578 7.45312ZM148.406 11.2812C148.401 11.8021 148.539 12.276 148.82 12.7031C149.102 13.125 149.484 13.4583 149.969 13.7031C150.453 13.9427 150.99 14.0625 151.578 14.0625C152.167 14.0625 152.701 13.9427 153.18 13.7031C153.664 13.4583 154.047 13.125 154.328 12.7031C154.609 12.276 154.75 11.8021 154.75 11.2812C154.75 10.7604 154.609 10.2891 154.328 9.86719C154.047 9.44531 153.664 9.11719 153.18 8.88281C152.701 8.64844 152.167 8.53125 151.578 8.53125C150.99 8.53125 150.451 8.65104 149.961 8.89062C149.477 9.125 149.094 9.45312 148.812 9.875C148.536 10.2917 148.401 10.7604 148.406 11.2812ZM167.203 7.14062C167.208 7.65625 167.326 8.16146 167.555 8.65625C167.784 9.15104 168.115 9.59635 168.547 9.99219C168.979 10.3828 169.484 10.6875 170.062 10.9062L169.422 11.8438C168.766 11.5885 168.198 11.2266 167.719 10.7578C167.245 10.2891 166.88 9.75 166.625 9.14062C166.365 9.82292 165.987 10.4375 165.492 10.9844C164.997 11.5312 164.417 11.9479 163.75 12.2344L163.078 11.2812C163.672 11.026 164.19 10.6719 164.633 10.2188C165.081 9.76562 165.424 9.27083 165.664 8.73438C165.904 8.19271 166.026 7.66146 166.031 7.14062V5.25H167.203V7.14062ZM165.609 15.7656C165.604 15.2448 165.786 14.7995 166.156 14.4297C166.531 14.0547 167.07 13.7708 167.773 13.5781C168.477 13.3802 169.307 13.2812 170.266 13.2812C171.219 13.2812 172.044 13.3802 172.742 13.5781C173.445 13.7708 173.987 14.0547 174.367 14.4297C174.747 14.7995 174.938 15.2448 174.938 15.7656C174.938 16.2812 174.747 16.724 174.367 17.0938C173.987 17.4635 173.445 17.7448 172.742 17.9375C172.044 18.1354 171.219 18.2344 170.266 18.2344C169.307 18.2344 168.477 18.1354 167.773 17.9375C167.07 17.7448 166.531 17.4635 166.156 17.0938C165.786 16.724 165.604 16.2812 165.609 15.7656ZM166.828 15.7656C166.823 16.0781 166.956 16.349 167.227 16.5781C167.503 16.8021 167.896 16.974 168.406 17.0938C168.922 17.2188 169.529 17.2812 170.227 17.2812C170.935 17.2812 171.549 17.2214 172.07 17.1016C172.591 16.9818 172.995 16.8073 173.281 16.5781C173.568 16.349 173.714 16.0781 173.719 15.7656C173.714 15.4479 173.57 15.1745 173.289 14.9453C173.008 14.7109 172.607 14.5312 172.086 14.4062C171.57 14.2812 170.964 14.2188 170.266 14.2188C169.557 14.2188 168.943 14.2812 168.422 14.4062C167.906 14.5312 167.51 14.7109 167.234 14.9453C166.958 15.1745 166.823 15.4479 166.828 15.7656ZM170.688 4.65625H171.844V8.125H173.688V4.39062H174.859V12.9688H173.688V9.14062H171.844V12.5312H170.688V4.65625ZM180.828 4.89062C181.516 4.89062 182.13 5.02344 182.672 5.28906C183.219 5.54948 183.646 5.91406 183.953 6.38281C184.266 6.84635 184.422 7.375 184.422 7.96875C184.422 8.5625 184.266 9.09375 183.953 9.5625C183.646 10.026 183.219 10.388 182.672 10.6484C182.13 10.9036 181.516 11.0312 180.828 11.0312C180.135 11.0312 179.513 10.9036 178.961 10.6484C178.414 10.388 177.987 10.026 177.68 9.5625C177.372 9.09375 177.219 8.5625 177.219 7.96875C177.219 7.375 177.372 6.84635 177.68 6.38281C177.987 5.91406 178.414 5.54948 178.961 5.28906C179.513 5.02344 180.135 4.89062 180.828 4.89062ZM178.422 7.96875C178.417 8.36979 178.516 8.72656 178.719 9.03906C178.927 9.35156 179.214 9.59635 179.578 9.77344C179.948 9.94531 180.365 10.0312 180.828 10.0312C181.281 10.0312 181.69 9.94531 182.055 9.77344C182.424 9.59635 182.714 9.35156 182.922 9.03906C183.13 8.72656 183.234 8.36979 183.234 7.96875C183.234 7.57292 183.13 7.21875 182.922 6.90625C182.714 6.59375 182.424 6.35156 182.055 6.17969C181.69 6.00781 181.281 5.92188 180.828 5.92188C180.365 5.92188 179.948 6.00781 179.578 6.17969C179.214 6.35156 178.927 6.59375 178.719 6.90625C178.516 7.21875 178.417 7.57292 178.422 7.96875ZM179.328 12.1875H188.359V15.5312H180.562V17.0938H188.859V18.0781H179.359V14.6094H187.141V13.1719H179.328V12.1875ZM187.141 4.375H188.359V11.5156H187.141V4.375ZM197.922 5.82812C197.917 7.26562 197.721 8.59375 197.336 9.8125C196.956 11.026 196.294 12.1589 195.352 13.2109C194.414 14.263 193.146 15.1823 191.547 15.9688L190.859 15.0312C192.13 14.4115 193.177 13.7057 194 12.9141C194.823 12.1224 195.451 11.2448 195.883 10.2812L191.125 10.7344L190.922 9.65625L196.258 9.29688C196.497 8.54688 196.646 7.72917 196.703 6.84375H191.625V5.82812H197.922ZM200.25 4.375H201.469V10.0312H203.719V11.0625H201.469V18.2656H200.25V4.375ZM216.5 18.2656H215.312V4.375H216.5V18.2656ZM204.391 13.7812C205.01 13.7812 205.5 13.7786 205.859 13.7734V7.17188H204.688V6.15625H211.078V7.17188H209.906V13.6094C210.557 13.5521 211.052 13.5 211.391 13.4531L211.469 14.3594C210.526 14.5365 209.466 14.6589 208.289 14.7266C207.112 14.7943 205.951 14.8281 204.805 14.8281H204.547L204.391 13.7812ZM206.984 13.75C207.594 13.7344 208.188 13.7109 208.766 13.6797V7.17188H206.984V13.75ZM210.672 9.65625H212.609V4.71875H213.781V17.5312H212.609V10.7656H210.672V9.65625Z"
      fill="black"
    />
  </svg>
);

const Text = styled.div`
  color: #000;

  /* BodyRegular */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const Next = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M15.707 11.293C15.8945 11.4805 15.9998 11.7348 15.9998 12C15.9998 12.2652 15.8945 12.5195 15.707 12.707L10.05 18.364C9.95775 18.4595 9.84741 18.5357 9.7254 18.5881C9.6034 18.6405 9.47218 18.6681 9.3394 18.6692C9.20662 18.6704 9.07494 18.6451 8.95205 18.5948C8.82915 18.5445 8.7175 18.4703 8.6236 18.3764C8.52971 18.2825 8.45546 18.1708 8.40518 18.0479C8.3549 17.925 8.3296 17.7934 8.33075 17.6606C8.3319 17.5278 8.35949 17.3966 8.4119 17.2746C8.46431 17.1526 8.54049 17.0422 8.636 16.95L13.586 12L8.636 7.04999C8.45384 6.86139 8.35305 6.60879 8.35533 6.34659C8.35761 6.08439 8.46277 5.83358 8.64818 5.64817C8.83359 5.46277 9.0844 5.3576 9.3466 5.35532C9.6088 5.35304 9.8614 5.45383 10.05 5.63599L15.707 11.293Z"
      fill="black"
    />
  </svg>
);

export const AdminPage = () => {
  const initialMonth = new Date().getMonth() + 1;

  const [selectedMonth, setSelectedMonth] = useState<number>(initialMonth);
  const [selectedDate, setSelectedDate] = useState<number[]>([]);
  const [dates, setDates] = useState<{ date: number; isActive: boolean }[]>([]);

  const { data: reservations } = useGetReservations();

  useEffect(() => {
    if (reservations) {
      const dates = reservations
        .filter((v) => {
          return Number(v.month) === selectedMonth;
        })
        .map((v) => v.dates);
      const flattenedDates = dates
        .flat()
        .toString()
        .replace("[", "")
        .replace("]", "")
        .split(",")
        .map((v) => Number(v));

      setSelectedDate(flattenedDates);
    }
  }, [reservations, selectedMonth]);

  useEffect(() => {
    const lastMonthLastDate = new Date(2024, selectedMonth - 1, 0).getDate();
    const thisMonthLastDate = new Date(2024, selectedMonth, 0).getDate();
    const thisMonthFirstDay = new Date(2024, selectedMonth - 1, 1).getDay();

    const lastMonthDates = Array.from(
      { length: thisMonthFirstDay },
      (_, i) => ({
        date: lastMonthLastDate - thisMonthFirstDay + i + 1,
        isActive: false,
      })
    );

    const thisMonthDates = Array.from(
      { length: thisMonthLastDate },
      (_, i) => ({
        date: i + 1,
        isActive: true,
      })
    );

    const totalDays = thisMonthFirstDay + thisMonthLastDate;
    const remainingDays = totalDays > 35 ? 42 - totalDays : 35 - totalDays;

    const nextMonthDates = Array.from({ length: remainingDays }, (_, i) => ({
      date: i + 1,
      isActive: false,
    }));

    setDates([...lastMonthDates, ...thisMonthDates, ...nextMonthDates]);
  }, [selectedMonth]);

  const navigate = useNavigate();

  return (
    <>
      <Container>
        <Typography size="Headline" weight={"bold"}>
          이번 달 예약
        </Typography>

        <div style={{ height: "16px" }} />

        <DatePicker>
          <DateTitle>
            <svg
              style={{ cursor: "pointer" }}
              onClick={() =>
                setSelectedMonth((prev) => (prev === 1 ? 12 : prev - 1))
              }
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <g clip-path="url(#clip0_30_2271)">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.52869 8.47124C5.40371 8.34622 5.3335 8.17668 5.3335 7.9999C5.3335 7.82313 5.40371 7.65359 5.52869 7.52857L9.30002 3.75724C9.36152 3.69356 9.43508 3.64277 9.51642 3.60784C9.59775 3.5729 9.68523 3.55451 9.77375 3.55374C9.86227 3.55297 9.95006 3.56983 10.032 3.60336C10.1139 3.63688 10.1884 3.68638 10.251 3.74897C10.3135 3.81157 10.363 3.886 10.3966 3.96793C10.4301 4.04986 10.447 4.13765 10.4462 4.22617C10.4454 4.31469 10.427 4.40217 10.3921 4.48351C10.3571 4.56484 10.3064 4.63841 10.2427 4.6999L6.94269 7.9999L10.2427 11.2999C10.3641 11.4256 10.4313 11.594 10.4298 11.7688C10.4283 11.9436 10.3582 12.1108 10.2346 12.2344C10.111 12.3581 9.94375 12.4282 9.76895 12.4297C9.59416 12.4312 9.42576 12.364 9.30002 12.2426L5.52869 8.47124Z"
                  fill="black"
                />
              </g>
              <defs>
                <clipPath id="clip0_30_2271">
                  <rect width="16" height="16" fill="white" />
                </clipPath>
              </defs>
            </svg>

            <Day $width={selectedMonth < 10 ? 20 : 24}>{selectedMonth}월</Day>

            <svg
              style={{ cursor: "pointer" }}
              onClick={() =>
                setSelectedMonth((prev) => (prev === 12 ? 1 : prev + 1))
              }
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <g clip-path="url(#clip0_30_2275)">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10.4713 8.47124C10.5963 8.34622 10.6665 8.17668 10.6665 7.9999C10.6665 7.82313 10.5963 7.65359 10.4713 7.52857L6.69998 3.75724C6.63848 3.69356 6.56492 3.64277 6.48358 3.60784C6.40225 3.5729 6.31477 3.55451 6.22625 3.55374C6.13773 3.55297 6.04994 3.56983 5.96801 3.60336C5.88608 3.63688 5.81164 3.68638 5.74905 3.74897C5.68645 3.81157 5.63695 3.886 5.60343 3.96793C5.56991 4.04986 5.55304 4.13765 5.55381 4.22617C5.55458 4.31469 5.57297 4.40217 5.60791 4.48351C5.64285 4.56484 5.69364 4.63841 5.75731 4.6999L9.05731 7.9999L5.75731 11.2999C5.63587 11.4256 5.56868 11.594 5.5702 11.7688C5.57172 11.9436 5.64183 12.1108 5.76543 12.2344C5.88904 12.3581 6.05625 12.4282 6.23105 12.4297C6.40584 12.4312 6.57424 12.364 6.69998 12.2426L10.4713 8.47124Z"
                  fill="black"
                />
              </g>
              <defs>
                <clipPath id="clip0_30_2275">
                  <rect
                    width="16"
                    height="16"
                    fill="white"
                    transform="matrix(-1 0 0 1 16 0)"
                  />
                </clipPath>
              </defs>
            </svg>
          </DateTitle>
          <Dates>
            <Day $width={24}>일</Day>
            <Day $width={24}>월</Day>
            <Day $width={24}>화</Day>
            <Day $width={24}>수</Day>
            <Day $width={24}>목</Day>
            <Day $width={24}>금</Day>
            <Day $width={24}>토</Day>

            {dates.map(({ date, isActive }, index) => (
              <DateComponent
                // onClick={() =>
                //   setSelectedDate((prev) =>
                //     prev.includes(index)
                //       ? prev.filter((item) => item !== index)
                //       : [...prev, index]
                //   )
                // }
                $dateType={
                  isActive
                    ? index % 7 === 0
                      ? "red"
                      : index % 7 === 6
                      ? "blue"
                      : "active"
                    : "unActive"
                }
                $isSelected={selectedDate.includes(index)}
              >
                {date}
              </DateComponent>
            ))}
          </Dates>
        </DatePicker>
        <div style={{ height: "16px" }} />

        {reservations?.map((reservation) => (
          <>
            <ReservationList
              onClick={() => {
                navigate(`/admin/reservation`);
              }}
            >
              {/* <ReservationListTitle>{reservation.dates}</ReservationListTitle> */}
              <Line />
              {/* <Text>{reservation.userName}</Text> */}
              <Next />
            </ReservationList>
            <div style={{ height: "16px" }} />
          </>
        ))}

        <Button onClick={() => navigate("/admin/reservation")}>
          새로운 예약이 있어요!
        </Button>
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  padding: 0 16px;
`;
