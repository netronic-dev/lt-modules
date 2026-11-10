import style from "./style.module.scss";
import WordSlider from "../WordSlider";

export default function SectionComponent(props) {
  // Дані для сітки карток "Why it pays off" (з другого скріншота)
  const benefitsData = [
    {
      title: "More players per session",
      text: "Two extra sets raise your arena capacity from day one.",
    },
    {
      title: "Faster ROI",
      text: "More taggers mean more sessions and higher turnover on the same investment.",
    },
    {
      title: "Spare units ready",
      text: "Keep extra equipment for peak days and maintenance.",
    },
    {
      title: "Price stays intact",
      text: "You pay for 10 and receive 12. The list price of your equipment doesn't change.",
    },
  ];

  return (
    <section className={style.section} id="bottom_text_box">
      <div className={style.section_inner}>
        <div className={style.content}>
          <h2 className={style.subtitle}>{props.subtitle}</h2>
          <p className={style.text}>{props.text}</p>
        </div>

        {/* Сітка карток переваг */}
        <div className={style.benefits_grid}>
          {benefitsData.map((item, index) => (
            <div key={index} className={style.benefit_card}>
              <h3 className={style.benefit_title}>{item.title}</h3>
              <p className={style.benefit_text}>{item.text}</p>
            </div>
          ))}
        </div>
      </div>
      <WordSlider className={style.words_slider} text={props.sliderWordsText} />
    </section>
  );
}
