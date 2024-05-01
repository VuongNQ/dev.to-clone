import { ButtonChildren } from './InterfaceButton';
import React from 'react';
import classNames from 'classnames/bind';
import styles from './button.module.scss';

const cx = classNames.bind(styles);

const Button : React.FC<ButtonChildren> = ({variant, Follow, tagButton, followTag, hideTag ,fontWeight , headerButton , OceanBlue, green , yellow , title ,pink , to , outline , onClick, children}) => {
    const classes = cx('wrapper', {
        variant,
        fontWeight,
        tagButton,
        pink,
        Follow,
        followTag,
        hideTag,
        OceanBlue,
        yellow,
        headerButton,
        green,
        title,
        outline,
        to
    });
    return (
        <button className={classes} title={title} onClick={onClick}>{children}</button>
    )
}

export default Button;
