import React from "react";
import "./SortCard.css"; // Importa los estilos específicos de SortCard

const SortCard = ({ sorts, setSorts, addSort, removeSort }) => {
  return (
    <div className="sort-card"> {/* Usar clase específica */}
      <h4 className="text-center">Sort</h4>
      {sorts.map((sort, index) => (
        <div key={index}>
          <div className="sort-item-row"> {/* Usar clase específica */}
            <div>
              <label className="sort-title-input"> {/* Usar clase específica */}
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
              <label className="sort-descending-label">Descending </label> {/* Usar clase específica */}
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

            <div className="sort-button-container"> {/* Usar clase específica */}
              <button className="btn btn-danger" onClick={() => removeSort(index)}>
                Remove
              </button>
            </div>
          </div>
          <hr className="sort-hr"></hr> {/* Usar clase específica */}
        </div>
      ))}
      <div>
        <button className="btn btn-dark" onClick={addSort}>
          Add Sort
        </button>
      </div>
    </div>
  );
};

export default SortCard;
