import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ICharacter } from "../interfaces";
import axios from "axios";

const SingleCharacter = () => {
  const { characterId } = useParams();
  const [character, setCharacter] = useState<ICharacter | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (characterId) {
      setIsLoading(true);
      axios
        .get(`https://api.disneyapi.dev/characters/${characterId}`)
        .then((res) => {
          const c = res.data;

          setTimeout(function () {
            setCharacter(c);
            setIsLoading(false);
          }, 1000);
        })
        .catch(() => {
          setIsLoading(false);
          setError("Character not found!");
        });
    }
  }, [characterId, error]);

  if (isLoading) {
    return (
      <main className="container">
        <img
          alt="loading"
          src="https://www.pngall.com/wp-content/uploads/2018/05/Disney-PNG.png"
          width={"150px"}
          style={{ marginTop: 50 }}
        />
        <h1>Loading character...</h1>
      </main>
    );
  }

  if (error || !character) {
    return (
      <main className="container">
        <div style={{ marginTop: 50 }}>
          <h1 className="animate-in">{error}</h1>
        </div>
      </main>
    );
  }
  return (
    <main className="container">
      <Link  to={'/'}>
      <div className="flex">
        <h1 className="animate-in color-text">Disney</h1>
        <h1 className="animate-in">Characters</h1>
        </div>
        </Link>
      <div style={{ marginTop: 50 }}>
        <h1 className="animate-in">{character?.name}</h1>

        <img
          style={{ borderRadius: "50%", margin: 50, border: "2px solid white" }}
          width="200px"
          height="200px"
          src={character?.imageUrl}
        />
      </div>
      <div>
        <ul>
          {character.films.length > 0 && (
            <li className="li-paper">
              <div className="paper-box">
                <h2>films</h2>
                <ul>
                  {character.films.map((film) => {
                    return (
                      <li key={film}>
                        <p>{film}</p>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </li>
          )}
          {character.shortFilms.length > 0 && (
            <li className="li-paper">
              <div className="paper-box">
                <h2>short films</h2>
                <ul>
                  {character.shortFilms.map((film) => {
                    return (
                      <li key={film}>
                        <p>{film}</p>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </li>
          )}
          {character.tvShows.length > 0 && (
            <li className="li-paper">
              <div className="paper-box">
                <h2>tv shows</h2>
                <ul>
                  {character.tvShows.map((show) => {
                    return (
                      <li key={show}>
                        <p>{show}</p>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </li>
          )}
          {character.videoGames.length > 0 && (
            <li className="li-paper">
              <div className="paper-box">
                <h2>Videogames</h2>
                <ul>
                  {character.videoGames.map((game) => {
                    return (
                      <li key={game}>
                        <p>{game}</p>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </li>
          )}
          {character.parkAttractions.length > 0 && (
            <li className="li-paper">
              <div className="paper-box">
                <h2>Park Attractions</h2>
                <ul>
                  {character.parkAttractions.map((attraction) => {
                    return (
                      <li key={attraction}>
                        <p>{attraction}</p>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </li>
          )}
          {character.allies.length > 0 && (
            <li className="li-paper">
              <div className="paper-box">
                <h2>Allies</h2>
                <ul>
                  {character.allies.map((allie) => {
                    return (
                      <li key={allie}>
                        <p>{allie}</p>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </li>
          )}
          {character.enemies.length > 0 && (
            <li className="li-paper">
              <div className="paper-box">
                <h2>Enemies</h2>
                <ul>
                  {character.enemies.map((enemy) => {
                    return (
                      <li key={enemy}>
                        <p>{enemy}</p>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </li>
          )}
        </ul>
      </div>
    </main>
  );
};

export default SingleCharacter;
