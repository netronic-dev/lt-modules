import Image from 'next/image';
import style from './style.module.scss';
import bg_image from '../../public/nebula_banner_bg.jpg';
import nebula_banner_bg_mob from '../../public/nebula_banner_bg_mob.jpg';
import granade_for_banner from '../../public/granade_for_banner.png';
import granade_for_banner_mob from '../../public/granade_for_banner_mob.png';
import Link from 'next/link';

const Banner = (props) => {
    return (
        <div className={`${style.banner} fade-down-animation`}>
            <div className={style.wrapper}>
                <div className={style.block_title}>
                    <div className={style.granade_img}>
                        <Image src={granade_for_banner} alt="granate_bg" />
                    </div>
                    <h2 className={style.title}>{props.title}</h2>
                </div>
                <div className={style.granade_img_mob}>
                        <Image src={granade_for_banner_mob} alt="granate_bg" />
                    </div>
                <span className={style.text}>{props.text}</span>
                <Link href="/equipment/accessories/lasertag-grenade-nebula?utm_source=site&utm_medium=banner&utm_campaign=grenade_release"><a className={style.button} onClick={() => props.toggleActivity()}>{props.btn_text}</a></Link>
            </div>
            <div className={style.bg_image}>
                <Image src={bg_image} alt="bg_image" layout='fill' objectFit='cover' />
            </div>
            <div className={style.bg_image_mob}>
                <Image src={nebula_banner_bg_mob} alt="bg_image" layout='fill' objectFit='cover' />
            </div>
            <div onClick={() => props.toggleActivity()}>{icon_close}</div>
        </div>
    );
};

export default Banner;

const icon_close = <svg width="47" height="47" viewBox="0 0 47 47" fill="none" xmlns="http://www.w3.org/2000/svg" className={style.icon_close} >
    <circle cx="23.5" cy="23.5" r="23.5" fill="#F1F1F1" className={style.circle} />
    <path d="M30.4961 17.625L17.625 30.55" stroke="#0090FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M17.625 17.625L30.4961 30.55" stroke="#0090FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
</svg>




