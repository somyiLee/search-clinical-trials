import { useState, ChangeEvent, FormEvent } from 'react';
import { useMainContext } from '../hooks/useMainContext';

export const Search = () => {
  const { getItems, delayApi } = useMainContext();
  const [params, setParams] = useState('');

  const submitParams = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    getItems(params);
  };

  const changeResult = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    delayApi(value);
    setParams(value);
  };

  return (
    <form
      className="w-full mb-5 bg-white rounded-full overflow-hidden flex justify-between items-center"
      onSubmit={submitParams}
    >
      <div className="w-7 ml-8">
        <img src="https://i.ibb.co/Rjf0LpY/search.png" alt="search" />
      </div>

      <input type="text" className="w-7/12 text-xl focus:outline-none " onChange={changeResult} />
      <button type="submit" className="bg-blue-700 text-white pl-9 pr-10 py-5 text-xl">
        검색
      </button>
    </form>
  );
};
