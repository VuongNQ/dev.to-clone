import { ButtonChildren } from './InterfaceButton';
import React from 'react';
import classNames from 'classnames/bind';
import styles from './button.module.scss';

const cx = classNames.bind(styles);

const Button : React.FC<ButtonChildren> = ({variant, to , outline , onClick, children}) => {
    const classes = cx('wrapper', {
        variant,
        outline,
        to
    });
    return (
        <button className={classes} onClick={onClick}>{children}</button>
    )
}

export default Button;
