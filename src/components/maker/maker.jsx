import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../footer/footer';
import Header from '../header/header';
import Editor from '../editor/editor';
import Preview from '../preview/preview';
import styles from './maker.module.css';

const Maker = ({ FileInput, authService }) => {
  const [cards, setCards] = useState({
      '1': {
          id:1,
          name: 'Ellie',
          company: 'Samsung',
          theme: 'light',
          title: 'Software Engineer',
          email: 'ellie@gmaile.com',
          message: 'go for it',
          fileName: 'ellie',
          fileURL: ''
      },
      '2': {
        id:2,
        name: 'Ellie2',
        company: 'Samsung',
        theme: 'dark',
        title: 'Software Engineer',
        email: 'ellie@gmaile.com',
        message: 'go for it',
        fileName: 'ellie',
        fileURL: ''
    },
    '3': {
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
  });


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

  // const addCard = (card) => {
  //   const updated = [...cards, card];
  //   setCards(updated);
  // }

  
  const createOrUpdateCard = (card) => {
    // const updated = {...cards}; // state
    // updated[card.id] = card; //받은값을 저장
    // setCards(updated); // 값 업데이트


    // 예전값을 받아서 새로운값을 리턴하도록
    setCards(cards => {
      const updated = {...cards}; // state
      updated[card.id] = card; //받은값을 저장
      return updated;
    })

  }
  const deleteCard = (card) => {
    setCards(cards => {
      const updated = {...cards}; // state
      delete updated[card.id]; 
      return updated;
    })
  }
  return ( 
    <section className={styles.maker}>
      <Header onLogout={onLogout} />
      <div className={styles.container}>
        <Editor cards={cards} FileInput={FileInput} createOrUpdateCard={createOrUpdateCard} deleteCard={deleteCard} />
        <Preview cards={cards}/>
      </div>
      <Footer />
    </section>
  );
};

export default Maker;
