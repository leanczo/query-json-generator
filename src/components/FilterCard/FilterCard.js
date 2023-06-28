import React from "react";
import "./FilterCard.css"; // Importa los estilos específicos de FilterCard

const FilterCard = ({
  filters,
  setFilters,
  addFilter,
  removeFilter,
  handleValueChange,
}) => {
  return (
    <div className="filter-card">
      {" "}
      {/* Usar clase específica */}
      <h4 className="text-center">Filter</h4>
      {filters.map((filter, index) => (
        <div key={index}>
          <div className="filter-item-row">
            {" "}
            {/* Usar clase específica */}
            <label>
              {" "}
              {/* Usar clase específica */}
              Property Name{" "}
              <input
                className="form-control"
                type="text"
                placeholder="Enter property name"
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
            <label>
              {" "}
              {/* Usar clase específica */}
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
            <label>
              {" "}
              {/* Usar clase específica */}
              Value{" "}
              <input
                className="form-control"
                type="text"
                placeholder="Enter value"
                value={filter.value}
                onChange={(e) => handleValueChange(e, index)}
              />
            </label>
            <div className="filter-button-container">
              {" "}
              {/* Usar clase específica */}
              <button
                className="btn btn-danger"
                onClick={() => removeFilter(index)}
              >
                Remove
              </button>
            </div>
          </div>
          <hr className="filter-hr"></hr> {/* Usar clase específica */}
        </div>
      ))}
      <div>
        <button className="btn btn-dark" onClick={addFilter}>
          Add Filter
        </button>
      </div>
    </div>
  );
};

export default FilterCard;
