import React, { ButtonHTMLAttributes } from 'react';

import {useHistory} from 'react-router-dom';

export interface ButtonLinkProps extends ButtonHTMLAttributes<Element>{
    to: string;
    state?: Record<string, unknown>
}

export const ButtonLink: React.FC<React.PropsWithChildren<ButtonLinkProps>> = (props) =>{
    const {to, state, children} = props;
    const historyAPI = useHistory();
    const handleClick = () => historyAPI.push(to, state)
    return (
        <button onClick={handleClick}{...props}>{children}</button>
    )
}