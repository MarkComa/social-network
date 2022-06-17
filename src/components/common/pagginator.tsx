import React from "react";
import style from "../blocks/pagination.module.css";

type Props = {
	totalUsersCount: number;
	pageSize: number;
  currentPage: number;
  onPageChanged: (pageNumber: number) => void
};

const Pagination = ({ totalUsersCount, pageSize, currentPage, onPageChanged }: Props) => {
	const pageCount = Math.ceil(totalUsersCount / pageSize);
	const pages = [];
	for (let i = 1; i <= pageCount; i++) {
		pages.push(i);
	}

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
								onPageChanged(p);
							}}>
							{p}
						</button>
					);
				}
			})}
		</div>
	);
};

export default Pagination;
