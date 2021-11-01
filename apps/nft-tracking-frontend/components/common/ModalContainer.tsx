import styled from 'styled-components';

export default styled.div`
  margin: 0 20px;
  height: 90%;
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  .title {
    font-size: 20px;
    margin-bottom: 3rem;
  }

  .input-container {
    margin-top: 15px;
    margin-bottom: 3rem;
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
