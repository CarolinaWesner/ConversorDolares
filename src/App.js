import "./App.css";
import { useRef, useState, useEffect } from "react";

function App() {
  const [valorCambio, setValorCambio] = useState(null);
  const pesosRef = useRef(); //se guardara lo que ingresa el usuario
  const resultadoRef = useRef();
  useEffect(() => {
    const llamarApi = async () => {
      try {
        const respuesta = await fetch(
          "https://dolarapi.com/v1/dolares/oficial"
        );
        const datos = await respuesta.json();

        setValorCambio(datos.compra);
      } catch (error) {
        console.log("Error", error);
      }
    };
    llamarApi();
  }, []);

  const calcular = () => {
    const pesosValor = parseFloat(pesosRef.current.value);
    const dolares = pesosValor * valorCambio;
    resultadoRef.current.innerHTML = dolares.toFixed(2) + " $";
  };

  return (
    <div>
      <h1>Conversor de dólares a pesos</h1>
      <input className="centrarElementos" type="text" ref={pesosRef}></input>
      <button className="centrarElementos" onClick={calcular}>
        Convertir
      </button>
      <div className="centrarElementos resultado" ref={resultadoRef}>
        {" "}
      </div>
    </div>
  );
}

export default App;

