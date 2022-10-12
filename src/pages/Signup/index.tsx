import { useRef, useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import IRegisterUser from './types/registerUserType';
import { AuthContext } from '../../context/authContext';
import Loading from '../../components/Loading';
import * as S from './styles';

const SignUp = () => {
  const {register, handleSubmit, formState: {errors}, watch} = useForm<IRegisterUser>();
  const navigate = useNavigate();
  const {isAuthenticated} = useContext(AuthContext);
  const password = useRef({});
  password.current = watch("password", "");
  const [loading, setLoading]= useState(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if(isAuthenticated){
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = async (data: IRegisterUser): Promise<void> => {
    try{
      setLoading(true);
      const auth = getAuth();
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      navigate('/login');
    }catch(err: any){
      if(err.code === 'auth/email-already-in-use'){
        setError('Email already in use');
      } else {
        setError('Sorry something went wrong');
      }
    } finally{
      setLoading(false);
    }
  }

  return (
    <S.Container>
      {loading && <Loading/>}
      <S.Main>
        <S.Title>
          Sign Up!
        </S.Title>
          <S.Form onSubmit={handleSubmit(onSubmit)}>
            <label>
              Email *
              <input
                type="email"
                placeholder='example@email.com'
                className={!!errors.email ? 'inputError' : ''}
                {...register("email", 
                  { required: true,
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Email is invalid"
                    } 
                  })
                } />
              {errors.email && <S.Error>{errors.email.message}</S.Error>}
            </label>
            <label>
              Password *
              <input
                type="password"
                placeholder='******'
                {...register("password", { required: true, minLength: 6})}
                className={!!errors.password ? 'inputError' : ''}
              />
              {errors.password && <S.Error>Password must has the minimum length of 6 digits</S.Error>}
            </label>
            <label>
              Password Confirmation *
              <input
                type="password"
                placeholder='******'
                {...register("passwordConfirmation", {required: true, validate: value => value === password.current})}
                className={!!errors.passwordConfirmation ? 'inputError' : ''}
              />
              {errors.passwordConfirmation && <S.Error>The passwords do not match</S.Error>}
            </label>
            <button type="submit">Register</button>
            <S.LoginMessage>Have an account? <a href="/login">Log in</a></S.LoginMessage>
          </S.Form>
          {!!error && <S.Error>{error}</S.Error>}
      </S.Main>
    </S.Container>
  )
}

export default SignUp;
