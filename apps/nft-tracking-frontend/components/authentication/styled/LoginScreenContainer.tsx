import styled from 'styled-components';

const AuthScreenContainer = styled.div`
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: 1fr max-content 1fr;
  background-color: #fff;

  .container {
    grid-column: 2 / 3;
    grid-row: 2 / 3;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 5px;

    .title {
      font-size: 30px;
      margin-top: 1rem;
      margin-bottom: 1rem;
    }

    .body {
      width: 60%;
      display: flex;
      flex-direction: column;
      align-items: center;
      .input-group {
        margin-top: 15px;
        width: 70%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        input {
          width: 100%;
          padding: 10px;
          font-family: inherit;
        }
      }
      .input-group-row {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
      }

      .link {
        margin-left: 10px;
        color: #629ecb;
        text-decoration: underline;
        cursor: pointer;
        &:hover {
          color: #95d1fe;
        }
      }

      .error-message {
        font-size: 1.5rem;
        color: red;
        text-align: center;
      }
    }

    .button {
      width: 100%;
      text-align: center;
      align-self: center;
      font-size: 2.5rem;
    }
  }
`;

export default AuthScreenContainer;
