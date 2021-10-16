export const getChannelLists = async () => {
  const response = await fetch(`${process.env.REACT_APP_CHANNELLIST_API}`);

  return response.json();
};

export const addChannelList = async (channelList) => {
  console.log('API addChannel: ', channelList);

  const response = await fetch(`${process.env.REACT_APP_CHANNELLIST_API}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(channelList),
  });

  return response.json();
};
