import React from "react";

const FilterCard = ({ filters, setFilters, addFilter, removeFilter, handleValueChange }) => {
  return (
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
  );
};

export default FilterCard;
