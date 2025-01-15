import { AutoAwesome, LinkedIn, OpenInNew } from '@mui/icons-material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Collapse,
  IconButton,
  Link,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import React, { useState } from 'react';
import LinkedInButton from '@site/src/components/Buttons/LinkedInButton';

const SALES_SERVICE_URL_SANDBOX = "https://sales-tools-service-api.sandbox-verifiedinc.com/customers/brands";
const SALES_SERVICE_URL_PRODUCTION = "https://sales-tools-service-api.verified.inc/customers/brands";

export const DemoEmailForm = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(true);
  const [demoUrl, setDemoUrl] = useState(null);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    };

    try {
      // Fetch sandbox data
      const responseSandbox = await fetch(SALES_SERVICE_URL_SANDBOX, requestOptions);
      const responseJsonSandbox = await responseSandbox.json();
      const urlSandbox = new URL(responseJsonSandbox["1ClickDemoUrl"]);
      const urlParamsSandbox = new URLSearchParams(urlSandbox.search);
      const brandUrlParamSandbox = urlParamsSandbox.get('brand');

      // Fetch production data
      const responseProduction = await fetch(SALES_SERVICE_URL_PRODUCTION, requestOptions);
      const responseJsonProduction = await responseProduction.json();
      const urlProductionString = responseJsonProduction["1ClickDemoUrl"];
      const urlProduction = new URL(urlProductionString);
      const urlParamsProduction = new URLSearchParams(urlProduction.search);
      const brandUrlParamProduction = urlParamsProduction.get('brand');

      // Construct demo URL
      const demoUrl = `${urlProductionString.split('?')[0]}?primaryEnvBrand=${brandUrlParamProduction}&secondaryEnvBrand=${brandUrlParamSandbox}`;
      setDemoUrl(demoUrl);

      // Open demo in new tab
      window.open(demoUrl, '_blank').focus();


    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  function renderGeneratedDemoContent() {
    const buttonsStyle = {
      minWidth: '180px',
      width: '180px',
      padding: '6px 16px'
    }

    return (
      <>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            fontSize: '1.1em',
            mb: 3,
            textAlign: 'center',
          }}
        >
          Custom demo of 1-Click Signup for Verified!
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="center">
          <LinkedInButton
            url={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(demoUrl)}`}
            sx={buttonsStyle}
          />
          <Button
            variant="outlined"
            color="primary"
            startIcon={<OpenInNew />}
            onClick={() => window.open(demoUrl, '_blank')}
            sx={buttonsStyle}
          >
            Open Demo
          </Button>
        </Stack>
      </>
    )
  }

  return (
    <Card
      id="demo-email-card"
      sx={{
        width: '100%',
        my: 2,
        transition: 'all 0.3s ease-in-out',
        boxShadow: 'none',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
      }}


    >
      <CardContent onClick={handleExpandClick} sx={{
        '&:hover': {
          cursor: 'pointer',
        }
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

          Create a Custom Demo in 1-Second

          <IconButton

            sx={{
              transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.3s',
            }}
            aria-expanded={expanded}
            aria-label="show form"
          >
            <KeyboardArrowDownIcon />
          </IconButton>
        </Box>
      </CardContent>
      <Collapse in={expanded}>
        <CardContent>
          {!demoUrl ? (
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                '& .MuiTextField-root': {
                  backgroundColor: 'white',
                },
              }}
            >
              <TextField
                fullWidth
                type="email"
                label="Work Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                size="small"
                margin="dense"
                variant="outlined"
                color="primary"
              />
              <Typography variant="caption" className="legal-text" sx={{ display: 'block', mt: 1, mb: 1 }}>
                By continuing, you agree to our <Link href="https://www.verified.inc/legal#terms-of-use" target="_blank" rel="noopener">Terms</Link> and acknowledge our <Link href="https://www.verified.inc/legal#privacy-policy" target="_blank" rel="noopener">Privacy Policy</Link>.
              </Typography>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                startIcon={!loading && <AutoAwesome />}
                disabled={loading}
                sx={{
                  textTransform: 'none',
                  minWidth: '120px',
                  mt: 2,
                }}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  <>
                    Generate Demo
                  </>
                )}
              </Button>
            </Box>
          ) : (
            renderGeneratedDemoContent()
          )}
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default DemoEmailForm;
