import React from "react";
import { useState } from "react";

export const WheaterApp = () => {
  const urlBase = "https://api.openweathermap.org/data/2.5/weather";
  const API_KEY = "10cdc5c13bb48306cd570d7270b48ae4";
  const idioma = "es";
  const celsius = "metric";

  ////-------------estado del input ciudad empieza vacio---------------------
  const [ciudad, setCiudad] = useState("");
  const [dataClima, setDataClima] = useState(null);

  ////-------------Obtengo la ciudad q esta en el input---------------------
  const handleCambioCiudad = ({ target }) => {
    setCiudad(target.value);
  };
  ////-------------Si no hay nada escrito no seejecuta la funcion---------------------
  const onSubmit = (event) => {
    event.preventDefault();
    if (ciudad.length > 0) {
      fetchClima();
    }
  };

  ////-------------Obtengo la ciudad q esta en el input---------------------
  const fetchClima = async () => {
    try {
      const response = await fetch(`${urlBase}?q=${ciudad}&appid=${API_KEY}&units=${celsius}&lang=${idioma}`);
      const data = await response.json();
      setDataClima(data);
    } catch (error) {
      console.error("Ocurrio el siguiente problema", error);
    }
  };

  return (
    <>
      <div className="container">
        <h1>WheaterApp</h1>;
        <form onSubmit={onSubmit}>
          <input type="text" value={ciudad} onChange={handleCambioCiudad} />
          <button type="submit">Buscar</button>
        </form>
        {dataClima && (
          <div>
            <h2>{dataClima.name}</h2>
            <p>Temperatura: {parseInt(dataClima?.main?.temp)}°C</p>
            <p>Condicion: {dataClima.weather[0].description}</p>
            <img src={`https://openweathermap.org/img/wn/${dataClima.weather[0].icon}@2x.png`} />
          </div>
        )}
      </div>
    </>
  );
};
