import { differenceInSeconds, differenceInMinutes, differenceInHours, differenceInDays, differenceInMonths, differenceInYears } from "date-fns";

const formatRelativeTime = (date: Date): string => {
  const now = new Date();
  const diffInSeconds = differenceInSeconds(now, date);
  const diffInMinutes = differenceInMinutes(now, date);
  const diffInHours = differenceInHours(now, date);
  const diffInDays = differenceInDays(now, date);
  const diffInMonths = differenceInMonths(now, date);
  const diffInYears = differenceInYears(now, date);

  if (diffInSeconds < 60) {
    // Jika selisih kurang dari 60 detik, gunakan format detik
    return `${diffInSeconds}s`;
  } else if (diffInMinutes < 60) {
    // Jika selisih kurang dari 60 menit, gunakan format menit
    return `${diffInMinutes}m`;
  } else if (diffInHours < 24) {
    // Jika selisih kurang dari 24 jam, gunakan format jam
    return `${diffInHours}h`;
  } else if (diffInDays < 30) {
    // Jika selisih kurang dari 30 hari, gunakan format hari
    return `${diffInDays}d`;
  } else if (diffInMonths < 12) {
    // Jika selisih kurang dari 12 bulan, gunakan format bulan
    return `${diffInMonths}mo`;
  } else {
    // Jika lebih dari atau sama dengan 12 bulan, gunakan format tahun
    return `${diffInYears}y`;
  }
};

export default formatRelativeTime;
