// add a channel to the database

export const addChannel = async (channel) => {
  console.log('API addChannel: ', channel);

  const response = await fetch(`${process.env.REACT_APP_CHANNEL_API}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(channel),
  });

  return response.json();
};

export const getAllChannels = async () => {
  const response = await fetch(`${process.env.REACT_APP_CHANNEL_API}`);

  return response.json();
};
