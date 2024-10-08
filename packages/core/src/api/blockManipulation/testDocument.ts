import { PartialBlock } from "../../blocks/defaultBlocks.js";

export const testDocument: PartialBlock[] = [
  {
    id: "paragraph-0",
    type: "paragraph",
    content: "Paragraph 0",
  },
  {
    id: "paragraph-1",
    type: "paragraph",
    content: "Paragraph 1",
  },
  {
    id: "paragraph-with-children",
    type: "paragraph",
    content: "Paragraph with children",
    children: [
      {
        id: "nested-paragraph-1",
        type: "paragraph",
        content: "Nested Paragraph 1",
        children: [
          {
            id: "double-nested-paragraph-1",
            type: "paragraph",
            content: "Double Nested Paragraph 1",
          },
        ],
      },
    ],
  },
  {
    id: "paragraph-2",
    type: "paragraph",
    content: "Paragraph 2",
  },
  {
    id: "paragraph-with-props",
    type: "paragraph",
    props: {
      textColor: "red",
    },
    content: "Paragraph with props",
  },
  {
    id: "paragraph-3",
    type: "paragraph",
    content: "Paragraph 3",
  },
  {
    id: "paragraph-with-styled-content",
    type: "paragraph",
    content: [
      { type: "text", text: "Paragraph", styles: { bold: true } },
      { type: "text", text: " with styled ", styles: {} },
      { type: "text", text: "content", styles: { italic: true } },
    ],
  },
  {
    id: "paragraph-4",
    type: "paragraph",
    content: "Paragraph 4",
  },
  {
    id: "heading-0",
    type: "paragraph",
    content: "Heading 1",
  },
  {
    id: "paragraph-5",
    type: "paragraph",
    content: "Paragraph 5",
  },
  {
    id: "image-0",
    type: "image",
    props: {
      url: "https://via.placeholder.com/150",
    },
  },
  {
    id: "paragraph-6",
    type: "paragraph",
    content: "Paragraph 6",
  },
  {
    id: "table-0",
    type: "table",
    content: {
      type: "tableContent",
      rows: [
        {
          cells: ["Cell 1", "Cell 2", "Cell 3"],
        },
        {
          cells: ["Cell 4", "Cell 5", "Cell 6"],
        },
        {
          cells: ["Cell 7", "Cell 8", "Cell 9"],
        },
      ],
    },
  },
  {
    id: "paragraph-7",
    type: "paragraph",
    content: "Paragraph 7",
  },
  {
    id: "trailing-paragraph",
    type: "paragraph",
  },
];
