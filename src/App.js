import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

const App = () => {
  const [sorts, setSorts] = useState([{ propertyName: "", descending: false }]);
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
    const queryCriteria = {
      Sorts: sorts,
      Filters: filters,
    };

    setJsonResult(JSON.stringify(queryCriteria, null, 2));
  };

  return (
    <div className="root">
      <h1>JSON Generator</h1>

      <div className="card">
        <h3>Sort Criteria</h3>
        {sorts.map((sort, index) => (
          <div>
            <div key={index} className="item-row">
              <div>
                <label className="title-input">
                  Property Name{" "}
                  <input
                    class="form-control"
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
                        i === index ? { ...s, descending: e.target.checked } : s
                      )
                    )
                  }
                />
              </div>

              <div className="button-container">
                <button
                  class="btn btn-danger"
                  onClick={() => removeSort(index)}
                >
                  Remove
                </button>
              </div>
            </div>
            <hr class="solid"></hr>
          </div>
        ))}
        <div>
          <button class="btn btn-primary" onClick={addSort}>
            Add Sort Criterion
          </button>
        </div>
      </div>


<div className="card">
        <h3>Filter Criteria</h3>
        {filters.map((filter, index) => (
          <div>
            <div key={index} className="item-row">
              <label>
                Property Name{" "}
                <input
                  className="form-control"
                  type="text"
                  value={filter.propertyName}
                  onChange={(e) =>
                    setFilters(
                      filters.map((f, i) =>
                        i === index ? { ...f, propertyName: e.target.value } : f
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
                  onChange={(e) =>
                    setFilters(
                      filters.map((f, i) =>
                        i === index ? { ...f, value: e.target.value } : f
                      )
                    )
                  }
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
          <button class="btn btn-primary" onClick={addFilter}>
            Add Filter Criterion
          </button>
        </div>
      </div>

      <div className="card">
        <div>
          <button class="btn btn-success" onClick={generateJSON}>
            Generate JSON
          </button>
        </div>

        <textarea readOnly className="json-output" value={jsonResult} />
      </div>
    </div>
  );
};

export default App;
