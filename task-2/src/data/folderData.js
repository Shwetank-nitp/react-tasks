export const folderData = {
  name: "root",
  type: "folder",
  children: [
    {
      name: "foo.txt",
      type: "file",
      children: [],
    },
    {
      name: "src",
      type: "folder",
      children: [
        {
          name: "foo.txt",
          type: "file",
          children: [],
        },
        {
          name: "public",
          type: "folder",
          children: [
            {
              name: "foo.txt",
              type: "file",
              children: [],
            },
          ],
        },
        {
          name: "documents",
          type: "folder",
          children: [
            {
              name: "boo.txt",
              type: "file",
              children: [],
            },
            {
              name: "doc.txt",
              type: "file",
              children: [],
            },
          ],
        },
        {
          name: "foo.txt",
          type: "file",
          children: [],
        },
      ],
    },
  ],
};
