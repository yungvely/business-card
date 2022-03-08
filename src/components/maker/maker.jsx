import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../footer/footer';
import Header from '../header/header';
import Editor from '../editor/editor';
import Preview from '../preview/preview';
import styles from './maker.module.css';

const Maker = ({ authService }) => {
  const [cards, setCards] = useState([
      {
          id:1,
          name: 'Ellie',
          company: 'Samsung',
          theme: 'light',
          title: 'Software Engineer',
          email: 'ellie@gmaile.com',
          message: 'go for it',
          fileName: 'ellie',
          fileURL: ''
      },{
        id:2,
        name: 'Ellie2',
        company: 'Samsung',
        theme: 'dark',
        title: 'Software Engineer',
        email: 'ellie@gmaile.com',
        message: 'go for it',
        fileName: 'ellie',
        fileURL: ''
    },{
        id:3,
        name: 'Ellie3',
        company: 'Samsung',
        theme: 'colorful',
        title: 'Software Engineer',
        email: 'ellie@gmaile.com',
        message: 'go for it',
        fileName: 'ellie',
        fileURL: ''
    }
  ]);
  const navigater = useNavigate();
  const onLogout = () => {
    authService.logOut();
  };

  useEffect(() => {
    authService.onAuthChange(user => {
      if (!user) {
        navigater('/');
      }
    });
  });

  const addCard = (card) => {
    const updated = [...cards, card];
    setCards(updated);
  }
  return (
    <section className={styles.maker}>
      <Header onLogout={onLogout} />
      <div className={styles.container}>
        <Editor cards={cards} addCard={addCard} />
        <Preview cards={cards}/>
      </div>
      <Footer />
    </section>
  );
};

export default Maker;
