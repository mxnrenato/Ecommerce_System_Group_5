// ListArticulo.js

import React, { useEffect, useState, useMemo } from "react";
import { useTable, useSortBy } from "react-table";
import "./ListArticulo.css"; // Importamos el archivo CSS para el estilo
import { Link } from "react-router-dom"; // Importamos Link

const ListArticulo = () => {
  const [data, setData] = useState([]);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("https://api.plos.org/search?q=title:github");
      const jsonData = await response.json();
      setData(jsonData.response.docs);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Columnas para la tabla (sin la columna "Abstract")
  const columns = useMemo(
    () => [
    
      {
        Header: "Journal",
        accessor: "journal",
      },
      {
        Header: "EISSN",
        accessor: "eissn",
      },
      {
        Header: "Publication Date",
        accessor: "publication_date",
      },
      {
        Header: "Article Type",
        accessor: "article_type",
      },
      {
        Header: "Authors",
        accessor: "author_display",
        Cell: ({ value }) => value.join(", "),
      },
      {
        Header: "Title",
        accessor: "title_display",
      },
      {
        Header: "Score",
        accessor: "score",
      },
      {
        Header: "Expand", // Usamos un identificador único para la columna Expand
        accessor: "expand",
        Cell: ({ row }) => (
          // Utilizamos Link en lugar de un botón para redirigir a la página "AbstractPage"
          <Link to={`/Abstract/${encodeURIComponent(row.original.id)}`} className="expand-btn">
            {expandedId === row.original.id ? "Hide Abstract" : "Resumen"}
          </Link>
        ),
      },
    ],
    [expandedId]
  );

  // Configuración de la tabla con funciones de ordenamiento
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data }, useSortBy);

  return (
    <div>
      <header>
        <h1>Documentos Científicos</h1>
      </header>
      <table {...getTableProps()} className="table">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  {/* Mostramos una flecha hacia arriba o hacia abajo para indicar el orden */}
                  {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <React.Fragment key={row.id}>
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>
                      {cell.column.Header === "Abstract" && expandedId === row.original.id ? (
                        // Mostramos el abstract solo si la columna es "Abstract" y el id está expandido
                        <div className="abstract-cell">
                          <strong>Abstract: </strong>
                          {row.original.abstract}
                        </div>
                      ) : cell.column.Header === "Expand" ? (
                        // Renderizamos el enlace al abstract con el id codificado en la URL
                        cell.render("Cell")
                      ) : (
                        cell.render("Cell")
                      )}
                    </td>
                  ))}
                </tr>
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ListArticulo;
