import { useEffect, useState,ChangeEvent  } from 'react';
import './index.scss';

import { Collection } from './Collection';


type PhotosType = {
  category: number
  name: string
  photos:Array<string>
}
const cats = [
  { "name": "Все" },
  { "name": "Море" },
  { "name": "Горы" },
  { "name": "Архитектура" },
  { "name": "Города" }
];

function App() {
  const [collections, setCollections] = useState<Array<PhotosType>>([]);
  const [searchValue, setSearchValue] = useState('');
  const [categoryId, setCategoryId] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setIsLoading(true);

    const category = categoryId ? `category=${categoryId}` : '';

    fetch(`https://630b4196ed18e82516507688.mockapi.io/photo-collections?page=${page}&limit=3&${category}`)
      .then((res) => res.json())
      .then((res) => {
        setCollections(res);
      })
      .catch((err) => {
        console.warn(err);
        alert('Ошибка при получении данных');
      })
      .finally(() => setIsLoading(false))
  }, [categoryId, page]);

  const onChangeSearchValue = (e: ChangeEvent<HTMLInputElement>) => setSearchValue(e.currentTarget.value);
  
  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {cats.map((obj, idx) => (
            <li
              key={obj.name}
              onClick={() => setCategoryId(idx)}
              className={categoryId === idx ? "active" : ""}>
              {obj.name}
            </li>
          ))}
        </ul>
        <input
          value={searchValue}
          onChange={onChangeSearchValue}
          className="search-input"
          placeholder="Поиск по названию" />
      </div>
      <div className="content">
        {isLoading ? (
          <h2>Идет загрузка...</h2>
        ) : (
          collections
            .filter((obj) => obj.name.toLowerCase().includes(searchValue.toLowerCase()))
            .map((obj, index) => (
              <Collection
                key={index}
                name={obj.name}
                images={obj.photos}
              />
            ))
        )}
        
      </div>
      <ul className="pagination">
        {[...Array(5)].map((_, idx) => (
          <li key={idx} onClick={()=> setPage(idx + 1)} className={page === idx + 1 ? 'active' : ''}>{idx + 1}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
