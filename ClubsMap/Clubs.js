import { nanoid } from "nanoid";
import style from "./style.module.scss";

export function Card(props) {
    return (
        <div className={style.card}>
            <p className={style.club_type}>{props.clubType}</p>
            <p className={style.club_name}>{props.clubName}</p>
            <div className={style.content}>
                {props.address ? (
                    <Category title="Address" text={props.address} />
                ) : (
                    ""
                )}
                {props.phones
                    ? props.phones.map((item) => (
                          <Category
                              key={nanoid()}
                              title="Phone"
                              text={item.toString()}
                          />
                      ))
                    : ""}
                {props.emails
                    ? props.emails.map((item) => (
                          <CategoryStyle
                              key={nanoid()}
                              title="Email"
                              text={item}
                          />
                      ))
                    : ""}
                {props.sites
                    ? props.sites.map((item) => (
                          <CategoryStyle
                              key={nanoid()}
                              title="Site"
                              text={item}
                          />
                      ))
                    : ""}
                {props.socialMedia
                    ? props.socialMedia.map((item) => (
                          <CategoryStyle
                              key={nanoid()}
                              text={item.value}
                              title={item.name}
                          />
                      ))
                    : ""}
            </div>
        </div>
    );
}

function Category(props) {
    return (
        <div className={style.category_block}>
            <div className={style.club_category}>
                {props.title || "Address"}
            </div>
            <div className={style.club_text}>{props.text}</div>
        </div>
    );
}

function CategoryStyle(props) {
    return (
        <>
            <div className={style.category_block_blue}>
                <div className={style.club_category}>
                    {props.title || "Phone"}
                </div>
                <div className={style.club_text}>{props.text}</div>
            </div>
        </>
    );
}
