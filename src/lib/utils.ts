import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function multiFormatDateString(dateString: string): string {
  const normalizedDateString = dateString.replace(/(\+\d{2}):(\d{2})$/, "$1$2");
  const date = new Date(normalizedDateString);

  if (isNaN(date.getTime())) {
    return "Invalid date";
  }

  const now = new Date();
  const diffMs = now.getTime() - date.getTime();

  if (diffMs < 0) {
    return "in the future";
  }

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (seconds < 60) {
    return "just now";
  } else if (minutes < 60) {
    return minutes === 1 ? "a minute ago" : `${minutes} minutes ago`;
  } else if (hours < 24) {
    return hours === 1 ? "an hour ago" : `${hours} hours ago`;
  } else if (days < 7) {
    return days === 1 ? "a day ago" : `${days} days ago`;
  } else if (weeks < 4) {
    return weeks === 1 ? "a week ago" : `${weeks} weeks ago`;
  } else if (months < 12) {
    return months === 1 ? "a month ago" : `${months} months ago`;
  } else {
    return years === 1 ? "a year ago" : `${years} years ago`;
  }
}

export const checkIsLiked = (likeList: string[], userId: string) => {
  return likeList.includes(userId);
};
