import React, {FC} from 'react';

const CloseIcon: FC<{classname: string}> = ({classname}) => {
    return (
        <svg className={classname} width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L11 11M1 11L11 1"
                  stroke="#1E1E1E"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"/>
        </svg>
    );
};

export default CloseIcon;
