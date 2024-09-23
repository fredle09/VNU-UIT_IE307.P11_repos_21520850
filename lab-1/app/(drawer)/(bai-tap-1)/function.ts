/* eslint-disable prettier/prettier */
export const generateRandomPost = (id: number) => {
  const names = ['Alice', 'Bob', 'Charlie', 'Dave', 'Eva', 'Frank', 'Grace'];
  const name = names[Math.floor(Math.random() * names.length)];
  const randomLikes = Math.floor(Math.random() * 1000);
  const randomAvatarId = Math.floor(Math.random() * 100); // Generate random ID for avatar
  const randomImageId = Math.floor(Math.random() * 200) - 100; // Ensure it's different from avatar

  return {
    _id: `POST_${id}`,
    currentLikes: randomLikes,
    isLiked: Math.random() > 0.5,
    currentComments: Math.floor(Math.random() * 50),
    currentReposts: Math.floor(Math.random() * 5),
    isReposted: Math.random() > 0.5,
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.',
    name,
    userImg: `https://i.pravatar.cc/150?img=${randomAvatarId}`, // Avatar as user image
    image:
      randomImageId > 0
        ? {
          uri: `https://picsum.photos/id/${randomImageId}/1080/781`,
          width: 1080,
          height: 781,
        }
        : undefined,
  };
};
