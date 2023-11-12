import { Dispatch, SetStateAction, useEffect, useState } from "react";

export default function Pagination({
    pageCount,
    currentPage,
    onChangePage,
}: {
    pageCount: number;
    currentPage: number;
    onChangePage: (page: number) => void;
}) {
    return (
        <div className="join">
            {Array(pageCount)
                .fill(0)
                .map((_page, index) => {
                    return (
                        <button
                            key={index}
                            className={`join-item btn ${index + 1 == currentPage && "btn-active"}`}
                            onClick={() => onChangePage(index + 1)}
                        >
                            {index + 1}
                        </button>
                    );
                })}
        </div>
    );
}
