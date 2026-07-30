import React, { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import {
  Check,
  ContentCopy,
  Description,
  ErrorOutline,
  ExpandMore,
} from '@mui/icons-material';

import { usePageMarkdown } from './usePageMarkdown';
import {
  ALIGNMENT_TO_JUSTIFY_CONTENT,
  DEFAULT_AI_TARGETS,
  DEFAULT_ALIGN,
  DEFAULT_LABELS,
  defaultBuildPrompt,
} from './config';

// Stable identities, so optional array props do not invalidate the memo.
const NO_ACTIONS = [];

const NO_ACTION_IDS = [];

// Vercel-docs-like proportions (roomy padding, 13px label, small quiet icons),
// expressed in Infima tokens so the control follows the docs theme in light and
// dark mode instead of the MUI palette.
const buttonGroupStyles = {
  borderRadius: '6px',
  '& .MuiButton-root': {
    textTransform: 'none',
    fontFamily: 'var(--ifm-font-family-base)',
    fontSize: '0.8125rem',
    fontWeight: 500,
    lineHeight: 1,
    letterSpacing: 0,
    minHeight: 32,
    px: 1.5,
    py: 0,
    color: 'var(--ifm-font-color-base)',
    borderColor: 'var(--ifm-color-emphasis-300)',
    '&:hover': {
      borderColor: 'var(--ifm-color-emphasis-500)',
      backgroundColor: 'var(--ifm-hover-overlay)',
    },
  },
  '& .MuiSvgIcon-root': {
    fontSize: 15,
    color: 'var(--ifm-color-emphasis-700)',
  },
  '& .MuiButton-startIcon': {
    mr: 0.75,
    ml: -0.25,
  },
  '& .MuiButton-root:not(:last-of-type)': {
    borderRightColor: 'var(--ifm-color-emphasis-300)',
  },
  // The caret button holds only an icon, so it overrides the MUI group minimum.
  '& .MuiButton-root:last-of-type, & .MuiButtonGroup-grouped:last-of-type': {
    px: 0.5,
    minWidth: 30,
  },
};

const copiedStyles = {
  '& .MuiButton-root, & .MuiSvgIcon-root': {
    color: 'var(--ifm-color-primary)',
  },
};

const menuStyles = {
  '& .MuiPaper-root': {
    mt: 0.75,
    p: 0.5,
    minWidth: 232,
    borderRadius: '8px',
    border: '1px solid var(--ifm-color-emphasis-200)',
    backgroundColor: 'var(--ifm-background-surface-color)',
    backgroundImage: 'none',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.12)',
  },
  '& .MuiList-root': {
    py: 0,
  },
  '& .MuiMenuItem-root': {
    fontFamily: 'var(--ifm-font-family-base)',
    fontSize: '0.8125rem',
    fontWeight: 450,
    color: 'var(--ifm-font-color-base)',
    borderRadius: '5px',
    minHeight: 34,
    px: 1,
    py: 0.75,
    gap: 0,
    '&:hover': {
      backgroundColor: 'var(--ifm-hover-overlay)',
    },
  },
  '& .MuiListItemIcon-root': {
    color: 'var(--ifm-color-emphasis-700)',
    minWidth: 26,
  },
  '& .MuiSvgIcon-root': {
    fontSize: 15,
  },
};

/**
 * "Copy page" button: exports the current doc page as clean Markdown for
 * ChatGPT, Claude, and Gemini, converted client-side from the rendered HTML (no
 * build step).
 *
 * The default UI over {@link usePageMarkdown}. Labels, AI targets, and styling
 * are props; the action list can be extended (`extraActions`), trimmed
 * (`excludeActionIds`), or replaced (`actions`). For a different UI, use the
 * hook directly. Mounted site wide by `src/theme/DocItem/Content/index.js`, or
 * drop `<CopyPageButton align='left' />` into any MDX page.
 */
