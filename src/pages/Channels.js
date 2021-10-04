import { Fragment, useEffect, useState } from 'react';

import { getAllChannels } from '../api/apiChannel';

const Channels = (props) => {
  const [allChannels, setAllChannels] = useState([]);

  useEffect(() => {
    loadAllChannels();
  }, []);

  const loadAllChannels = () => {
    getAllChannels()
      .then((res) => {
        // console.log(res);

        if (res.status === 'ok') {
          setAllChannels(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Fragment>
      <div>List all channels</div>
      <p>{JSON.stringify(allChannels)}</p>
    </Fragment>
  );
};

export default Channels;
