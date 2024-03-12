import style from './style.module.scss';

const Input = (props) => {
	return (
		<label className={style.input__label}>
			<input
				name={props.name}
				className={`${style.input} ${props.error ? style.input__error : ''}`}
				type={props.type}
				onChange={props.onChange}
				value={props.value}
				placeholder={props.placeholder}
			/>
			{props.error ? <span className={style.error__message}>{props.error}</span> : null}
		</label>
	);
};

export default Input;
