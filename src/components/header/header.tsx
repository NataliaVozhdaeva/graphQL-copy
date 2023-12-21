import SignOutIcon from '@assets/signout.svg';
import { Avatar } from '@components/avatar/avatar';
import { routes } from '@constants/constants';
import { auth } from '@dataBase/initialApp';
import { signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import classes from './header.module.scss';
import { homeIcon } from '@assets/index';
import { Button } from '@components/button/button';
import { CustomNavLink } from '@components/customNavLink/customNavLink';
import { SelectLanguage } from '@components/selectLanguage/selectLanguage';
import { useLocale } from '@localization/useLocale';

import classNames from 'classnames';
import React, { useEffect, useState } from 'react';

export const Header: React.FC = () => {
  const { language } = useLocale();
  const navigate = useNavigate();
  const [isSticky, setIsSticky] = useState(false);
  const [user] = useAuthState(auth);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsSticky(scrollPosition > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = async () => {
    signOut(auth);
    navigate(routes.WELCOME_URL);
  };

  const classNamesSticky = isSticky && classes.headerSmall;

  const accountInfo = () => {
    if (user) {
      return (
        <>
          <Avatar name={user.displayName} />
          <Button mode="light" onClick={handleLogout} className={classes.signoutButton}>
            <img src={SignOutIcon} className={classes.signOutIcon} alt="signOut" />
            <label>{language.strings.signout}</label>
          </Button>
        </>
      );
    } else {
      return (
        <CustomNavLink to={routes.SIGN_IN}>
          <Button mode="light">{language.strings.signIn}</Button>
        </CustomNavLink>
      );
    }
  };

  return (
    <header className={classNames(classNamesSticky, classes.header)}>
      <div className={classes.headerContent}>
        <CustomNavLink to={routes.WELCOME_URL} className={classes.link}>
          <img src={homeIcon} className={classes.homeIcon} alt="home" />
          <label className={classes.desktopLink}>{language.strings.welcomePage} </label>
        </CustomNavLink>
        <div className={classes.flex}>
          <SelectLanguage />
          {accountInfo()}
        </div>
      </div>
    </header>
  );
};
