import styled from 'styled-components';

export const Container = styled.div`
  padding: 0 2rem;
  max-width: 900px;
  width: 100%;
  margin: 0 auto;
`;

export const Main = styled.main`
  min-height: 100vh;
  padding: 4rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const Categories = styled.div`
  margin: 40px 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  span {
    font-size: 18px;
    font-weight: bold;
    margin-right: 20px;
  }
`;

interface CategoryProps {
  active: boolean;
}

export const Category = styled.button`
  display: block;
  margin: 5px;
  text-decoration: none;
  background-color: ${(props: CategoryProps) => props.active ? 'rgb(244, 98, 98)': 'transparent'};
  border: 1px solid rgb(244, 98, 98);
  color: ${(props: CategoryProps) => props.active ? 'white': 'rgb(244, 98, 98)'};
  border-radius: 100px;
  padding: 0px 16px;
  height: 40px;
  align-items: center;
  display: flex;
  width: fit-content;
`;

export const ClearFilter = styled.button`
  border: none;
  text-decoration: underline;
  color: rgb(31, 34, 44);
  background: none;
  margin: 0 20px;
`;

export const Articles = styled.div`
  margin: 30px 0;
  width: 100%;
  display: grid;
  gap: 20px;
  grid-template-columns: 100%;
  @media(min-width: 600px){
    grid-template-columns: 50% 50%;
  }
`;

export const LoadMore = styled.button`
  display: block;
  text-decoration: none;
  border: 1px solid rgb(31, 34, 44);
  color: rgb(31, 34, 44);
  border-radius: 100px;
  padding: 0px 16px;
  height: 40px;
  align-items: center;
  display: flex;
  margin: 0 auto;
  width: fit-content;
  background: none;
`;