const themes = {
    Black: 'black_button',
    White: 'white_button',
};

export default function ButtonDetails(props) {
    return (
        <button className={themes[props.theme]}>
            <span className='button__text'>{props.text || 'Learn more'}</span>
            {icon}
        </button>
    );
}
const icon = (
    <svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
        <path
            className='button__arrow'
            d='M12 4L10.59 5.41L16.17 11H4V13H16.17L10.59 18.59L12 20L20 12L12 4Z'
            fill='#0090FF'
        />
    </svg>
);
