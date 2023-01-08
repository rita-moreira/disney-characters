import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Paginate from "./Paginate";
import Card from "./Card";
import { ICharacter } from "../interfaces";
import TopBar from "./TopBar";
import NoFavoritesComponent from "./NoFavoritesComponent";
import { Link } from "react-router-dom";

const Characters = () => {
  const [characters, setCharacters] = useState<ICharacter[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [all, setAll] = useState<boolean>(true);
  const [favorites, setFavorites] = useState<ICharacter[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (all || !all) {
      setCurrentPage(1);
    }
  }, [all]);
  useEffect(() => {
    if (all) {
      setIsLoading(true);

      if (searchInput.length === 0) {
        axios
          .get(`https://api.disneyapi.dev/characters?page=${currentPage}`)
          .then((res) => {
            const c = res.data;

            setTimeout(function () {
              setCharacters(c.data);
              setTotalPages(c.totalPages);
              setIsLoading(false);
            }, 1000);
          })
          .catch((err) => console.log(err));
      } else {
        axios
          .get(`https://api.disneyapi.dev/character?name=${searchInput}`)
          .then((res) => {
            const c = res.data;

            setTimeout(function () {
              setCharacters(c.data);
              setTotalPages(c.totalPages);
              setIsLoading(false);
            }, 1000);
          })
          .catch((err) => console.log(err));
      }
    }
  }, [all, currentPage, searchInput]);

  useEffect(() => {
    if (!all) {
      const filterFavorites =
        searchInput.length > 0
          ? favorites.filter((f) =>
              f.name.toLowerCase().includes(searchInput.toLowerCase())
            )
          : favorites;
      setCharacters(
        filterFavorites.slice((currentPage - 1) * 50, currentPage * 50)
      );
      setTotalPages(Math.ceil(filterFavorites.length / 50));
    }
  }, [all, currentPage, favorites, searchInput]);

  const onFavClick = useCallback(
    (character: ICharacter) => {
      const alreadyInFav = favorites.find((fav) => fav._id === character._id);
      if (alreadyInFav) {
        setFavorites((prev) => prev.filter((p) => p._id !== character._id));
      } else {
        setFavorites((prev) => {
          return [...prev, character];
        });
      }
    },
    [favorites]
  );

  return (
    <main className="container">
      <Link to={"/"}>
        <div className="flex">
          <h1 className="animate-in color-text">Disney</h1>
          <h1 className="animate-in">Characters</h1>
        </div>
      </Link>
      <div className="flex-left">
        <TopBar
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          all={all}
          setAll={setAll}
        />
      </div>
      {isLoading && (
        <>
          <img
            alt="loading"
            src="https://www.pngall.com/wp-content/uploads/2018/05/Disney-PNG.png"
            width={"150px"}
            style={{ marginTop: 50 }}
          />
          <h1>Loading...</h1>
        </>
      )}
      <div className="cards-container">
        {!isLoading && !all && favorites.length === 0 && (
          <NoFavoritesComponent />
        )}
        {!isLoading &&
          characters.map((character) => {
            const isFav = favorites.find((fav) => fav._id === character._id);
            return (
              <Card
                isFav={isFav ? true : false}
                onFavClick={onFavClick}
                key={character._id}
                character={character}
              />
            );
          })}
      </div>
      {!isLoading && totalPages > 1 && (
        <div className="paper">
          <Paginate
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
        </div>
      )}
    </main>
  );
};

export default Characters;
