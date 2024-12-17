import React from 'react';
import { styled } from '@mui/material/styles';
import { 
  Box, 
  Container, 
  Typography, 
  IconButton, 
  Link, 
  Paper,
  Grid,
  Divider
} from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const FooterContainer = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(8),
  padding: theme.spacing(6, 0),
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[100],
  borderRadius: '16px 16px 0 0',
}));

const SocialIcon = styled(IconButton)(({ theme }) => ({
  color: theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.main,
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' 
      ? 'rgba(255, 255, 255, 0.08)' 
      : 'rgba(33, 150, 243, 0.08)',
  },
}));

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer elevation={0}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom color="primary">
              About Me
            </Typography>
            <Typography variant="body1" paragraph>
              I am a computer science, tech and AI enthusiast and I like making websites and apps, 
              and even going beyond that scope during my free time. I love interacting with all 
              these communities too. Don't hesitate to reach out to me in the contacts section.
            </Typography>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom color="primary">
              Contact
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <LocationOnIcon color="action" sx={{ mr: 1 }} />
              <Typography variant="body1">
                Dublin, Ireland
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <EmailIcon color="action" sx={{ mr: 1 }} />
              <Link 
                href="mailto:mikedowells150@gmail.com"
                color="inherit"
                underline="hover"
              >
                mikedowells150@gmail.com
              </Link>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 3 }}>
          <SocialIcon 
            href="https://www.instagram.com/dowee.y/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramIcon />
          </SocialIcon>
          <SocialIcon 
            href="https://github.com/dowells-mike"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitHubIcon />
          </SocialIcon>
          <SocialIcon 
            href="https://www.linkedin.com/in/dowells-mike"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedInIcon />
          </SocialIcon>
        </Box>

        <Typography 
          variant="body2" 
          color="text.secondary" 
          align="center"
        >
          © {currentYear} PromptVault by Mike Dowells. All rights reserved.
        </Typography>
      </Container>
    </FooterContainer>
  );
};

export default Footer;
