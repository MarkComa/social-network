import React from "react";
import styles from "../blocks/formsControls.module.css";

export const Textarea = ({ input, meta, ...props }) => {
  const hasError = meta.touched && meta.error;
  return (
    <div className={styles.formControl + (hasError && " " + styles.error)}>
      <textarea {...input} {...props} />
      {hasError && <span className={styles.errTextarea}>{meta.error}</span>}
    </div>
  );
};

export const Input = ({ input, meta, ...props }) => {
  const hasError = meta.touched && meta.error;
  return (
    <div className={styles.formControl + (hasError && " " + styles.error)}>
      <input {...input} {...props} />
      {hasError && <span className={styles.errInput}>{meta.error}</span>}
    </div>
  );
};
