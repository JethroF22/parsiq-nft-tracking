import styled from 'styled-components';

export default styled.div`
  margin: 20px;
  height: 90%;
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .title {
    font-size: 20px;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  .input-container {
    margin-top: 15px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    input {
      width: 100%;
      padding: 10px;
      font-family: inherit;
    }
  }
`;
