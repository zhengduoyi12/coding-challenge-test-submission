import React from "react";
import styles from "./ErrorMessage.module.css";

type ErrorMessageProps = {
  message: string;
  onRetry?: () => void;
  onClose?: () => void;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

export default function ErrorMessage({
  message,
  onRetry,
  onClose,
  className,
  ...rest
}: ErrorMessageProps) {
  return (
    <div
      role="alert"
      aria-live="assertive"
      className={[styles.container, className].filter(Boolean).join(" ")}
      {...rest}
    >
      <span className={styles.icon} aria-hidden="true">
     
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className={styles.svg}
        >
          <path d="M12 2a10 10 0 1 0 .001 20.001A10 10 0 0 0 12 2Zm0 5.5a1 1 0 0 1 .993.883L13 8v5a1 1 0 0 1-1.993.117L11 13V8a1 1 0 0 1 1-1Zm0 10a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5Z" />
        </svg>
      </span>

      <p className={styles.text}>{message}</p>

      {(onRetry || onClose) && (
        <div className={styles.actions}>
          {onRetry && (
            <button type="button" className={styles.retry} onClick={onRetry}>
              Retry
            </button>
          )}
          {onClose && (
            <button
              type="button"
              aria-label="Dismiss error"
              className={styles.close}
              onClick={onClose}
              title="Dismiss"
            >
              <span aria-hidden="true">×</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
