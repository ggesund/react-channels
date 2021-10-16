// alle CRUD Funktionen für Images (z.B. Channel Logos)
export const getAllImages = async () => {
  const response = await fetch(`${process.env.REACT_APP_IMAGE_API}`);

  return response.json();
};

// get only image id and originalName for dropdownlist
export const getImageIdAndName = async () => {
  const response = await fetch(`${process.env.REACT_APP_IMAGE_API}/idandname`);

  return response.json();
};

export const uploadImage = async (image) => {
  console.log('API uploadImage: ', image);

  const response = await fetch(`${process.env.REACT_APP_IMAGE_API}/upload`, {
    method: 'POST',
    body: image,
  });

  return response.json();
};

export const deleteImage = async (imageId) => {
  const response = await fetch(
    `${process.env.REACT_APP_IMAGE_API}/${imageId}`,
    {
      method: 'DELETE',
    }
  );

  return response.json();
};
