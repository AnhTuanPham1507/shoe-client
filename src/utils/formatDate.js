import { formatDistanceToNow, isValid } from 'date-fns';
import viLocale from "date-fns/locale/vi";

const formatDate = (date) => {
    if (date) {
        const temp = new Date(date)
        return `0${temp.getDate()}`.slice(-2) + '-' + `0${temp.getMonth() + 1}`.slice(-2) + '-' + temp.getFullYear() + ' ' + temp.getHours() + ':' + `0${temp.getMinutes()}`.slice(-2)
    }
    else
        return "Đang chờ giao hàng"
}

export const formatDateString = (date) => {
  const myDate = new Date(date);
  return `Ngày ${myDate.getDate()} Tháng ${myDate.getMonth() + 1} Năm ${myDate.getFullYear()}`

}

export function fToNow(date) {
    return date
      ? formatDistanceToNow(new Date(date), {
          addSuffix: true,
          locale: {
            ...viLocale,
        }
        })
      : '';
  }

export function isValidDate(date){
  return isValid(date);
}
export default formatDate