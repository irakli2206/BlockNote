import {
  BlockNoteEditor,
  BlockSchema,
  getDefaultSlashMenuItems,
  InlineContentSchema,
  StyleSchema,
} from "@blocknote/core";
import {
  RiH1,
  RiH2,
  RiH3,
  RiImage2Fill,
  RiListOrdered,
  RiListUnordered,
  RiTable2,
  RiText,
} from "react-icons/ri";
import { IconType } from "react-icons";
import { DefaultReactSuggestionItem } from "./types";

const icons: Record<string, IconType> = {
  "Heading 1": RiH1,
  "Heading 2": RiH2,
  "Heading 3": RiH3,
  "Numbered List": RiListOrdered,
  "Bullet List": RiListUnordered,
  Paragraph: RiText,
  Table: RiTable2,
  Image: RiImage2Fill,
};

export function getDefaultReactSlashMenuItems<
  BSchema extends BlockSchema,
  I extends InlineContentSchema,
  S extends StyleSchema
>(
  editor: BlockNoteEditor<BSchema, I, S>
): DefaultReactSuggestionItem<BSchema, I, S>[] {
  return getDefaultSlashMenuItems(editor).map((item) => {
    const Icon = icons[item.title];
    return {
      ...item,
      icon: <Icon size={18} />,
    };
  });
}