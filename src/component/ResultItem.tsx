type Props = {
  sickNm: string;
  isFocus: boolean;
};

export const RecommendItem = ({ sickNm, isFocus }: Props) => {
  return (
    <>
      {isFocus ? (
        <li className="flex items-center p-3 bg-gray-200">
          <button className="w-4 mr-3">
            <img src="https://i.ibb.co/Rjf0LpY/search.png" alt="search" />
          </button>
          {sickNm}
        </li>
      ) : (
        <li className="flex items-center p-3">
          <button className="w-4 mr-3">
            <img src="https://i.ibb.co/Rjf0LpY/search.png" alt="search" />
          </button>
          {sickNm}
        </li>
      )}
    </>
  );
};
