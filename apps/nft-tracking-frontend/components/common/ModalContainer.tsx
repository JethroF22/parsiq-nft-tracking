import styled from 'styled-components';

export default styled.div`
  background: rgba(0, 0, 0, 0.1);
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  width: 100%;
  height: 100%;
  .modal-close {
  position: absolute;
  right: 6px;
  top: 9px;
  cursor: pointer;
  border: none;
  font-size: 20px;

  .modal-body {
    width: 300px;
    height: 300px;
    box-shadow: 0 5px 10px 2px rgba(195,192,192,.5);
    padding: 20px;
    text-align: center;
  }
`;
