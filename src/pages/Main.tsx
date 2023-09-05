import { Search, RecommendItem } from '../component/index';
import { useMainContext } from '../hooks/useMainContext';

const Main = () => {
  const { filterItems } = useMainContext();
  return (
    <div className="w-5/12 m-auto mt-20">
      <header className="text-center text-4xl mb-10 leading-relaxed font-semibold">
        <h1>
          국내 모든 임상실험 검색하고
          <br /> 온라인으로 참여하기
        </h1>
      </header>
      <main>
        <Search />
        <div className="w-full py-5 px-8 bg-white rounded-2xl overflow-hidden">
          <h3 className="text-gray-400 pt-1 text-sm mb-4 mt-1">
            {filterItems.length === 0 ? '검색어 없음' : '추천 검색어'}
          </h3>
          <ul>
            {filterItems.map(item => (
              <RecommendItem key={item.sickCd} {...item} />
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
};

export default Main;
