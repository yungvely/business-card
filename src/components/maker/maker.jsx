import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../footer/footer';
import Header from '../header/header';
import styles from './maker.module.css';

const Maker = ({ authService }) => {
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


  return (
    <section className={styles.maker}>
      <Header onLogout={onLogout} />
      <Footer />
    </section>
  );
};

export default Maker;
