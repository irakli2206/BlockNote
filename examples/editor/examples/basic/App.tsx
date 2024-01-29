import {
  BlockNoteEditor,
  DefaultBlockSchema,
  defaultInlineContentSchema,
  defaultInlineContentSpecs,
  DefaultStyleSchema,
  InlineContentSchema,
  InlineContentSpecs,
  uploadToTmpFilesDotOrg_DEV_ONLY,
} from "@blocknote/core";
import {
  BlockNoteDefaultUI,
  BlockNoteView,
  createReactInlineContentSpec,
  DefaultPositionedSuggestionMenu,
  SuggestionMenuItemProps,
  useBlockNote,
} from "@blocknote/react";
import "@blocknote/react/style.css";

type WindowWithProseMirror = Window & typeof globalThis & { ProseMirror: any };

const MentionInlineContent = createReactInlineContentSpec(
  {
    type: "mention",
    propSchema: {
      user: {
        default: "Unknown",
      },
    },
    content: "none",
  },
  {
    render: (props) => (
      <span style={{ backgroundColor: "#8400ff33" }}>
        @{props.inlineContent.props.user}
      </span>
    ),
  }
);

const customInlineContentSpecs = {
  ...defaultInlineContentSpecs,
  mention: MentionInlineContent,
} satisfies InlineContentSpecs;
const customInlineContentSchema = {
  ...defaultInlineContentSchema,
  mention: MentionInlineContent.config,
} satisfies InlineContentSchema;

async function getMentionMenuItems(
  editor: BlockNoteEditor<
    DefaultBlockSchema,
    typeof customInlineContentSchema,
    DefaultStyleSchema
  >,
  query: string
): Promise<SuggestionMenuItemProps[]> {
  const users = ["Steve", "Bob", "Joe", "Mike"];
  const items: SuggestionMenuItemProps[] = users.map((user) => ({
    text: user,
    executeItem: () => {
      editor._tiptapEditor.commands.insertContent({
        type: "mention",
        attrs: {
          user: user,
        },
      });
    },
    aliases: [] as string[],
  }));

  return items.filter(
    ({ text, aliases }) =>
      text.toLowerCase().startsWith(query.toLowerCase()) ||
      (aliases &&
        aliases.filter((alias) =>
          alias.toLowerCase().startsWith(query.toLowerCase())
        ).length !== 0)
  );
}

export function App() {
  const editor = useBlockNote({
    inlineContentSpecs: customInlineContentSpecs,
    domAttributes: {
      editor: {
        class: "editor",
        "data-test": "editor",
      },
    },
    uploadFile: uploadToTmpFilesDotOrg_DEV_ONLY,
  });

  // Give tests a way to get prosemirror instance
  (window as WindowWithProseMirror).ProseMirror = editor?._tiptapEditor;

  // TODO: Figure out cleaner API for adding/changing/removing menus & toolbars
  return (
    <BlockNoteView className="root" editor={editor}>
      <BlockNoteDefaultUI editor={editor} />
      <DefaultPositionedSuggestionMenu
        editor={editor}
        triggerCharacter={"@"}
        getItems={(query) => getMentionMenuItems(editor, query)}
      />
    </BlockNoteView>
  );
}

export default App;
