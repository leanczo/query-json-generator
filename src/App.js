import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

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
      <div className=" container">
        <h1>JSON Query Builder</h1>

        <div className="card">
          <h3>Sort Criteria</h3>
          {sorts.map((sort, index) => (
            <div key={index}>
              <div className="item-row">
                <div>
                  <label className="title-input">
                    Property Name{" "}
                    <input
                      className="form-control"
                      type="text"
                      value={sort.propertyName}
                      onChange={(e) =>
                        setSorts(
                          sorts.map((s, i) =>
                            i === index
                              ? { ...s, propertyName: e.target.value }
                              : s
                          )
                        )
                      }
                    />
                  </label>
                  <label className="descending-label">Descending </label>
                  <input
                    type="checkbox"
                    checked={sort.descending}
                    onChange={(e) =>
                      setSorts(
                        sorts.map((s, i) =>
                          i === index
                            ? { ...s, descending: e.target.checked }
                            : s
                        )
                      )
                    }
                  />
                </div>

                <div className="button-container">
                  <button
                    className="btn btn-danger"
                    onClick={() => removeSort(index)}
                  >
                    Remove
                  </button>
                </div>
              </div>
              <hr className="solid"></hr>
            </div>
          ))}
          <div>
            <button className="btn btn-primary" onClick={addSort}>
              Add Sort Criterion
            </button>
          </div>
        </div>

        <div className="card">
          <h3>Filter Criteria</h3>
          {filters.map((filter, index) => (
            <div key={index}>
              <div className="item-row">
                <label>
                  Property Name{" "}
                  <input
                    className="form-control"
                    type="text"
                    value={filter.propertyName}
                    onChange={(e) =>
                      setFilters(
                        filters.map((f, i) =>
                          i === index
                            ? { ...f, propertyName: e.target.value }
                            : f
                        )
                      )
                    }
                  />
                </label>
                <br />
                <label>
                  Type{" "}
                  <select
                    className="form-select"
                    value={filter.type}
                    onChange={(e) =>
                      setFilters(
                        filters.map((f, i) =>
                          i === index ? { ...f, type: e.target.value } : f
                        )
                      )
                    }
                  >
                    <option value="eq">Equal</option>
                    <option value="neq">NotEquals</option>
                    <option value="gt">GreaterThan</option>
                    <option value="lt">LowerThan</option>
                    <option value="gte">GreaterThanEquals</option>
                    <option value="lte">LowerThanEquals</option>
                    <option value="like">Like</option>
                    <option value="between">Between</option>
                    <option value="contains">Contains</option>
                  </select>
                </label>
                <br />
                <label>
                  Value{" "}
                  <input
                    className="form-control"
                    type="text"
                    value={filter.value}
                    onChange={(e) => handleValueChange(e, index)}
                  />
                </label>
                <div className="button-container">
                  <button
                    className="btn btn-danger"
                    onClick={() => removeFilter(index)}
                  >
                    Remove
                  </button>
                </div>
                <br />
              </div>
              <hr className="solid" />
            </div>
          ))}
          <div>
            <button className="btn btn-primary" onClick={addFilter}>
              Add Filter Criterion
            </button>
          </div>
        </div>

        <div className="card">
          <div>
            <button className="btn btn-success" onClick={generateJSON}>
              Generate JSON
            </button>
            <button
              className="btn btn-success clip-container"
              onClick={copyToClipboard}
            >
            <h className="copy-label">Copy</h>
            </button>
            {copySuccess ? (
              <div className="copy-success">Copied to clipboard!</div>
            ) : null}
          </div>
          <div>
            <textarea className="form-control json-output" value={jsonResult} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
