import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, formatDistanceToNow } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string | undefined, formatString = 'PPP'): string {
  if (!date) return 'N/A';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(dateObj.getTime())) {
    return 'Invalid date';
  }
  
  return format(dateObj, formatString);
}

export function formatTimeAgo(date: Date | string | undefined): string {
  if (!date) return 'N/A';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(dateObj.getTime())) {
    return 'Invalid date';
  }
  
  return formatDistanceToNow(dateObj, { addSuffix: true });
}

export function formatDateTime(date: Date | string | undefined): string {
  if (!date) return 'N/A';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(dateObj.getTime())) {
    return 'Invalid date';
  }
  
  return format(dateObj, 'PPP p');
}

export function calculateAge(dateOfBirth: Date | string | undefined): number | null {
  if (!dateOfBirth) return null;
  
  const birthDate = typeof dateOfBirth === 'string' ? new Date(dateOfBirth) : dateOfBirth;
  
  if (isNaN(birthDate.getTime())) {
    return null;
  }
  
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  
  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
}

export function getGenderLabel(gender: string | undefined): string {
  if (!gender) return 'Unknown';
  
  const genderMap: Record<string, string> = {
    'MALE': 'Male',
    'FEMALE': 'Female',
    'OTHER': 'Other'
  };
  
  return genderMap[gender] || gender;
}

export function getStatusColor(status: string | undefined): string {
  if (!status) return 'bg-gray-200 text-gray-800';
  
  const statusMap: Record<string, string> = {
    'ACTIVE': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    'RESOLVED': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    'FOLLOW_UP': 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300'
  };
  
  return statusMap[status] || 'bg-gray-200 text-gray-800';
}

export function truncateText(text: string, maxLength: number): string {
  if (!text || text.length <= maxLength) return text;
  
  return `${text.substring(0, maxLength)}...`;
}

export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  
  return function(...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

export function getInitials(name: string): string {
  if (!name) return '';
  
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
}