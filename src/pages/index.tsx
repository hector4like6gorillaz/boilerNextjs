import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { envAPI } from "../app/components/ApiCall";
import Link from "next/link";

import HeaderFooterWraper from "../app/components/layout/InitWraper";
import {
  decrement,
  increment,
  selectCount,
} from "../app/components/ReduxSlices/counterSlice";
import { useAppDispatch, useAppSelector } from "../app/Reduxhooks";

import {
  CardPokemon,
  DivContainerPokemon,
  DivPokemonButton,
  PokemonA,
  PokemonButton,
  PokemonH2,
  PokemonImg,
  PokemonName,
  PokemonP,
} from "../styles/StyledInit";
import {
  DarkMode,
  handleMode,
} from "../app/components/ReduxSlices/CookiesSlice";

const dependencias = [
  `"@apollo/client": "^3.4.16"`,
  `"@reduxjs/toolkit": "^1.3.6"`,
  `"axios": "^0.24.0"`,
  `"js-cookie": "^3.0.1"`,
  `"next": "latest"`,
  `"react": "^17.0.2"`,
  `"react-dom": "^17.0.2"`,
  `"react-redux": "^7.2.0"`,
  `"styled-components": "^5.3.3"`,
];

const IndexPage: NextPage = () => {
  const dispatch = useAppDispatch();
  const count = useAppSelector(selectCount);
  const mode = useAppSelector(DarkMode);

  console.log(mode);
  const [Data, setData] = useState<any>();
  //This is the first page, can be Login

  //useEffect(() => {
  //  const press = () => router.push(`/home`);
  //  press();
  //  return () => {
  //    press();
  //  };
  //}, []);
  const response = async (page: string) => envAPI(page);
  async function loadapi() {
    const resp = await response(`pokemon/${count}/`);
    const data = resp?.data;
    setData(data);
  }

  useEffect(() => {
    loadapi();

    return function cleanup() {
      loadapi();
    };
  }, []);

  useEffect(() => {
    loadapi();
    return function cleanup() {
      loadapi();
    };
  }, [count]);

  return (
    <HeaderFooterWraper>
      {/*
    estas lineas son totalmente opcionales, aqui puedo colocar un loggin
    o algo distinto si lo requiero, el useEffect es el que ayudara a leer 
    los tokens en caso de existir, y en caso "de" hacer un algo, ya sea redirigir
    al home o lo que requiera la app, por el momento solo entra aqui y con las mismas
    redirige a "/home" a modo de conservar el las rutas, por el momento a modo de boiler
    utilizando la api de pokemon de manera simple mostrare la info de charmander
    con axios en este efecto

    git remote add origin https://github.com/hector4like6gorillaz/boilerNextjs.git
    git branch -M main
    git push -u origin main
    */}
      <DivContainerPokemon>
        <PokemonH2>
          Este es un boilerplate con Nextjs y la api de pokemon
        </PokemonH2>
        <CardPokemon onClick={() => dispatch(handleMode(!mode))}>
          <PokemonImg alt="Imagen pokemon" src={Data?.sprites.front_default} />
          <PokemonName>{Data?.name}</PokemonName>
        </CardPokemon>
        <DivPokemonButton>
          {count === 1 ? (
            <PokemonButton disabled>Prev</PokemonButton>
          ) : (
            <PokemonButton onClick={() => dispatch(decrement())}>
              Prev
            </PokemonButton>
          )}
          <PokemonButton onClick={() => dispatch(increment())}>
            Next
          </PokemonButton>
        </DivPokemonButton>
        <DivPokemonButton>
          <Link href="/counter">
            <PokemonA>Counter</PokemonA>
          </Link>
          <Link href="/home">
            <PokemonA>Home</PokemonA>
          </Link>
        </DivPokemonButton>
        <PokemonP>
          Este boilerplate contiene las siguientes dependencias como base:
        </PokemonP>
        {dependencias.map((item, index) => {
          return <PokemonP key={index}>{item}</PokemonP>;
        })}
      </DivContainerPokemon>
    </HeaderFooterWraper>
  );
};

export default IndexPage;
