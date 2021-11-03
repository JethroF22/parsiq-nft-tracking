export const fetchUserAddresses = async (userId: string) => {
  const response = await fetch('/api/get_addresses', {
    headers: {
      Authorization: `Bearer ${process.env.PARSIQ_API_KEY}`,
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({ userId }),
  });
  const result = await response.json();
  console.log('result', result);
  return result;
};
