import classes from '../auth.module.scss';
import { SignUpFormData } from '@app_types/authForm';
import { Button } from '@components/button/button';
import { CustomNavLink } from '@components/customNavLink/customNavLink';
import { Input } from '@components/input/input';
import { Loader } from '@components/loader/loader';
import { routes } from '@constants/constants';
import { auth } from '@database/context';
import useSignUp from '@hooks/useSignUp';
import { useLocale } from '@localization/useLocale';
import { showError } from '@redux/errorSlice';
import { SignUpFormSchema } from '@utils/signUpFormSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useMemo } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

export const SignUp: React.FC = () => {
  const { language } = useLocale();
  const [signUp, signUpError, signUpLoading] = useSignUp();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({ resolver: yupResolver(SignUpFormSchema()) });

  const [, loading, error] = useAuthState(auth);

  const errorMessage = useMemo(() => {
    return signUpError || error?.message;
  }, [signUpError, error, signUpLoading]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(showError(errorMessage));
  }, [dispatch, errorMessage]);

  const onSubmit = async (data: SignUpFormData) => {
    signUp(data.email, data.password, data.name);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={classes.wrapperForm} data-testid="sign-up-form">
      <form className={classes.authForm} onSubmit={handleSubmit(onSubmit)}>
        <h1 className={classes.title}>{language.strings.signUp}</h1>
        <Input
          error={errors.name?.message}
          label={language.strings.inputLabel.authName}
          placeholder={language.strings.placeholder.authName}
          data-testid="name"
          {...register('name')}
        />
        <Input
          error={errors.email?.message}
          label={language.strings.inputLabel.authEmail}
          placeholder={language.strings.placeholder.authEmail}
          data-testid="email"
          {...register('email')}
        />
        <Input
          error={errors.password?.message}
          label={language.strings.inputLabel.authPassword}
          placeholder={language.strings.placeholder.authPassword}
          type="password"
          data-testid="password"
          {...register('password')}
        />
        <Input
          error={errors.confirmPassword?.message}
          label={language.strings.inputLabel.authConfirmPassword}
          placeholder={language.strings.placeholder.authConfirmPassword}
          type="password"
          data-testid="confirmPassword"
          {...register('confirmPassword')}
        />
        <div className={classes.buttonWrapper}>
          <Button data-testid="sign-up-button" type="submit">
            {language.strings.signUp}
          </Button>
          <CustomNavLink to={routes.SIGN_IN}>
            <Button mode="light">{language.strings.signIn}</Button>
          </CustomNavLink>
        </div>
      </form>
    </div>
  );
};
