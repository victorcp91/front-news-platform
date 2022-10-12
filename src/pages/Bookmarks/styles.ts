import styled from 'styled-components';

export const Container = styled.div`
  padding: 0 2rem;
`;

export const Main = styled.main`
  max-width: 900px;
  margin: 0 auto;
`;

export const Title = styled.h1`
  margin: 0;
  line-height: 1.15;
  font-size: 4rem;
  text-align: center;
`;

export const Articles = styled.div`
  margin: 30px 0;
  width: 100%;
  display: grid;
  gap: 20px;
  grid-template-columns: 50% 50%;
`;

export const NoBookmarks = styled.div`
  margin: 0 auto;
  width: 100%;
  font-size: 20px;
  text-align: center;
  color: lightcoral;
`;
