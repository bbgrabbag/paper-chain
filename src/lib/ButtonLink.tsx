import React, { ButtonHTMLAttributes } from 'react';
import {Button, ButtonProps} from 'theme-ui';

import {useHistory} from 'react-router-dom';

export interface ButtonLinkProps extends ButtonHTMLAttributes<Element>{
    to: string;
    state?: Record<string, unknown>
}

export const ButtonLink: React.FC<React.PropsWithChildren<ButtonLinkProps & ButtonProps>> = (props) =>{
    const {to, state, children} = props;
    const historyAPI = useHistory();
    const handleClick = () => historyAPI.push(to, state)
    return (
        <Button onClick={handleClick}{...props}>{children}</Button>
    )
}