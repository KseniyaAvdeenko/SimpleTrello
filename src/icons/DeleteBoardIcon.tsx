import React, {FC, MouseEvent} from 'react';
import {IBoard} from "../interface/IBoard";
import {useAppDispatch} from "../hooks/useAppDispatch";
import {deleteBoard} from "../store/actions/boardAction";


const DeleteBoardIcon: FC<{classname: string,  board: IBoard}> = ({classname, board}) => {
    const dispatch = useAppDispatch();
    const onClickHandler = (e: MouseEvent<SVGSVGElement>)=>{
        e.preventDefault();
        dispatch(deleteBoard(board))
    }

    return (
        <svg className={classname} onClick={e=>onClickHandler(e)} width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g opacity="0.05" filter="url(#filter0_b_349_197)">
                <rect width="13" height="14" rx="2" fill="#ffffff"/>
            </g>
            <path
                d="M2.66667 11.6667C2.66667 12.0203 2.80714 12.3594 3.05719 12.6095C3.30724 12.8595 3.64638 13 4 13H9.33333C9.68696 13 10.0261 12.8595 10.2761 12.6095C10.5262 12.3594 10.6667 12.0203 10.6667 11.6667V3.66667H2.66667V11.6667ZM4 5H9.33333V11.6667H4V5ZM9 1.66667L8.33333 1H5L4.33333 1.66667H2V3H11.3333V1.66667H9Z"
                fill="#1E1E1E"/>
            <defs>
                <filter id="filter0_b_349_197" x="-100" y="-100" width="213" height="214" filterUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                    <feGaussianBlur in="BackgroundImageFix" stdDeviation="50"/>
                    <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_349_197"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_349_197" result="shape"/>
                </filter>
            </defs>
        </svg>
    );
};

export default DeleteBoardIcon;
