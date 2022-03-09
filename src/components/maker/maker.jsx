import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Footer from '../footer/footer';
import Header from '../header/header';
import Editor from '../editor/editor';
import Preview from '../preview/preview';
import styles from './maker.module.css';

const Maker = ({ FileInput, authService, CardRepository }) => {
  const navigatorState = useLocation().state;
  const [cards, setCards] = useState({
    //   '1': {
    //       id:1,
    //       name: 'Ellie',
    //       company: 'Samsung',
    //       theme: 'light',
    //       title: 'Software Engineer',
    //       email: 'ellie@gmaile.com',
    //       message: 'go for it',
    //       fileName: 'ellie',
    //       fileURL: ''
    //   },
    //   '2': {
    //     id:2,
    //     name: 'Ellie2',
    //     company: 'Samsung',
    //     theme: 'dark',
    //     title: 'Software Engineer',
    //     email: 'ellie@gmaile.com',
    //     message: 'go for it',
    //     fileName: 'ellie',
    //     fileURL: ''
    // }
  });
  const [userId, setuserId] = useState(navigatorState && navigatorState.id);


  const navigater = useNavigate();
  const onLogout = useCallback(() => { //변경될때 마다 계속 새로됨 그래서 useCallback
    authService.logOut();
  }, [authService]); //새로운 오쓰서비스라면 다시 새로운함수로 저장할테야


  useEffect(()=> {
    if (!userId) return;
    const stopSync =CardRepository.syncCards(userId, setCards)

    return () => {stopSync();} //언마운트시
  }, [userId, CardRepository]);

  useEffect(() => {
    authService.onAuthChange(user => {
      if (user) {
        setuserId(user.uid)
      } else {
        navigater('/');
      }
    });
  }, [userId, authService, navigater]);

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
    CardRepository.saveCard(userId, card);

  }
  const deleteCard = (card) => {
    setCards(cards => {
      const updated = {...cards}; // state
      delete updated[card.id]; 
      return updated;
    })
    CardRepository.removeCard(userId, card);
  }
  return ( 
    <section className={styles.maker}>
      <Header onLogout={onLogout} />
      <div className={styles.container}>
        <Editor cards={cards} FileInput={FileInput} createOrUpdateCard={createOrUpdateCard} deleteCard={deleteCard} />
        <Preview cards={cards} />
      </div>
      <Footer />
    </section>
  );
};

export default Maker;
