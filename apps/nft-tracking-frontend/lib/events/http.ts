export const fetchUserEvents = async (userId: string) => {
  const response = await fetch('/api/get_events', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({ userId }),
  });
  const result = await response.json();
  console.log('result', result);
  return result;
};
