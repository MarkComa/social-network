import React from "react";
import style from "../blocks/pagination.module.css";

const Pagination = (props) => {
  const pageCount = Math.ceil(props.totalUsersCount / props.pageSize);
  const pages = [];
  for (let i = 1; i <= pageCount; i++) {
    pages.push(i);
  }

  const currentPage = props.currentPage;

  return (
    <div className={style.center}>
      {pages.map((p) => {
        if (
          (p < currentPage + 3 && p > currentPage - 3) ||
          p === 1 ||
          p === pages.length
        ) {
          return (
            <button
              className={style.btn__page}
              key={p}
              onClick={() => {
                props.onPageChanged(p);
              }}
            >
              {p}
            </button>
          )
        }
      })}

    
    </div>
  );
};

export default Pagination;
