import styled from "styled-components";

const Form = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  border: 10px solid pink;
  margin: 3rem 30% 1rem 30%;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  border: 10px solid lavender;
  margin: 5rem 30% 1rem 30%;
`;

const Section = styled.div`
  margin: 0.5rem;
  display: flex;
  justify-content: space-around;
`;

const Input = styled.input`
  margin-left: 1rem;
`;

const Button = styled.button`
  background-color: pink;
  margin: 0.5rem;
`;

const LinkContainer = styled.div`
  margin: 1.5rem;
  color: blueviolet;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Title = styled.h1`
  margin-top: 4rem;
  display: flex;
  justify-content: center;
`;

export {
  Form,
  Input,
  Section,
  Button,
  Container,
  LinkContainer,
  ButtonContainer,
  Title,
};
