import React from "react";

const Paginator = ({ link, currentPage, totalPages }) => (
  <div className="paginator">
    {currentPage > 1 && (
      <>
        <a className="paginator__first" href={`${link}?page=1`}>◀◀</a>
        <a className="paginator__prev" href={`${link}?page=${currentPage - 1}`}>◀</a>
      </>
    )}
    <span className="paginator__text">Page {currentPage} of {totalPages}</span>
    {currentPage < totalPages && (
      <>
        <a className="paginator__next" href={`${link}?page=${currentPage + 1}`}>▶</a>
        <a className="paginator__last" href={`${link}?page=${totalPages}`}>▶▶</a>
      </>
    )}
  </div>
);

export default Paginator;