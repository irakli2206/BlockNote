import { Node } from "@tiptap/core";
import { ParseRule } from "@tiptap/pm/model";
import { nodeToCustomInlineContent } from "../../../../api/nodeConversions/nodeConversions";
import { propsToAttributes } from "../blocks/internal";
import { Props } from "../blocks/types";
import { StyleSchema } from "../styles/types";
import {
  addInlineContentAttributes,
  createInlineContentSpecFromTipTapNode,
} from "./internal";
import {
  CustomInlineContentConfig,
  InlineContentConfig,
  InlineContentFromConfig,
  InlineContentSpec,
} from "./types";

// TODO: support serialization

export type CustomInlineContentImplementation<
  T extends InlineContentConfig,
  // B extends BlockSchema,
  // I extends InlineContentSchema,
  S extends StyleSchema
> = {
  render: (
    /**
     * The custom inline content to render
     */
    inlineContent: InlineContentFromConfig<T, S>
    /**
     * The BlockNote editor instance
     * This is typed generically. If you want an editor with your custom schema, you need to
     * cast it manually, e.g.: `const e = editor as BlockNoteEditor<typeof mySchema>;`
     */
    // editor: BlockNoteEditor<B, I, S>
    // (note) if we want to fix the manual cast, we need to prevent circular references and separate block definition and render implementations
    // or allow manually passing <BSchema>, but that's not possible without passing the other generics because Typescript doesn't support partial inferred generics
  ) => {
    dom: HTMLElement;
    contentDOM?: HTMLElement;
    // destroy?: () => void;
  };
};

export function getInlineContentParseRules(
  config: CustomInlineContentConfig
): ParseRule[] {
  return [
    {
      tag: `.bn-inline-content-section[data-inline-content-type="${config.type}"]`,
    },
  ];
}

export function createInlineContentSpec<
  T extends CustomInlineContentConfig,
  S extends StyleSchema
>(
  inlineContentConfig: T,
  inlineContentImplementation: CustomInlineContentImplementation<T, S>
): InlineContentSpec<T> {
  const node = Node.create({
    name: inlineContentConfig.type,
    inline: true,
    group: "inline",
    content:
      inlineContentConfig.content === "styled"
        ? "inline*"
        : ("inline" as T["content"] extends "styled" ? "inline*" : "inline"),

    addAttributes() {
      return propsToAttributes(inlineContentConfig.propSchema);
    },

    parseHTML() {
      return getInlineContentParseRules(inlineContentConfig);
    },

    renderHTML({ node }) {
      const editor = this.options.editor;

      const output = inlineContentImplementation.render(
        nodeToCustomInlineContent(
          node,
          editor.inlineContentSchema,
          editor.styleSchema
        ) as any as InlineContentFromConfig<T, S> // TODO: fix cast
      );

      return {
        dom: addInlineContentAttributes(
          output.dom,
          inlineContentConfig.type,
          node.attrs as Props<T["propSchema"]>,
          inlineContentConfig.propSchema
        ),
        contentDOM: output.contentDOM,
      };
    },
  });

  return createInlineContentSpecFromTipTapNode(
    node,
    inlineContentConfig.propSchema
  ) as InlineContentSpec<T>; // TODO: fix cast
}