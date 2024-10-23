import {
  DefaultInlineContentSchema,
  DefaultStyleSchema,
} from "@blocknote/core";
import { Link } from "@react-email/components";
import { InlineContentMapping } from "../../mapping.js";

export const reactEmailInlineContentMappingForDefaultSchema: InlineContentMapping<
  DefaultInlineContentSchema,
  DefaultStyleSchema,
  React.ReactElement<typeof Link> | React.ReactElement<HTMLSpanElement>,
  React.ReactElement<HTMLSpanElement>
> = {
  link: (ic, t) => {
    return (
      <Link href={ic.href}>
        {...ic.content.map((content) => {
          return t.transformStyledText(content);
        })}
      </Link>
    );
  },
  text: (ic, t) => {
    return t.transformStyledText(ic);
  },
};
