import React from "react";

const SortCard = ({ sorts, setSorts, addSort, removeSort }) => {
  return (
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
                        i === index ? { ...s, propertyName: e.target.value } : s
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
              <button className="btn btn-danger" onClick={() => removeSort(index)}>
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
  );
};

export default SortCard;
