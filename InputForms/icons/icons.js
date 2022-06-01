import style from "../forms.module.scss"
export const icons = {
  cross: (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <circle className={style.cross_bg} cx="14" cy="14" r="14" fill="#212121" />
      <path
        className={style.cross}
        d="M21 8.41L19.59 7L14 12.59L8.41 7L7 8.41L12.59 14L7 19.59L8.41 21L14 15.41L19.59 21L21 19.59L15.41 14L21 8.41Z"
        fill="white"
      />
    </svg>
  ),
  agree: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"
        fill="#1EB83D"
      />
    </svg>
  ),
  cancel: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        className={style.cancel_icon_path}
        d="M12 2C6.47 2 2 6.47 2 12C2 17.53 6.47 22 12 22C17.53 22 22 17.53 22 12C22 6.47 17.53 2 12 2ZM17 15.59L15.59 17L12 13.41L8.41 17L7 15.59L10.59 12L7 8.41L8.41 7L12 10.59L15.59 7L17 8.41L13.41 12L17 15.59Z"
        fill="#8E8E8E"
      />
    </svg>
  ),
  error: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z"
        fill="#FF3323"
      />
    </svg>
  ),
  error_1: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" >
      <path d="M12 2C6.47 2 2 6.47 2 12C2 17.53 6.47 22 12 22C17.53 22 22 17.53 22 12C22 6.47 17.53 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM15.59 7L12 10.59L8.41 7L7 8.41L10.59 12L7 15.59L8.41 17L12 13.41L15.59 17L17 15.59L13.41 12L17 8.41L15.59 7Z" fill="#FFA19B" />
    </svg>

  ),
  dot: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="10" fill="#212121" />
      <circle
        className={style.circle_inside}
        cx="10"
        cy="10"
        r="6"
        fill="#0090FF"
      />
    </svg>
  ),
}