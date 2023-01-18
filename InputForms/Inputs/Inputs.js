import { useEffect, useState } from 'react';
import style from '../forms.module.scss';
import { icons } from '../icons/icons';

const theme = {
    standard: style.input_block,
    whiteFill: style.white_fill,
    whiteBorder: style.white_border,
    bottomBordered: style.bot_border,
    rounded: style.rounded,
};

const errorTheme = {
    standard: style.error,
    white: style.error_white,
    flat: style.error_flat,
    rounded_flat: style.error_rounded_flat,
};

export function InputEmail(props) {
    const icon = {
        error: icons.error,
        agree: icons.agree,
    };
    if (props.error_1) {
        icon.error = icons.error_1;
    }
    return (
        <div className={style.input_block_out}>
            <div className={theme[props.theme ? props.theme : 'standard']}>
                <input
                    className={`
             ${style.input}
             ${props.error ? style.input_error : ''}
             ${props.correct ? style.input_correct : ''}
             ${props.className}
            `}
                    type='email'
                    onChange={props.onChange}
                    value={props.value}
                    id={
                        props.emailFormID
                            ? props.emailFormID + 'email'
                            : 'email'
                    }
                    name='email'
                    style={{
                        backgroundColor: props.bg_color,
                        color: props.color,
                    }}
                    placeholder={props.placeholder || 'Email *'}
                />
                {props.anotherPlace ? (
                    <AddingPlaceholder
                        text={props.anotherPlace || 'Email *'}
                        value={props.value}
                    />
                ) : (
                    ''
                )}
                {props.noIcons ? (
                    ''
                ) : (
                    <div className={style.error_icon}>
                        {props.error
                            ? icon.error
                            : props.value === ''
                            ? ''
                            : icon.agree}
                    </div>
                )}
            </div>
            <div
                className={
                    errorTheme[props.errorTheme ? props.errorTheme : 'standard']
                }
            >
                {props.error}
            </div>
        </div>
    );
}

export function InputCall(props) {
    const icon = {
        error: icons.error,
        agree: icons.agree,
    };
    if (props.error_1) {
        icon.error = icons.error_1;
    }
    return (
        <div className={style.input_block_out}>
            <div className={theme[props.theme ? props.theme : 'standard']}>
                <input
                    minLength='5'
                    maxLength='30'
                    className={`
            ${style.input}
            ${props.error ? style.input_error : ''}
            ${props.correct ? style.input_correct : ''}
            ${props.className}
           `}
                    type='tel'
                    id={
                        props.phoneFormID
                            ? props.phoneFormID + 'phoneNumber'
                            : 'phoneNumber'
                    }
                    name='phoneNumber'
                    placeholder={props.placeholder || 'Phone number *'}
                    style={{
                        backgroundColor: props.bg_color,
                        color: props.color,
                    }}
                    onChange={props.onChange}
                    value={props.value}
                />
                {props.anotherPlace ? (
                    <AddingPlaceholder
                        text={props.anotherPlace || 'Phone number *'}
                        value={props.value}
                    />
                ) : (
                    ''
                )}
                {props.noIcons ? (
                    ''
                ) : (
                    <div className={style.error_icon}>
                        {props.error
                            ? icon.error
                            : props.value === ''
                            ? ''
                            : icon.agree}
                    </div>
                )}
            </div>
            <div
                className={
                    errorTheme[props.errorTheme ? props.errorTheme : 'standard']
                }
            >
                {props.error}
            </div>
        </div>
    );
}

export function InputName(props) {
    const icon = {
        error: icons.error,
        agree: icons.agree,
    };
    if (props.error_1) {
        icon.error = icons.error_1;
    }

    return (
        <div className={style.input_block_out}>
            <div className={theme[props.theme ? props.theme : 'standard']}>
                <input
                    maxLength='30'
                    className={`
            ${style.input}
            ${props.error ? style.input_error : ''}
            ${props.correct ? style.input_correct : ''}
            ${props.className}
          `}
                    style={{
                        backgroundColor: props.bg_color,
                        color: props.color,
                    }}
                    id={props.nameFormID ? props.nameFormID + 'name' : 'name'}
                    name='name'
                    type='name'
                    placeholder={props.placeholder || 'Name *'}
                    onChange={props.onChange}
                    value={props.value}
                />
                {props.anotherPlace ? (
                    <AddingPlaceholder
                        text={props.anotherPlace || 'Name *'}
                        value={props.value}
                    />
                ) : (
                    ''
                )}
                {props.noIcons ? (
                    ''
                ) : (
                    <div className={style.error_icon}>
                        {props.error
                            ? icon.error
                            : props.value === ''
                            ? ''
                            : icon.agree}
                    </div>
                )}
            </div>
            <div
                className={
                    errorTheme[props.errorTheme ? props.errorTheme : 'standard']
                }
            >
                {props.error}
            </div>
        </div>
    );
}

