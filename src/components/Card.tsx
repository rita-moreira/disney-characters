import React, { useCallback } from "react";
import { ICharacter } from "../interfaces";
import { DEFAULT_DISNEY_IMAGE } from "../constants";

interface props {
  character: ICharacter
  onFavClick: (character: ICharacter) => void
  isFav: boolean
}
const Card: React.FC<props> = ({ character, onFavClick, isFav }) => {
  const onImageError = useCallback((id: number) => {
    const image: any = document.getElementById(id.toString());
    console.log("error", id, image);

    if (image) {
      image.src = DEFAULT_DISNEY_IMAGE
    }
  }, []);
  return (
    <div className="card-container animate-in" key={character._id}>
      <div className={isFav ? "fav fav-selected" : 'fav'} onClick={() => onFavClick(character)}>
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
};

export default Card;
