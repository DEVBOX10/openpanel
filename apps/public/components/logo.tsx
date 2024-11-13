import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <svg
      width="61"
      height="35"
      viewBox="0 0 61 35"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      className={cn('text-black dark:text-white', className)}
    >
      <rect
        x="34.0269"
        y="0.368164"
        width="10.3474"
        height="34.2258"
        rx="5.17372"
      />
      <rect
        x="49.9458"
        y="0.368164"
        width="10.3474"
        height="17.5109"
        rx="5.17372"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.212 0C6.36293 0 0 6.36293 0 14.212V20.02C0 27.8691 6.36293 34.232 14.212 34.232C22.0611 34.232 28.424 27.8691 28.424 20.02V14.212C28.424 6.36293 22.0611 0 14.212 0ZM14.2379 8.35999C11.3805 8.35999 9.06419 10.6763 9.06419 13.5337V20.6971C9.06419 23.5545 11.3805 25.8708 14.2379 25.8708C17.0953 25.8708 19.4116 23.5545 19.4116 20.6971V13.5337C19.4116 10.6763 17.0953 8.35999 14.2379 8.35999Z"
      />
    </svg>
  );
}
