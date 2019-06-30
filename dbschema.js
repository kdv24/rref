//  storing these here allows for less reads on the firebase db, therefore
//  costing us less

let db = {
  posts: [
    {
      userHandle: 'user',
      body: 'this is the post body',
      createdAt: '2019-06-30T21:50:41.944Z',
      likeCount: 5,
      commentCount: 2,
    },
  ],
};
