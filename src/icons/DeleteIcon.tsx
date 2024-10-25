import React, {FC} from 'react';

interface IDeleteTaskIconProps {
    classname: string;
    fill: string;
}

const DeleteIcon: FC<IDeleteTaskIconProps> = ({classname, fill}) => {
    return (
        <svg className={classname} width="11" height="12" viewBox="0 0 11 12" fill="none"
             xmlns="http://www.w3.org/2000/svg">
            <path
                d="M2 12C1.63333 12 1.31956 11.8696 1.05867 11.6087C0.797778 11.3478 0.667111 11.0338 0.666667 10.6667V2H0V0.666667H3.33333V0H7.33333V0.666667H10.6667V2H10V10.6667C10 11.0333 9.86956 11.3473 9.60867 11.6087C9.34778 11.87 9.03378 12.0004 8.66667 12H2ZM8.66667 2H2V10.6667H8.66667V2ZM3.33333 9.33333H4.66667V3.33333H3.33333V9.33333ZM6 9.33333H7.33333V3.33333H6V9.33333Z"
                fill={fill}/>
        </svg>
    );
};

export default DeleteIcon;
