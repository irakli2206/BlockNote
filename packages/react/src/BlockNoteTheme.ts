import { MantineThemeOverride } from "@mantine/core";

export const BlockNoteTheme: MantineThemeOverride = {
  activeStyles: {
    // Removes button press effect.
    transform: "none",
  },
  colorScheme: "light",
  colors: {
    brandFinal: [
      "#F6F6F8",
      "#ECEDF0",
      "#DFE1E6",
      "#C2C7D0",
      "#A6ADBA",
      "#8993A4",
      "#6D798F",
      "#505F79",
      "#344563",
      "#172B4D",
    ],
    textColors: [
      "#37352f",
      "#9b9a97",
      "#64473a",
      "#e03e3e",
      "#d9730d",
      "#dfab01",
      "#4d6461",
      "#0b6e99",
      "#6940a5",
      "#ad1a72",
    ],
    backgroundColors: [
      "#ffffff",
      "#ebeced",
      "#e9e5e3",
      "#fbe4e4",
      "#f6e9d9",
      "#fbf3db",
      "#ddedea",
      "#ddebf1",
      "#eae4f2",
      "#f4dfeb",
    ],
  },
  components: {
    Menu: {
      styles: (theme) => ({
        dropdown: {
          backgroundColor: "white",
          boxShadow: `0px 4px 8px ${theme.colors.brandFinal[2]}, 0px 0px 1px ${theme.colors.brandFinal[2]}`,
          border: `1px solid ${theme.colors.brandFinal[1]}`,
          borderRadius: "6px",
          padding: "2px",
        },
      }),
    },
    DragHandleMenu: {
      styles: (theme) => ({
        root: {
          ".mantine-Menu-item": {
            color: theme.colors.brandFinal,
            fontSize: "12px",
            height: "30px",
          },
        },
      }),
    },
    EditHyperlinkMenu: {
      styles: (theme) => ({
        root: {
          backgroundColor: "white",
          boxShadow: `0px 4px 8px ${theme.colors.brandFinal[2]}, 0px 0px 1px ${theme.colors.brandFinal[2]}`,
          border: `1px solid ${theme.colors.brandFinal[1]}`,
          borderRadius: "6px",
          gap: "4px",
          minWidth: "145px",
          padding: "2px",
          // Row
          ".mantine-Group-root": {
            flexWrap: "nowrap",
            gap: "8px",
            paddingInline: "6px",
            // Row icon
            ".mantine-Container-root": {
              color: theme.colors.brandFinal,
              display: "flex",
              justifyContent: "center",
              padding: "0",
              width: "fit-content",
            },
            // Row input field
            ".mantine-TextInput-root": {
              background: "transparent",
              width: "300px",
              ".mantine-TextInput-wrapper": {
                ".mantine-TextInput-input": {
                  fontSize: "12px",
                  border: 0,
                  padding: 0,
                },
              },
            },
          },
        },
      }),
    },
    Toolbar: {
      styles: (theme) => ({
        root: {
          backgroundColor: "white",
          boxShadow: `0px 4px 8px ${theme.colors.brandFinal[2]}, 0px 0px 1px ${theme.colors.brandFinal[2]}`,
          border: `1px solid ${theme.colors.brandFinal[1]}`,
          borderRadius: "6px",
          flexWrap: "nowrap",
          gap: "2px",
          padding: "2px",
          width: "fit-content",
          // Button (including dropdown target)
          ".mantine-UnstyledButton-root": {
            borderRadius: "4px",
          },
          // Dropdown
          ".mantine-Menu-dropdown": {
            // Dropdown item
            ".mantine-Menu-item": {
              color: theme.colors.brandFinal,
              fontSize: "12px",
              height: "30px",
              ".mantine-Menu-itemRightSection": {
                paddingLeft: "5px",
              },
            },
          },
        },
      }),
    },
    Tooltip: {
      styles: (theme) => ({
        root: {
          color: theme.colors.brandFinal[2],
          backgroundColor: theme.colors.brandFinal,
          border: `1px solid ${theme.colors.brandFinal[1]}`,
          borderRadius: "6px",
          boxShadow: `0px 4px 8px ${theme.colors.brandFinal[2]}, 0px 0px 1px ${theme.colors.brandFinal[2]}`,
          padding: "4px 10px",
          textAlign: "center",
          "div ~ div": {
            color: theme.colors.brandFinal[4],
          },
        },
      }),
    },
    SlashMenu: {
      styles: (theme) => ({
        root: {
          // ...theme.other.defaultMenuStyles(theme),
          ".mantine-Menu-item": {
            // Icon
            ".mantine-Menu-itemIcon": {
              padding: "8px",
              border: `1px solid ${theme.colors.brandFinal[2]}`,
              backgroundColor: theme.colors.brandFinal[0],
              borderRadius: "4px",
              color: theme.colors.brandFinal,
            },
            // Text
            ".mantine-Menu-itemLabel": {
              color: theme.colors.brandFinal,
              paddingRight: "16px",
              ".mantine-Stack-root": {
                gap: "0",
              },
            },
            // Badge (keyboard shortcut)
            ".mantine-Menu-itemRightSection": {
              ".mantine-Badge-root": {
                border: `1px solid ${theme.colors.brandFinal[2]}`,
              },
            },
          },
        },
      }),
    },
  },
  fontFamily: "Inter",
  globalStyles: (theme) => {
    const textColors: Record<string, any> = {};
    const backgroundColors: Record<string, any> = {};

    for (const color in theme.other.colorIndex) {
      textColors[`[data-text-color="${color}"]`] = {
        color: theme.colors["textColors"][theme.other.colorIndex[color]],
      };
      backgroundColors[`[data-background-color="${color}"]`] = {
        backgroundColor:
          theme.colors["backgroundColors"][theme.other.colorIndex[color]],
      };
    }

    const textAlignments: Record<string, any> = {};

    for (const alignment of ["left", "center", "right", "justify"]) {
      textAlignments[`[data-text-alignment="${alignment}"]`] = {
        textAlign: alignment,
      };
    }

    return {
      ...textColors,
      ...backgroundColors,
      ...textAlignments,
    };
  },
  other: {
    colorIndex: {
      default: 0,
      gray: 1,
      brown: 2,
      red: 3,
      orange: 4,
      yellow: 5,
      green: 6,
      blue: 7,
      purple: 8,
      pink: 9,
    },
  },
  primaryColor: "brandFinal",
  primaryShade: 9,
};
