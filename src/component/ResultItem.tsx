import { filterItems } from '../shared/types';
export const RecommendItem = ({ sickNm }: filterItems) => {
  return (
    <>
      <li className="flex items-center mb-3">
        <button className="w-4 mr-3">
          <img src="https://i.ibb.co/Rjf0LpY/search.png" alt="search" />
        </button>
        {sickNm}
      </li>
    </>
  );
};
