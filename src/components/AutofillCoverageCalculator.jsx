import React, { useEffect, useRef, useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
  Slider,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Mermaid from '@theme/Mermaid';

const BRAND_COLOR = 'var(--ifm-color-primary)';
const BRAND_FONT = 'var(--ifm-font-family-base)';
const TEXT_COLOR = 'var(--ifm-font-color-base)';
const MUTED_TEXT_COLOR = 'var(--ifm-color-emphasis-700)';
const BORDER_COLOR = 'var(--ifm-color-emphasis-300)';
const AUTOFILL_CARRIER_SUPPORT = 70;
const SILENT_CARRIER_SUPPORT = 100;
const SMS_COVERAGE = 100;
const SLIDERS_MAX_WIDTH = 420;

const STEP_SX = { fontWeight: 700, color: TEXT_COLOR, mt: 0, mb: 1 };

const SLIDER_SX = {
  color: BRAND_COLOR,
  '& .MuiSlider-thumb': {
    backgroundColor: BRAND_COLOR,
    '&:hover, &.Mui-focusVisible': {
      boxShadow: '0 0 0 8px rgba(13, 188, 61, 0.16)',
    },
  },
  '& .MuiSlider-track': {
    backgroundColor: BRAND_COLOR,
    borderColor: BRAND_COLOR,
  },
  '& .MuiSlider-rail': {
    backgroundColor: BORDER_COLOR,
    opacity: 1,
  },
};

const CHECKBOX_SX = {
  color: 'var(--ifm-color-emphasis-400)',
  padding: '4px',
  '&.Mui-checked': { color: BRAND_COLOR },
};

const FORM_CONTROL_LABEL_SX = { ml: 0 };

const DEFAULTS = {
  offersNative: true,
  offersWeb: false,
  manualNativeMobile: 50,
  webCellular: 50,
};

function round(value) {
  return Math.round(value);
}

function computeCoverage(nativeMobileFraction, webCellularFraction, carrierSupport) {
  const carrierSupportFraction = carrierSupport / 100;
  const nativeMobileTerm = nativeMobileFraction * carrierSupportFraction * 100;
  const webTerm = (1 - nativeMobileFraction) * webCellularFraction * carrierSupportFraction * 100;
  return round(nativeMobileTerm + webTerm);
}

const SANKEY_ROOT_LABEL = '100 Users';
const SANKEY_LABELS = {
  autofillSuccess: 'Succeed with Autofill',
  silentSuccess: 'Succeed with Silent',
  smsSuccess: 'Succeed with SMS',
  notReachedByAutofill: 'Not Reached by Autofill',
  notReachedBySilent: 'Not Reached by Silent',
  unreached: 'Unreached',
};

const SANKEY_GRAY = MUTED_TEXT_COLOR;
const SANKEY_LIGHT_GRAY = BORDER_COLOR;
const SANKEY_NODE_COLORS = {
  [SANKEY_ROOT_LABEL]: SANKEY_LIGHT_GRAY,
  [SANKEY_LABELS.notReachedByAutofill]: 'var(--ifm-color-warning)',
  [SANKEY_LABELS.notReachedBySilent]: 'var(--ifm-color-danger)',
  [SANKEY_LABELS.unreached]: 'var(--ifm-color-danger)',
  [SANKEY_LABELS.autofillSuccess]: 'var(--ifm-color-success)',
  [SANKEY_LABELS.silentSuccess]: 'var(--ifm-color-success)',
  [SANKEY_LABELS.smsSuccess]: 'var(--ifm-color-success)',
};

// These nodes only carry the "leftover" users forward (or, for the root, describe
// the whole cohort), so they're labeled with just their percentage, not a name.
const SANKEY_PERCENT_ONLY_LABELS = new Set([
  SANKEY_ROOT_LABEL,
  SANKEY_LABELS.notReachedByAutofill,
  SANKEY_LABELS.notReachedBySilent,
]);

function nodeValue(label, links) {
  if (label === SANKEY_ROOT_LABEL) return 100;
  return links
    .filter(([, target]) => target === label)
    .reduce((sum, [, , value]) => sum + value, 0);
}

function buildWaterfallLinks(autofillCoverage, silentCoverage, smsCoverage) {
  const links = [];

  const autofillSuccess = autofillCoverage;
  const afterAutofill = 100 - autofillSuccess;
  if (autofillSuccess > 0) links.push([SANKEY_ROOT_LABEL, SANKEY_LABELS.autofillSuccess, autofillSuccess]);
  if (afterAutofill > 0) links.push([SANKEY_ROOT_LABEL, SANKEY_LABELS.notReachedByAutofill, afterAutofill]);

  if (afterAutofill > 0) {
    const silentSuccess = round((afterAutofill * silentCoverage) / 100);
    const afterSilent = afterAutofill - silentSuccess;
    if (silentSuccess > 0) {
      links.push([SANKEY_LABELS.notReachedByAutofill, SANKEY_LABELS.silentSuccess, silentSuccess]);
    }
    if (afterSilent > 0) {
      links.push([SANKEY_LABELS.notReachedByAutofill, SANKEY_LABELS.notReachedBySilent, afterSilent]);

      const smsSuccess = round((afterSilent * smsCoverage) / 100);
      const afterSms = afterSilent - smsSuccess;
      if (smsSuccess > 0) links.push([SANKEY_LABELS.notReachedBySilent, SANKEY_LABELS.smsSuccess, smsSuccess]);
      if (afterSms > 0) links.push([SANKEY_LABELS.notReachedBySilent, SANKEY_LABELS.unreached, afterSms]);
    }
  }

  return links;
}

function sankeyDiagramText(links) {
  const rows = links.map(([source, target, value]) => `${source},${target},${value}`).join('\n');

  return `%%{init: {'themeVariables': {'fontFamily': 'Lato'}, 'sankey': {'suffix': '%'}}}%%
sankey-beta

${rows}`;
}

function nodeOrderFromLinks(links) {
  const order = [];
  links.forEach(([source, target]) => {
    if (!order.includes(source)) order.push(source);
    if (!order.includes(target)) order.push(target);
  });
  return order;
}

// Mermaid re-renders the whole diagram (and its default colors/labels) into the DOM
// asynchronously on every value change, so we recolor/hide nodes after each render
// rather than fighting the library's limited per-node theming support.
function useSankeyStyling(containerRef, links) {
  const linksRef = useRef(links);
  linksRef.current = links;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    function applyStyling() {
      const currentLinks = linksRef.current;
      const svg = container.querySelector('svg[aria-roledescription="sankey"]');
      if (!svg) return false;

      const nodeOrder = nodeOrderFromLinks(currentLinks);
      const nodeGroups = svg.querySelectorAll('.nodes > .node');
      const labelTexts = svg.querySelectorAll('.node-labels > text');
      const linkPaths = svg.querySelectorAll('.links > .link > path');
      if (nodeGroups.length !== nodeOrder.length || linkPaths.length !== currentLinks.length) {
        return false;
      }

      // Let the diagram grow to fill its container instead of Mermaid's fixed cap.
      svg.style.maxWidth = 'none';

      nodeOrder.forEach((label, i) => {
        const group = nodeGroups[i];
        const rect = group.querySelector('rect');
        const text = labelTexts[i];
        if (!rect) return;

        rect.setAttribute('fill', SANKEY_NODE_COLORS[label] || SANKEY_GRAY);
        if (!text) return;

        const value = nodeValue(label, currentLinks);
        const newText = SANKEY_PERCENT_ONLY_LABELS.has(label) ? `${value}%` : `${value}% ${label}`;
        // Setting textContent replaces child nodes, which the MutationObserver below
        // is watching for — skip the write when it's already correct to avoid a loop.
        if (text.textContent !== newText) {
          text.textContent = newText;
        }

        // Put every label to the right of its line, regardless of Mermaid's default anchor.
        const nodeX = parseFloat(group.getAttribute('x') || '0');
        const rectWidth = parseFloat(rect.getAttribute('width') || '0');
        text.setAttribute('x', nodeX + rectWidth + 10);
        text.setAttribute('text-anchor', 'start');
      });
      currentLinks.forEach(([, target], i) => {
        linkPaths[i]?.setAttribute('stroke', SANKEY_NODE_COLORS[target] || SANKEY_GRAY);
      });

      // Widen the canvas so labels pushed to the right of the rightmost column aren't clipped.
      const viewBoxParts = (svg.getAttribute('viewBox') || '').split(' ').map(Number);
      if (viewBoxParts.length === 4) {
        const [minX, minY, width, height] = viewBoxParts;
        let maxRight = width;
        labelTexts.forEach((text) => {
          const bbox = text.getBBox();
          maxRight = Math.max(maxRight, bbox.x + bbox.width);
        });
        const paddedWidth = maxRight + 16;
        if (paddedWidth > width) {
          svg.setAttribute('viewBox', `${minX} ${minY} ${paddedWidth} ${height}`);
        }
      }

      return true;
    }

    applyStyling();

    const observer = new MutationObserver(() => {
      applyStyling();
    });
    observer.observe(container, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [containerRef]);
}

function ChannelResult({ label, value, caption }) {
  return (
    <Box sx={{ flex: 1, minWidth: 0 }}>
      <Typography variant="body2" sx={{ fontWeight: 700, color: TEXT_COLOR, m: 0 }}>
        {label}
      </Typography>
      <Typography variant="h4" sx={{ fontWeight: 700, color: BRAND_COLOR, m: 0 }}>
        {value}%
      </Typography>
      <Typography variant="caption" sx={{ color: MUTED_TEXT_COLOR, lineHeight: 1.3, display: 'block', m: 0 }}>
        {caption}
      </Typography>
    </Box>
  );
}

function SliderRow({ label, value, onChange, disabled, notApplicable }) {
  return (
    <Box sx={{ opacity: disabled ? 0.4 : 1 }}>
      <Typography variant="body1" sx={{ color: TEXT_COLOR }}>
        {label}
      </Typography>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Typography variant="body1" sx={{ color: TEXT_COLOR, minWidth: 40 }}>
          {notApplicable ? 'N/A' : `${value}%`}
        </Typography>
        <Slider
          value={notApplicable ? 0 : value}
          onChange={onChange}
          min={0}
          max={100}
          step={5}
          disabled={disabled}
          valueLabelDisplay="auto"
          valueLabelFormat={(v) => `${v}%`}
          sx={{
            ...SLIDER_SX,
            flex: 1,
            ...(notApplicable && { '& .MuiSlider-thumb': { display: 'none' } }),
          }}
        />
      </Stack>
    </Box>
  );
}

export const AutofillCoverageCalculator = () => {
  const [offersNative, setOffersNative] = useState(DEFAULTS.offersNative);
  const [offersWeb, setOffersWeb] = useState(DEFAULTS.offersWeb);
  const [manualNativeMobile, setManualNativeMobile] = useState(DEFAULTS.manualNativeMobile);
  const [webCellular, setWebCellular] = useState(DEFAULTS.webCellular);

  const [methodologyExpanded, setMethodologyExpanded] = useState(false);

  const restoreDefaults = () => {
    setOffersNative(DEFAULTS.offersNative);
    setOffersWeb(DEFAULTS.offersWeb);
    setManualNativeMobile(DEFAULTS.manualNativeMobile);
    setWebCellular(DEFAULTS.webCellular);
  };

  const bothOffered = offersNative && offersWeb;
  const noneOffered = !offersNative && !offersWeb;

  const nativeMobile = noneOffered
    ? 0
    : bothOffered
    ? manualNativeMobile
    : offersNative
    ? 100
    : 0;

  const nativeMobileFraction = nativeMobile / 100;
  const webCellularFraction = webCellular / 100;

  const autofillCoverage = noneOffered
    ? '-'
    : computeCoverage(nativeMobileFraction, webCellularFraction, AUTOFILL_CARRIER_SUPPORT);
  const silentCoverage = noneOffered
    ? '-'
    : computeCoverage(nativeMobileFraction, webCellularFraction, SILENT_CARRIER_SUPPORT);
  const smsCoverage = noneOffered ? '-' : SMS_COVERAGE;

  const waterfallLinks = noneOffered
    ? []
    : buildWaterfallLinks(autofillCoverage, silentCoverage, smsCoverage);
  const autofillSuccessCount = nodeValue(SANKEY_LABELS.autofillSuccess, waterfallLinks);
  const silentSuccessCount = nodeValue(SANKEY_LABELS.silentSuccess, waterfallLinks);
  const smsSuccessCount = 100 - autofillSuccessCount - silentSuccessCount;
  const sankeyContainerRef = useRef(null);
  useSankeyStyling(sankeyContainerRef, waterfallLinks);

  return (
    <Card
      className="autofill-coverage-calculator"
      sx={{
        width: 'fit-content',
        maxWidth: '100%',
        my: 2,
        boxShadow: 'none',
        backgroundColor: 'var(--ifm-color-emphasis-100)',
        border: `1px solid ${BORDER_COLOR}`,
        borderRadius: '8px',
        fontFamily: BRAND_FONT,
        '& .MuiTypography-root, & .MuiSlider-valueLabel': {
          fontFamily: 'inherit',
          letterSpacing: 'normal',
        },
        '& .MuiFormControlLabel-label': {
          color: TEXT_COLOR,
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
          <Box component="h5" sx={{ m: 0, color: TEXT_COLOR }}>
            Estimate 1-Click Verify Coverage by Channel
          </Box>
          <Tooltip
            title="Restore Defaults"
            arrow
            componentsProps={{
              tooltip: { sx: { fontFamily: BRAND_FONT } },
            }}
          >
            <IconButton size="small" onClick={restoreDefaults} sx={{ color: MUTED_TEXT_COLOR }}>
              <RefreshIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>

        <Typography variant="body1" sx={STEP_SX}>
          1. Select what your company offers to users:
        </Typography>
        <FormGroup row sx={{ mb: 2 }}>
          <FormControlLabel
            sx={FORM_CONTROL_LABEL_SX}
            control={
              <Checkbox
                checked={offersNative}
                onChange={(e) => setOffersNative(e.target.checked)}
                sx={CHECKBOX_SX}
              />
            }
            label="Native mobile app"
          />
          <FormControlLabel
            sx={FORM_CONTROL_LABEL_SX}
            control={
              <Checkbox
                checked={offersWeb}
                onChange={(e) => setOffersWeb(e.target.checked)}
                sx={CHECKBOX_SX}
              />
            }
            label="Web app"
          />
        </FormGroup>

        <Typography variant="body1" sx={STEP_SX}>
          2. Adjust these values as needed:
        </Typography>
        <Stack spacing={1} sx={{ maxWidth: SLIDERS_MAX_WIDTH, mb: 2 }}>
          <SliderRow
            label="Users on Native Mobile (not Web)"
            value={nativeMobile}
            onChange={(_, value) => setManualNativeMobile(value)}
            disabled={!bothOffered}
          />
          <SliderRow
            label="Web Users on Cellular (not WiFi)"
            value={webCellular}
            onChange={(_, value) => setWebCellular(value)}
            disabled={!offersWeb}
            notApplicable={!offersWeb}
          />
        </Stack>

        <Typography variant="body1" sx={STEP_SX}>
          Coverage:
        </Typography>
        {noneOffered ? (
          <Typography variant="caption" sx={{ color: MUTED_TEXT_COLOR }}>
            Select at least one option above.
          </Typography>
        ) : (
          <Stack direction="row" spacing={3}>
            <ChannelResult
              label="Autofill Channel"
              value={autofillCoverage}
              caption="of users can have their verified phone number autofilled like magic!"
            />
            <ChannelResult
              label="Silent Channel"
              value={silentCoverage}
              caption="of users have their phone numbers silently verified without needing to receive an SMS."
            />
            <ChannelResult
              label="SMS Channel"
              value={smsCoverage}
              caption="of users can be verified by using a verification code or link they receive by SMS."
            />
          </Stack>
        )}

        {!noneOffered && (
          <>
            <Typography variant="body1" sx={{ ...STEP_SX, mt: 2 }}>
              Flow:
            </Typography>
            <Box ref={sankeyContainerRef} sx={{ width: '100%' }}>
              <Mermaid value={sankeyDiagramText(waterfallLinks)} />
            </Box>
            <Typography variant="body2" sx={{ color: TEXT_COLOR, mt: 1 }}>
              This means, for every 100 users:
              <ul style={{ margin: '4px 0 0', paddingLeft: '20px' }}>
                <li><b>{autofillSuccessCount}</b> do NOT need to enter their phone number or receive an SMS.</li>
                <li><b>{silentSuccessCount}</b> need to enter their phone number but do NOT need to receive an SMS.</li>
                <li><b>{smsSuccessCount}</b> need to enter their phone number and receive an SMS with a verification code and/or link.</li>
              </ul>
            </Typography>
          </>
        )}

        <Accordion
          disableGutters
          elevation={0}
          expanded={methodologyExpanded}
          onChange={(_, expanded) => setMethodologyExpanded(expanded)}
          sx={{
            mt: 3,
            backgroundColor: 'transparent',
            border: 'none',
            '&:before': { display: 'none' },
          }}
        >
          <AccordionSummary
            sx={{
              p: 0,
              minHeight: 0,
              flexDirection: 'row',
              justifyContent: 'flex-start',
              '& .MuiAccordionSummary-content': { flexGrow: 0, m: 0 },
            }}
          >
            <ExpandMoreIcon
              fontSize="small"
              sx={{
                color: MUTED_TEXT_COLOR,
                mr: 0.5,
                transform: methodologyExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s',
              }}
            />
            <Typography variant="body2" sx={{ color: MUTED_TEXT_COLOR }}>
              Methodology
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ p: 0, pt: 1.5, maxWidth: 560 }}>
            <Typography variant="body2" sx={{ color: TEXT_COLOR, mb: 1.5 }}>
              The autofill and silent channels are available when:
              <ol>
                <li><b>You can use a cellular (not WiFi) connection.</b> You can force one in a native mobile app, but in a web app you have to use whatever connection the user is on.</li>
                <li><b>The user's phone carrier supports the channel.</b> Verizon and T-Mobile (and most associated MVNOs) support autofill, but AT&T does not. All three of these support silent. So, about 70% of users have a carrier that supports autofill 100% have one that supports silent.</li>
              </ol>
            </Typography>
            <Typography variant="body2" sx={{ color: TEXT_COLOR, mb: 1.5 }}>
              We estimate coverage (C) for the autofill and silent channels with:
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: TEXT_COLOR,
                fontFamily: 'var(--ifm-font-family-monospace)',
                backgroundColor: 'var(--ifm-color-emphasis-200)',
                borderRadius: '4px',
                p: 1.5,
                mb: 1.5,
              }}
            >
              C = S × [N + (W × D)]
            </Typography>
            <Typography variant="body2" sx={{ color: TEXT_COLOR }}>
              <b>Carrier <u>S</u>upport:</b> Percentage of users with a carrier that supports the given channel. <i>This is fixed at 70% for the autofill channel (which is a safe assumption unless your users significantly skew toward or away from AT&T) and 100% for the silent channel.</i>
            </Typography>
            <Typography variant="body2" sx={{ color: TEXT_COLOR, mb: 0.5 }}>
              <b>Users on <u>N</u>ative Mobile:</b> Percentage of users using a native mobile app (not a web app).
            </Typography>
            <Typography variant="body2" sx={{ color: TEXT_COLOR, mb: 0.5 }}>
              <b>Users on <u>W</u>eb</b> (= 100% - Users on Native Mobile): Percentage of users using a web app (not a native mobile app).
            </Typography>
            <Typography variant="body2" sx={{ color: TEXT_COLOR, mb: 1.5 }}>
              <b>Web Users on Cellular (<u>D</u>ata):</b> Percentage of users on web using a cellular (not WiFi) connection.
            </Typography>
            <Typography variant="body2" sx={{ color: TEXT_COLOR, mb: 1.5 }}>
              <b>Silent</b> uses this same formula and these same inputs, but with Carrier Support
              fixed at 100% instead of 70% — AT&T supports silent verification, so carrier is no
              longer a limiting factor.
            </Typography>
            <Typography variant="body2" sx={{ color: TEXT_COLOR, mb: 1.5 }}>
              The SMS channel doesn't depend on the connection, and all carriers support it, so it's available for 100% of users.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default AutofillCoverageCalculator;
