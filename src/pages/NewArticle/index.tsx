import { useContext, useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { getFirestore,setDoc, doc, getDoc, updateDoc} from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import Header from "../../components/Header";
import Loading from "../../components/Loading";
import { AuthContext } from "../../context/authContext";
import categories from "../../constants/categories";
import {IArticle, ISavedArticle} from "./types/articleType";
import * as S from './styles';

const NewArticle = () => {
  const params = useParams();
  const navigate = useNavigate();
  const {user} = useContext(AuthContext);
  const {register, resetField, reset, setValue, watch, handleSubmit, formState: {errors}} = useForm<IArticle>();
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [draft, setDraft] = useState(true);
  const image = useRef<File[]>();
  image.current = watch("image");

  useEffect(() => {
    setDraft(true);
    (async function(){
      if(params.id){
        setLoading(true);
        try{
          const db = getFirestore();
          const docRef = doc(db, "articles", params.id);
          const docSnap = await getDoc(docRef);
          if(docSnap.exists()){
            const currentArticle = docSnap.data() as ISavedArticle;
            if(currentArticle.uid !== user?.uid || (currentArticle.uid !== user?.uid && !user.admin)){
              navigate('/');
            }
            setValue('title', currentArticle.title);
            setValue('smallDescription', currentArticle.smallDescription);
            setValue('category', currentArticle.category);
            setValue('content', currentArticle.content);
            setPreviewImage(currentArticle.image || '');
            if(currentArticle.published){
              setDraft(false);
            }
          }
        }catch(err){
          console.error(err);
        } finally {
          setLoading(false);
        }
      } else {
        reset();
        setPreviewImage('');
      }
    })();
  }, [params.id]);

  useEffect(() => {
    if(image.current?.length){
      setPreviewImage(URL.createObjectURL(image.current[0]));
    }
  }, [image.current]);

  const removeImage = () => {
    setPreviewImage('');
    resetField('image');
  };

  const createNew = async (data: IArticle): Promise<void> => {
    setLoading(true);
    let imageUrl = '';
    const articleId =  data.title.replace(/[^a-zA-Z0-9 ]/g, '').toLowerCase().replace(/ /g, '-');
    try{
      const db = getFirestore();
      const docRef = doc(db, "articles", articleId);
      const docSnap = await getDoc(docRef);
      if(!docSnap.exists()){
        if(data.image){
          const storage = getStorage();
          const storageRef = ref(storage, `/images/${data.title.toLowerCase().replace(/ /g, '-')}`);
          const uploadTask = await uploadBytesResumable(storageRef, data.image[0]);
          imageUrl = await getDownloadURL(uploadTask.ref);
        }
        if(user){
          setDoc(docRef, {
            title: data.title,
            smallDescription: data.smallDescription,
            content: data.content,
            category: data.category,
            image: imageUrl,
            uid: user.uid,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            published: data.published
          });
        }
      } else {
        console.error('already exists');
      }
    } catch(err) {
      console.error(err);
    } finally {
      setLoading(false);
      if(data.published){
        navigate(`/article/${articleId}`);
      }
    }
  };

  const updateArticle = async (data: IArticle): Promise<void> => {
    setLoading(true);
    let imageUrl = '';
    try{
      const db = getFirestore();
      const docRef = doc(db, "articles", params.id || '');
      const docSnap = await getDoc(docRef);
      if(docSnap.exists()){
        if(data.image?.length){
          const storage = getStorage();
          const storageRef = ref(storage, `/images/${data.title.toLowerCase().replace(/ /g, '-')}`);
          const uploadTask = await uploadBytesResumable(storageRef, data.image[0]);
          imageUrl = await getDownloadURL(uploadTask.ref);
        }
        if(user){
          updateDoc(docRef, {
            title: data.title,
            smallDescription: data.smallDescription,
            content: data.content,
            category: data.category,
            image: imageUrl || previewImage,
            updatedAt: new Date().toISOString(),
            published: data.published
          });
        }
      } else {
        console.error('was not possible to update this article');
      }
    } catch(err) {
      console.error(err);
    } finally {
      setLoading(false);
      if(data.published){
        navigate(`/article/${params.id}`);
      }
    }
  };

  const onSubmitDraft = (data: IArticle) => {
    if(params.id){
      updateArticle({...data, published: false});
    } else {
      createNew({...data, published: false}); 
    }
  }

  const onSubmit = (data: IArticle) => {
    if(params.id){
      updateArticle({...data, published: true});
    } else {
      createNew({...data, published: true}); 
    }
  };

  return <>
    {loading && <Loading/>}
    <Header/>
    <S.Title>
      {params.id ? 'Edit Article!' : 'New Article!'}
    </S.Title>
    <S.Main>
      <S.Form onSubmit={e => {e.preventDefault()}}>
        <label>
          Title *
          <input
            placeholder='Article title'
            className={!!errors.title? 'inputError' : ''}
            {...register("title", 
              { required: true })
            }
          />
          {errors.title && <S.Error>Title required</S.Error>}
        </label>
        <label>
          Small description *
          <S.SmallDescription
            placeholder='Your message'
            className={!!errors.smallDescription? 'inputError' : ''}
            {...register("smallDescription", 
              { required: true })
            }
          />
          {errors.smallDescription&& <S.Error>Description required</S.Error>}
        </label>
        <label>
          Image
          {previewImage ? <S.RemoveImage onClick={removeImage}>Remove image</S.RemoveImage> :
          <input
            type='file'
            accept="image/png, image/jpeg"
            {...register("image")}
          />}
          {!!previewImage && <img src={previewImage} alt='preview'/>} 
        </label>
        <label>
          Category *
          <select 
            className={!!errors.category? 'inputError' : ''}
            {...register("category", 
              { required: true })
            }>
            <option></option>
            {categories.map(cat => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>
          {errors.smallDescription&& <S.Error>Category required</S.Error>}
        </label>
        <label>
          Content *
          <S.Content
            className={!!errors.content? 'inputError' : ''}
            {...register("content", 
              { required: true })
            }
            placeholder="Your message" />
          {errors.content && <S.Error>Content required</S.Error>}
        </label>
        {draft && <S.SaveAsDraft
          onClick={handleSubmit(onSubmitDraft)}
        >
          Save as Draft
        </S.SaveAsDraft>}
        
        <S.Publish
          onClick={handleSubmit(onSubmit)}>
            {draft ? 'Publish': 'Save and Publish'}
        </S.Publish>
      </S.Form>
    </S.Main>
  </>
}

export default NewArticle;