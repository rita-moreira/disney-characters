import React, { useCallback, useEffect, useMemo, useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";

interface ICharacter {
  allies: string[];
  enemies: string[];
  films: string[];
  imageUrl: string;
  name: string;
  parkAttractions: string[];
  shortFilms: string[];
  url: string;
  videoGames: string[];
  _id: number;
}
interface Props {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
}
const Paginate: React.FC<Props> = ({
  currentPage,
  setCurrentPage,
  totalPages,
}) => {
  const handlePrevPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage((prev: number) => prev - 1);
    }
  }, [currentPage, setCurrentPage]);
  const handleNextPage = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage((prev: number) => prev + 1);
    }
  }, [currentPage, setCurrentPage, totalPages]);
  return (
    <>
      <svg
        onClick={handlePrevPage}
        width={16}
        height={16}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 19.5L8.25 12l7.5-7.5"
        />
      </svg>
      <h4>{currentPage}</h4>
      <svg
        onClick={handleNextPage}
        width={16}
        height={16}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.25 4.5l7.5 7.5-7.5 7.5"
        />
      </svg>
    </>
  );
};

const Characters = () => {
  const [characters, setCharacters] = useState<ICharacter[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  useEffect(() => {
    axios
      .get(`https://api.disneyapi.dev/characters?page=${currentPage}`)
      .then((res) => {
        const c = res.data;
        console.log(c);
        setCharacters(c.data);
        setTotalPages(c.totalPages);
      });
  }, [currentPage]);

  const onImageError = useCallback((id: number) => {
    const image: any = document.getElementById(id.toString());
    console.log("error", id, image);

    if (image) {
      image.src =
        "data:image/png;base64,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";
    }
  }, []);

  return (
    <main className="light container">
      <div className="flex">
        <h1 className="animate-in color-text">Disney</h1>
        <h1 className="animate-in">Characters</h1>
      </div>
      <div className="cards-container">
        {characters.map((character) => {
          return (
            <div className="card-container" key={character._id}>
              <div className="fav">
                <svg
                  width={"32px"}
                  height={"32px"}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                  />
                </svg>
              </div>
              <div className="card">
                <div className="card-header">
                  <img
                    id={character._id.toString()}
                    onError={() => onImageError(character._id)}
                    src={character.imageUrl}
                    alt={`${character.name}-${character._id}`}
                  />
                </div>
                <div className="card-body">
                  <h2>{character.name}</h2>
                </div>
              </div>
            </div>
          );
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