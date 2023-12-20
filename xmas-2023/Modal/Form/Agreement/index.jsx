import style from './style.module.scss';

const Agreement = (props) => {
	return (
		<div className={style.agreement}>
			<input
				className={`${style.agreement__dot} ${props.agreement ? style.agreement__dot_active : ''}`}
				type='checkbox'
				name='agreement'
				id='agreement'
				checked={props.agreement}
				onChange={props.onChange}
			/>
			<div
				className={style.agreement__dot}
				id='agreement'
				onClick={props.onClick}>
				<div className={props.agreement ? style.agreement__dot_active : ''}></div>
			</div>
			{props.error && <span className={style.agreement__error}>{props.error}</span>}
			<span className={`${style.agreement__text} ${props.isModal ? '' : style.agreement__text_white}`}>
				{props.agreementText}
			</span>
		</div>
	);
};

export default Agreement;
