import useGetLocations from "@/api/hooks/locations/useGetLocations";
import usePostReservation from "@/api/hooks/reservations/usePostReservation";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  width: 393px;
  display: flex;
  flex-direction: column;

  padding: 0 16px;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 339px;

  color: #000;

  font-size: 16px;
  font-weight: 700;
  line-height: normal;
  margin: 3px 0 8px 0;
  position: relative;
`;

const FormItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 339px;

  gap: 4px;

  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const Input = styled.input<{ $width: number }>`
  outline: none;
  border: none;
  border-radius: 8px;
  background: #d9d9d9;
  padding: 12px 16px;
  width: ${({ $width }) => $width}px;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  height: 30px;
  line-height: normal;
`;

const TextArea = styled.textarea<{ $width: number }>`
  outline: none;
  border: none;
  border-radius: 8px;
  background: #d9d9d9;
  padding: 12px 16px;
  width: ${({ $width }) => $width}px;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  height: 185px;
  line-height: normal;
  resize: none;
  margin-bottom: 72px;
`;

const PDFImage =
  "https://blog.kakaocdn.net/dn/blHjj9/btrWKRyrEZr/cv1ixGSaVFIlkB7SO3UhN0/img.jpg";

const DatePicker = styled.div`
  width: 250px;
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

const FileUploadWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  width: 377px;
  overflow-x: auto;
`;

const FileUpload = styled.div<{ imageSrc: string | null }>`
  width: 100px;
  height: 100px;
  flex-shrink: 0;
  border-radius: 12px;
  background: ${({ imageSrc }) => (imageSrc ? `url(${imageSrc})` : "#D9D9D9")};
  background-size: cover;
  background-position: center;
`;

const Button = styled.button`
  position: fixed;
  bottom: 50px;
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

const RegisterPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const initialMonth = new Date().getMonth() + 1;

  const [selectedMonth, setSelectedMonth] = useState<number>(initialMonth);
  const [selectedDate, setSelectedDate] = useState<number[]>([]);

  const [request, setRequest] = useState("");
  const [file, setFile] = useState<
    [File | null, File | null, File | null, File | null]
  >([null, null, null, null]);
  const [dates, setDates] = useState<
    {
      date: number;
      isActive: boolean;
    }[]
  >([]);

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

  const { mutate: postReservation } = usePostReservation({
    onSuccess: () => {
      navigate("/purchase");
    },
    onError: () => {
      alert("예약에 실패했습니다.");
    },
  });

  const locationId = useLocation().pathname.split("/")[2];
  const { data: location } = useGetLocations();
  const currentLocation = location?.find(
    (l) => l.locationId === Number(locationId)
  );

  return (
    <Container>
      <TitleWrapper>예약자 정보</TitleWrapper>

      <FormItem>
        이름
        <Input
          $width={200}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="이름을 입력해주세요."
        />
      </FormItem>
      <div style={{ height: "8px" }} />
      <FormItem>
        전화번호
        <Input
          $width={200}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="전화번호를 입력해주세요."
        />
      </FormItem>
      <div style={{ height: "16px" }} />

      <TitleWrapper>예약 날짜</TitleWrapper>

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
              onClick={() =>
                setSelectedDate((prev) =>
                  prev.includes(index)
                    ? prev.filter((item) => item !== index)
                    : [...prev, index]
                )
              }
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
      <TitleWrapper>파일 업로드</TitleWrapper>

      <FileUploadWrapper>
        {useMemo(
          () =>
            file.map((f, index) => (
              <div key={index} style={{ position: "relative" }}>
                <FileUpload
                  imageSrc={
                    f?.type?.includes("pdf")
                      ? PDFImage
                      : f
                      ? URL.createObjectURL(f)
                      : null
                  }
                />
                <input
                  type="file"
                  accept="image/*,application/pdf"
                  onChange={(e) => {
                    const newFile = e.target.files?.[0] || null;
                    setFile((prev) => {
                      const newFiles = [...prev];
                      newFiles[index] = newFile;
                      return newFiles as [
                        File | null,
                        File | null,
                        File | null,
                        File | null
                      ];
                    });
                  }}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    opacity: 0,
                    cursor: "pointer",
                  }}
                />
              </div>
            )),
          [file]
        )}
      </FileUploadWrapper>

      <div style={{ height: "16px" }} />

      <TitleWrapper>요청사항</TitleWrapper>
      <TextArea
        $width={361}
        value={request}
        onChange={(e) => setRequest(e.target.value)}
        placeholder="요구사항을 입력해주세요."
      />

      <Button
        onClick={() => {
          postReservation({
            userName: name,
            userPhone: phone,
            dates: selectedDate,
            month: selectedMonth,
            file: file.filter((f) => f !== null),
            request: request,
            locationId: currentLocation?.locationId ?? 0,
          });
        }}
      >
        결제하기
      </Button>
    </Container>
  );
};

export default RegisterPage;
