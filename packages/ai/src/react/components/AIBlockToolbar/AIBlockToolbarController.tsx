import { BlockSchema, InlineContentSchema, StyleSchema } from "@blocknote/core";
import {
  useBlockNoteEditor,
  useUIElementPositioning,
  useUIPluginState,
} from "@blocknote/react";
import { flip, offset } from "@floating-ui/react";
import { FC } from "react";

import { AIBlockToolbarProsemirrorPlugin } from "../../../core";

import { AIBlockToolbar } from "./AIBlockToolbar";
import { AIBlockToolbarProps } from "./AIBlockToolbarProps";

export const AIBlockToolbarController = (props: {
  aiToolbar?: FC<AIBlockToolbarProps>;
}) => {
  const editor = useBlockNoteEditor<
    BlockSchema,
    InlineContentSchema,
    StyleSchema
  >();

  if (!editor.extensions.aiBlockToolbar) {
    throw new Error(
      "AIToolbarController can only be used when BlockNote editor schema contains an AI block"
    );
  }

  // TODO
  const state = useUIPluginState(
    (
      editor.extensions.aiBlockToolbar as AIBlockToolbarProsemirrorPlugin
    ).onUpdate.bind(
      editor.extensions.aiBlockToolbar as AIBlockToolbarProsemirrorPlugin
    )
  );

  const { isMounted, ref, style, getFloatingProps } = useUIElementPositioning(
    state?.show || false,
    state?.referencePos || null,
    3000,
    {
      placement: "top-end",
      middleware: [offset(10), flip()],
      onOpenChange: (open) => {
        if (!open) {
          editor.linkToolbar.closeMenu();
          editor.focus();
        }
      },
    }
  );

  if (!isMounted || !state) {
    return null;
  }

  const { prompt } = state;

  const Component = props.aiToolbar || AIBlockToolbar;

  return (
    <div ref={ref} style={style} {...getFloatingProps()}>
      <Component prompt={prompt!} />
    </div>
  );
};
