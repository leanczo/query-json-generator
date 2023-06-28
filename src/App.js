import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import SortCard from "./components/SortCard/SortCard";
import FilterCard from "./components/FilterCard/FilterCard";
import JsonComponent from "./components/JsonComponent/JsonComponent";
import Base64Card from "./components/Base64Card/Base64Card";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const notify = () =>
    toast.success("Copied!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
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

  const handleValueChange = (e, index) => {
    let value = e.target.value;

    // Intente convertir el valor en un número
    if (!isNaN(value) && value.trim() !== "") {
      value = Number(value);
    } else if (
      value.toLowerCase() === "true" ||
      value.toLowerCase() === "false"
    ) {
      // Si el valor es "true" o "false" (en cualquier caso), conviértalo en un booleano
      value = value.toLowerCase() === "true";
    }

    // Actualizar el estado de los filtros
    setFilters(
      filters.map((f, i) => (i === index ? { ...f, value: value } : f))
    );
  };

  const copyToClipboard = () => {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(jsonResult)
        .then(() => {
          notify(true);
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
        <h2 className="title">JSON Query Builder</h2>
        <div className="grid-wrapper">
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
          <div className="button-app-container">
            <button className="btn btn-dark btn-lg" onClick={generateJSON}>
              Generate JSON
            </button>
          </div>
          <JsonComponent
            jsonResult={jsonResult}
            copyToClipboard={copyToClipboard}
            generateJSON={generateJSON}
          />
          <Base64Card />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default App;
