import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import SortCard from './components/SortCard';
import FilterCard from './components/FilterCard';
import JsonComponent from './components/JsonComponent/JsonComponent';
import Base64Card from './components/Base64Card';

const App = () => {
  const [sorts, setSorts] = useState([]);
  const [filters, setFilters] = useState([
    { propertyName: "", type: "eq", value: "" },
  ]);
  const [jsonResult, setJsonResult] = useState("");

  const addSort = () => {
    setSorts([...sorts, { propertyName: "", descending: false }]);
  };

  const removeSort = (index) => {
    setSorts(sorts.filter((_, i) => i !== index));
  };

  const addFilter = () => {
    setFilters([...filters, { propertyName: "", type: "eq", value: "" }]);
  };

  const removeFilter = (index) => {
    setFilters(filters.filter((_, i) => i !== index));
  };

  const generateJSON = () => {
    // Filtra los sorts y filters que tienen un propertyName antes de generar el JSON
    const validSorts = sorts.filter((sort) => sort.propertyName.trim() !== "");
    const validFilters = filters.filter(
      (filter) => filter.propertyName.trim() !== ""
    );

    const queryCriteria = {};

    if (validSorts.length > 0) {
      queryCriteria.Sorts = validSorts;
    }

    if (validFilters.length > 0) {
      queryCriteria.Filters = validFilters;
    }

    setJsonResult(JSON.stringify(queryCriteria, null, 2));
  };

  const [copySuccess, setCopySuccess] = useState(false);

  const handleValueChange = (e, index) => {
    let value = e.target.value;
  
    // Intente convertir el valor en un número
    if (!isNaN(value) && value.trim() !== "") {
      value = Number(value);
    } else if (value.toLowerCase() === "true" || value.toLowerCase() === "false") {
      // Si el valor es "true" o "false" (en cualquier caso), conviértalo en un booleano
      value = value.toLowerCase() === "true";
    }
  
    // Actualizar el estado de los filtros
    setFilters(filters.map((f, i) => (i === index ? { ...f, value: value } : f)));
  };

  const copyToClipboard = () => {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(jsonResult)
        .then(() => {
          // Cambia el valor de copySuccess a true cuando el texto se haya copiado con éxito
          setCopySuccess(true);

          // Opcional: Restablece el mensaje después de 2 segundos
          setTimeout(() => {
            setCopySuccess(false);
          }, 2000);
        })
        .catch((err) => {
          console.error("Error al copiar texto al portapapeles", err);
        });
    } else {
      console.error("La API del portapapeles no está disponible");
    }
  };

  return (
    <div className="root">
      <div className="container">
        <h1>JSON Query Builder</h1>
        <SortCard
          sorts={sorts}
          setSorts={setSorts}
          addSort={addSort}
          removeSort={removeSort}
        />
        <FilterCard
          filters={filters}
          setFilters={setFilters}
          addFilter={addFilter}
          removeFilter={removeFilter}
          handleValueChange={handleValueChange}
        />
     <JsonComponent
        jsonResult={jsonResult}
        copyToClipboard={copyToClipboard}
        copySuccess={copySuccess}
        generateJSON={generateJSON}
      />
        <Base64Card />
      </div>
    </div>
  );
};

export default App;