export function CopyPageButton({
  // Content and conversion.
  contentSelector,
  converterOverrides,
  includeSource,
  buildSourceNote,
  statusResetMs,

  // Copy targets and wording.
  aiTargets = DEFAULT_AI_TARGETS,
  buildPrompt = defaultBuildPrompt,
  labels: labelOverrides,

  // Action list.
  actions: actionsOverride,
  extraActions = NO_ACTIONS,
  excludeActionIds = NO_ACTION_IDS,
  primaryActionId = 'copy',
  showMenu = true,

  // Presentation.
  align = DEFAULT_ALIGN,
  variant = 'outlined',
  size = 'small',
  color = 'inherit',
  sx,
  buttonSx,
  className,
}) {
  const [anchorElement, setAnchorElement] = useState(null);

  const {
    copyStatus,
    getPage,
    getMarkdown,
    copyMarkdown,
    openMarkdown,
    openInAssistant,
  } = usePageMarkdown({
    contentSelector,
    converterOverrides,
    includeSource,
    buildSourceNote,
    statusResetMs,
  });

  const labels = useMemo(() => {
    return { ...DEFAULT_LABELS, ...labelOverrides };
  }, [labelOverrides]);

  const closeMenu = () => {
    setAnchorElement(null);
  };

  const actions = useMemo(() => {
    const defaultActions = [
      {
        id: 'copy',
        label: labels.copyMarkdown,
        icon: <ContentCopy fontSize='small' />,
        onSelect: () => {
          return copyMarkdown();
        },
      },
      {
        id: 'view',
        label: labels.viewMarkdown,
        icon: <Description fontSize='small' />,
        onSelect: () => {
          return openMarkdown();
        },
      },
      ...aiTargets.map((target) => {
        return {
          id: target.id,
          label: target.label,
          icon: target.icon,
          onSelect: () => {
            return openInAssistant(target, buildPrompt);
          },
        };
      }),
    ];

    const baseActions = actionsOverride || defaultActions;

    return [...baseActions, ...extraActions].filter((action) => {
      return !excludeActionIds.includes(action.id);
    });
  }, [
    labels,
    aiTargets,
    buildPrompt,
    actionsOverride,
    extraActions,
    excludeActionIds,
    copyMarkdown,
    openMarkdown,
    openInAssistant,
  ]);

  const primaryAction =
    actions.find((action) => {
      return action.id === primaryActionId;
    }) || actions[0];

  const menuActions = actions.filter((action) => {
    return action.id !== primaryAction?.id;
  });

  // Custom actions get the same helpers the built-in ones use, so adding, say,
  // "Copy for Slack" needs no reimplementation of the conversion.
  const runAction = async (action) => {
    await action.onSelect({ getPage, getMarkdown, closeMenu });

    closeMenu();
  };

  const primaryLabel = {
    copied: labels.copied,
    error: labels.copyFailed,
  }[copyStatus];

  const primaryIcon = {
    copied: <Check fontSize='small' />,
    error: <ErrorOutline fontSize='small' />,
  }[copyStatus];

  if (!primaryAction) {
    return null;
  }

  return (
    <Box
      className={['copy-page-button-root', className].filter(Boolean).join(' ')}
      sx={{
        display: 'flex',
        justifyContent:
          ALIGNMENT_TO_JUSTIFY_CONTENT[align] ||
          ALIGNMENT_TO_JUSTIFY_CONTENT[DEFAULT_ALIGN],
        mb: 1.5,
        ...sx,
      }}
    >
      <ButtonGroup
        variant={variant}
        size={size}
        color={color}
        disableRipple
        sx={{
          ...buttonGroupStyles,
          ...(copyStatus === 'copied' ? copiedStyles : null),
          ...buttonSx,
        }}
      >
        <Tooltip title={copyStatus === 'error' ? labels.copyFailed : ''}>
          <Button
            onClick={() => {
              return runAction(primaryAction);
            }}
            startIcon={primaryIcon || <ContentCopy fontSize='small' />}
          >
            {primaryLabel || labels.copyPage}
          </Button>
        </Tooltip>

        {showMenu && menuActions.length > 0 && (
          <Button
            onClick={(event) => {
              setAnchorElement(event.currentTarget);
            }}
            aria-label={labels.moreOptions}
            aria-haspopup='menu'
            aria-expanded={Boolean(anchorElement)}
          >
            <ExpandMore fontSize='small' />
          </Button>
        )}
      </ButtonGroup>

      <Menu
        anchorEl={anchorElement}
        open={Boolean(anchorElement)}
        onClose={closeMenu}
        sx={menuStyles}
      >
        {menuActions.map((action) => {
          return (
            <MenuItem
              key={action.id}
              onClick={() => {
                return runAction(action);
              }}
            >
              {action.icon && <ListItemIcon>{action.icon}</ListItemIcon>}
              <ListItemText>{action.label}</ListItemText>
            </MenuItem>
          );
        })}
      </Menu>
    </Box>
  );
}

export default CopyPageButton;