export function DropDownList(props) {
    const [listIsActive, changeListActivity] = useState(false);
    const [listTitle, changeListTitle] = useState('');

    function onItemClick(item, name, index) {
        let itemData = {
            myIndex: index,
            myName: name,
            myItem: item,
        };
        props.onClick(itemData);
        changeListTitle(name);
        changeListActivity(!listIsActive);
    }

    return (
        <>
            {listIsActive ? (
                <div
                    className={style.dropdownlist__close_block}
                    onClick={() => {
                        changeListActivity(false);
                    }}
                ></div>
            ) : (
                ''
            )}
            <div className={style.input_block_out}>
                <div
                    className={`
        ${style.dropdownlist} 
        ${listIsActive ? style.dropdownlist_active : ''}
        ${props.error ? style.dropdownlist_error : ''}
        ${props.correct ? style.dropdownlist_correct : ''}
        ${props.className}
        `}
                >
                    <div
                        className={style.dropdownlist_title_out}
                        onClick={() => {
                            changeListActivity(!listIsActive);
                        }}
                    >
                        <p className={style.dropdownlist_title}>
                            {listTitle ? listTitle : props.title}
                        </p>
                        <Arrow active={listIsActive} />
                    </div>
                    <ul className={style.dropdownlist_list}>
                        {props.data.map((item, index) => (
                            <li
                                key={index}
                                className={`${style.dropdownlist_item} ${
                                    listTitle === item.name
                                        ? style.dropdownlist_item_active
                                        : ''
                                }`}
                                onClick={() => {
                                    onItemClick(item, item.name, index);
                                }}
                            >
                                {item.name}
                            </li>
                        ))}
                    </ul>
                    <input
                        className={`
            ${style.radioBox}
           `}
                        defaultChecked
                        name={props.value ? props.value : listTitle}
                        type='radio'
                        id={props.id}
                        value={props.value ? props.value : listTitle}
                    />
                </div>
                <div
                    className={
                        errorTheme[
                            props.errorTheme ? props.errorTheme : 'standard'
                        ]
                    }
                >
                    {props.error}
                </div>
            </div>
        </>
    );
}
export function CheckBox(props) {
    function onItemClick() {
        props.onClick();
    }
    return (
        <>
            <div className={style.input_block_out} onClick={onItemClick}>
                <div
                    className={`
        ${style.checkbox} 
        ${props.error ? style.checkbox_error : ''}
        ${props.correct ? style.checkbox_correct : ''}
        ${props.className}
        `}
                >
                    <div className={style.checkbox__square}>
                        {props.active ? <CheckBoxArrow /> : ''}
                    </div>
                    <p className={style.checkbox_title}>{props.title}</p>
                    <input
                        className={`
            ${style.checkbox__input}
           `}
                        name={props.title}
                        type='checkbox'
                        checked={props.active}
                        onChange={onItemClick}
                        id={props.id ? props.id + 'checkBox' : 'checkBox'}
                        value={props.title}
                    />
                </div>
            </div>
        </>
    );
}

function Arrow(props) {
    return (
        <svg
            width='12'
            height='8'
            viewBox='0 0 12 8'
            fill='none'
            className={`${style.arrow} ${
                props.active ? style.arrow_active : ''
            }`}
        >
            <path
                d='M1.41 0.589844L6 5.16984L10.59 0.589844L12 1.99984L6 7.99984L0 1.99984L1.41 0.589844Z'
                fill='white'
            />
        </svg>
    );
}
function CheckBoxArrow(props) {
    return (
        <svg
            width='18'
            height='14'
            viewBox='0 0 18 14'
            fill='none'
            className={`
      ${style.checkbox_arrow} 
      ${props.active ? style.checkbox_arrow_active : ''}
      `}
        >
            <path
                d='M5.99967 11.1698L1.82967 6.99984L0.409668 8.40984L5.99967 13.9998L17.9997 1.99984L16.5897 0.589844L5.99967 11.1698Z'
                fill='white'
            />
        </svg>
    );
}
function AddingPlaceholder(props) {
    return (
        <p
            className={`${style.placeholder} 
      ${props.value ? style.placeholder_active : ''}`}
        >
            {props.text}
        </p>
    );
}

export function Input(props) {
    const icon = {
        error: icons.error,
        agree: icons.agree,
    };
    if (props.error_1) {
        icon.error = icons.error_1;
    }
    // error_1={true}
    // error={howYouDetectTrueError}
    // correct={howYouDetectTrueError}
    // className={className}
    // theme=""
    // type="type"
    // onChange={onChange}
    // value={value}
    // id={id}
    // name="name"
    // noPlace={true}
    // anotherPlace={true}
    // noIcons={true}
    // errorTheme=""
    return (
        <div className={style.input_block_out}>
            <div className={theme[props.theme ? props.theme : 'standard']}>
                <input
                    className={`
             ${style.input}
             ${props.error ? style.input_error : ''}
             ${props.correct ? style.input_correct : ''}
             ${props.className}
            `}
                    style={
                        props.uppercase ? { textTransform: 'uppercase' } : null
                    }
                    type={props.type}
                    onChange={props.onChange}
                    value={props.value}
                    id={props.id}
                    name={props.name}
                    placeholder={props.noPlace ? '' : props.placeholder}
                />
                {props.anotherPlace ? (
                    <AddingPlaceholder
                        text={props.anotherPlace}
                        value={props.value}
                    />
                ) : (
                    ''
                )}
                {props.noIcons ? (
                    ''
                ) : (
                    <div className={style.error_icon}>
                        {props.error
                            ? icon.error
                            : props.value === ''
                            ? ''
                            : icon.agree}
                    </div>
                )}
            </div>
            <div
                className={
                    errorTheme[props.errorTheme ? props.errorTheme : 'standard']
                }
            >
                {props.error}
            </div>
        </div>
    );
}
