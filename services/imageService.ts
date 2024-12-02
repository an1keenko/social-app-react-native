export const getUserImageSrc = (imagePath: string) => {
  if (imagePath) {
    return { uri: imagePath };
  } else {
    return require('@/assets/images/defaultUser.png');
  }
};

export const uploadFile = async (folderName, filiUri, isImage = true) => {
  try {
    let fileName = getFilePath(folderName, isImage);
  } catch (error) {
    console.log('file upload error: ', error);
    return { success: false, msg: 'Could not upload media' };
  }
};

export const getFilePath = (folderName, isImage) => {
  return `${folderName}/${new Date().getTime()}.${isImage ? '.png' : 'mp4'}`;
};
