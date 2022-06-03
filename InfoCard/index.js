import style from "./style.module.scss"

export function InfoCard(props) {

  return (
    <div className={style.cell}>
      <div className={style.top}>
        <p className={style.subtitle}>
          {props.Region}
        </p>
        <h4 className={style.title}>
          {props.Name}
        </h4>
      </div>
      <div>
        {props.Address ? (<Field
          title="Address"
          text={props.Address}
        />) : null}

        {props.Phone ? (<Field
          title="Phone"
          text={props.Phone}
        />) : null}

        {props.Phone2 ? (<Field
          title="Phone"
          text={props.Phone2}
        />) : null}

        {props.Email ? (<Field
          title="Email"
          text={props.Email}
        />) : null}

        {props.Website ? (<Field
          title="Website"
          text={props.Website}
        />) : null}

        {props.ContactPerson ? (<Field
          title="Contact Person"
          text={props.ContactPerson}
        />) : null}

        {props.TechnicalContact ? (<Field
          title="Technical Contact"
          text={props.TechnicalContact}
        />) : null}

      </div>
    </div>
  )
}

const Field = (props) => {
  return (
    <div className={style.field}>
      <p className={style.field_title}>{props.title}:</p>
      <p className={style.field_text}>{props.text}</p>
    </div>
  )
}