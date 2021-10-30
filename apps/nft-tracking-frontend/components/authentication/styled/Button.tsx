import styled from 'styled-components';

const Button = styled.div`
  margin-top: 1rem;
  margin-bottom: 2rem;
  display: block;
  padding: 1rem;
  font-size: 2rem;
  background-color: ${(props) => props.theme.quickSilver};
  color: #fff;
  font-family: inherit;
  border-radius: 5px;
  cursor: pointer;

  :hover {
    background-color: ${(props) => props.theme.grayWeb};
  }
`;

export default Button;
