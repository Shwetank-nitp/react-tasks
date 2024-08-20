import { useEffect, useMemo, useState } from "react";
import "./App.css";
import Card from "./components/Card/Card";

function App() {
  const [totalParts, setTotalParts] = useState(0);
  const maxPartsInSector = 3;
  let totalSector = useMemo(
    () => Math.ceil(totalParts / maxPartsInSector),
    [totalParts, maxPartsInSector]
  );
  const limit = 0;
  const [page, setPage] = useState({
    current: 1,
    currentSector: 1,
  });
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const controller = new AbortController();
    fetch(
      `https://dummyjson.com/products?limit=${limit}&skip=${
        limit * (page.current - 1)
      }&select=title,price`,
      { signal: controller.signal }
    )
      .then((res) => res.json())
      .then((data) => {
        setTotalParts(Math.ceil(data.total / (limit || data.total)));
        setProducts(data.products);
      })
      .catch((e) => console.log(e));
    return () => {
      controller.abort("page-change");
    };
  }, [page.current]);
  const handlePageChange = (e) => {
    if (e.target.name === "<") {
      setPage({
        current: (page.currentSector - 2) * maxPartsInSector + 1,
        currentSector: page.currentSector - 1,
      });
      return;
    }
    if (e.target.name === ">") {
      setPage({
        current: maxPartsInSector * page.currentSector + 1,
        currentSector: page.currentSector + 1,
      });
      return;
    }
    if (e.target.name === ">>") {
      setPage({ current: totalParts, currentSector: totalSector });
      return;
    }
    if (e.target.name === "<<") {
      setPage({ current: 1, currentSector: 1 });
      return;
    }
    setPage({
      current: Number(e.target.name),
      currentSector: page.currentSector,
    });
  };

  return (
    <>
      <div className="hero">
        {products.map((item, index) => (
          <Card key={index} cardData={item} />
        ))}
      </div>
      <div className="pagination">
        {page.currentSector != 1 && (
          <button name="<<" onClick={handlePageChange} className="pag-btn">
            {"<<"}
          </button>
        )}
        {page.currentSector != 1 && (
          <button name="<" onClick={handlePageChange} className="pag-btn">
            {"<"}
          </button>
        )}

        {[
          ...Array(
            maxPartsInSector * page.currentSector > totalParts
              ? totalParts - maxPartsInSector * (page.currentSector - 1)
              : maxPartsInSector
          ),
        ].map((_, index) => {
          const number =
            index + 1 + (page.currentSector - 1) * maxPartsInSector;

          return (
            <button
              style={number === page.current ? { backgroundColor: "red" } : {}}
              onClick={handlePageChange}
              name={number.toString()}
              key={index}
              className="pag-btn"
            >
              {number}
            </button>
          );
        })}
        {page.currentSector != totalSector && (
          <button name=">" onClick={handlePageChange} className="pag-btn">
            {">"}
          </button>
        )}
        {page.currentSector != totalSector && (
          <button name=">>" onClick={handlePageChange} className="pag-btn">
            {">>"}
          </button>
        )}
      </div>
    </>
  );
}

export default App;
