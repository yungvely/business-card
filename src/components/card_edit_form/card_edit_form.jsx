import React from 'react';
import styles from './card_edit_form.module.css';
import Button from '../button/button';

const CardEditForm = ({ FileInput, card, createOrUpdateCard, deleteCard }) => {
  const { name, company, title, email, message, theme, fileName } = card;

  const onFileChange = file => {
    createOrUpdateCard({
      ...card,
      fileName: file.name,
      fileURL: file.url
    })
  }

  const onChange = (event) => {
    if(event.currentTarget == null) return;

    event.preventDefault();
    createOrUpdateCard({
      ...card,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const onSubmit = () => {
    deleteCard(card);
  };

  return (
    <form className={styles.form}>
      <input className={styles.input} type="text" name="name" value={name} 
        onChange={onChange}/>
      <input
        className={styles.input}
        type="text"
        name="company"
        value={company}
        onChange={onChange}
      />
      <select className={styles.select} name="theme" value={theme}
        onChange={onChange}>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="colorful">Colorful</option>
      </select>
      <input className={styles.input} type="text" name="title" value={title} 
        onChange={onChange} />
      <input className={styles.input} type="text" name="email" value={email} 
        onChange={onChange} />
      <textarea className={styles.textarea} name="message" value={message} 
        onChange={onChange} />
      <div className={styles.fileInput}>
        <FileInput name={fileName} onFileChange={onFileChange}/>
      </div>
      <Button name="Delete" onClick={onSubmit} />
    </form>
  );
};

export default CardEditForm;
