import { useContext, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { AuthContext } from '../../context/authContext';
import IUserCredentials from './types/userCredentialsType';
import Loading from '../../components/Loading';
import * as S from './styles';

const Login = () => {
  const navigate = useNavigate();
  const {register, handleSubmit, formState: {errors}} = useForm<IUserCredentials>();
  const {registerUser, isAuthenticated} = useContext(AuthContext);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if(isAuthenticated){
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = async (data: IUserCredentials): Promise<void> => {
    try{
      setLoading(true);
      const auth = getAuth();
      const res = await signInWithEmailAndPassword(auth, data.email, data.password);
      const user = res.user;
      localStorage.setItem('NPRT', res.user.refreshToken);
      registerUser(user.email!, user.uid);
    }catch(err){
      console.error(err);
      setError(true);
    }finally{
      setLoading(false);
    }
  }

  return (
    <S.Container>
      {loading && <Loading/>}
      <S.Main>
        <S.Title>
          Log In!
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
                className={!!errors.email ? 'inputError' : ''}
              />
              {errors.password && <S.Error>Password required</S.Error>}
            </label>
            <button type="submit">Login</button>
            <S.SignUpMessage>Don't have an account? <Link to="/signup">Sign up</Link></S.SignUpMessage>
          </S.Form>
          {error && <S.Error>Invalid credentials</S.Error>}
      </S.Main>
    </S.Container>
  )
}

export default Login;
