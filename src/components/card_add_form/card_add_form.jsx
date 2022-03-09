import React, { memo, useRef, useState } from 'react';
import styles from './card_add_form.module.css';
import Button from '../button/button';

const CardAddForm = memo(({ FileInput, createOrUpdateCard }) => {
  const formRef = useRef();
  const nameRef = useRef();
  const companyRef = useRef();
  const themeRef = useRef();
  const titleRef = useRef();
  const emailRef = useRef();
  const messageRef = useRef();
  const [file, setFile] = useState({fileName: null, fileURL: null});

  const onFileChange = file => {
    setFile({
      fileName: file.name,
      fileURL: file.url
    })
  }

  const onSubmit = (event) => {
    event.preventDefault();
    const card= {
      id: Date.now(),
      name : nameRef.current.value || '' ,
      company : companyRef.current.valuey || '' ,
      theme : themeRef.current.value || '' ,
      title : titleRef.current.value || '' ,
      email : emailRef.current.value || '' ,
      message : messageRef.current.value || '',
      fileName: file.fileName || '',
      fileURL: file.fileURL || ''
    }
    formRef.current.reset();
    setFile({
      fileName: null,
      fileURL: null
    });
    createOrUpdateCard(card);
  };

  return (
    <form ref={formRef} className={styles.form}>
      <input ref={nameRef} className={styles.input} type="text" name="name" placeholder="name" />
      <input 
        ref={companyRef}
        className={styles.input}
        type="text"
        name="company"
        placeholder="company"
      />
      <select ref={themeRef} className={styles.select} name="theme" placeholder="theme">
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="colorful">Colorful</option>
      </select>
      <input ref={titleRef} className={styles.input} type="text" name="title" placeholder="title" />
      <input ref={emailRef} className={styles.input} type="text" name="email" placeholder="email" />
      <textarea ref={messageRef} className={styles.textarea} name="message" placeholder="message" />
      <div className={styles.fileInput}>
        <FileInput name={file.fileName} onFileChange={onFileChange} />
      </div>
      <Button name="add" onClick={onSubmit} />
    </form>
  );
});

export default CardAddForm;
