import { Search, RecommendItem } from '../component';
import { useMainContext, usechangeFocus } from '../hooks';

const Main = () => {
  const { resultList } = useMainContext();
  const { handleKeyDown, focusIdx, focusRef } = usechangeFocus();
  return (
    <div className="w-6/12 m-auto mt-20">
      <header className="text-center text-4xl mb-10 leading-relaxed font-semibold">
        <h1>
          국내 모든 임상실험 검색하고
          <br /> 온라인으로 참여하기
        </h1>
      </header>
      <main>
        <Search handleKeyDown={handleKeyDown} />
        <div className="w-full py-5 px-8 bg-white rounded-2xl overflow-hidden">
          <h3 className="text-gray-400 pt-1 text-sm mb-4 mt-1">
            {resultList.length === 0 ? '검색어 없음' : '추천 검색어'}
          </h3>
          <ul className="max-h-72 overflow-auto" ref={focusRef}>
            {resultList.map((item, idx) => {
              return <RecommendItem key={item.sickCd} isFocus={focusIdx === idx} {...item} />;
            })}
          </ul>
        </div>
      </main>
    </div>
  );
};

export default Main;
