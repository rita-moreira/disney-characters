import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Paginate from "./Paginate";
import Card from "./Card";
import { ICharacter } from "../interfaces";
import SearchBar from "./SearchBar";

const Characters = () => {
  const [characters, setCharacters] = useState<ICharacter[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [all, setAll] = useState<boolean>(true);
  const [favorites, setFavorites] = useState<ICharacter[]>([]);
  useEffect(() => {
    if (all) {
      axios
        .get(`https://api.disneyapi.dev/characters?page=${currentPage}`)
        .then((res) => {
          const c = res.data;
          setCharacters(c.data);
          setTotalPages(c.totalPages);
        });
    } else {
      setCharacters(favorites)
    }
  }, [all, currentPage, favorites]);

  const onFavClick = useCallback((character: ICharacter) => {
    const alreadyInFav = favorites.find((fav) => fav._id === character._id)
    if (alreadyInFav) {
      setFavorites((prev) => prev.filter((p) => p._id !== character._id))
    } else {
      setFavorites((prev) => {
        return [...prev, character]
      })
    }
  },[favorites])

  return (
    <main className="light container">
      <div className="flex">
        <h1 className="animate-in color-text">Disney</h1>
        <h1 className="animate-in">Characters</h1>
      </div>
      <div className="flex-left" style={{ margin: "100px" }}>
        <SearchBar />
        <div style={{ flexGrow: 1 }} />
        <button className={all ? 'btn-selected' : ''} onClick={() => setAll(true)}>all</button>
        <button className={!all ? 'btn-selected' : ''} onClick={() => setAll(false)}>favorites</button>
      </div>
      <div className="cards-container">
        {characters.map((character) => {
          const isFav = favorites.find((fav) => fav._id === character._id)
          return <Card isFav={isFav ? true : false} onFavClick={onFavClick} key={character._id} character={character} />;
        })}
      </div>
      <div className="paper">
        <Paginate
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      </div>
    </main>
  );
};

export default Characters;
