import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  MenuItem,
} from '@mui/material';
import {
  Menu as MenuIcon,
  PendingActions as PendingActionsIcon,
} from '@mui/icons-material';

// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveNavBar() {
  // The logic is that the on different screen sizes, some elements will be hidden, then others will show, using "display" property and "xs, md" keywords to assign screen sizes

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  //   const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(
  //     null
  //   );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  //   const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
  //     setAnchorElUser(event.currentTarget);
  //   };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  //   const handleCloseUserMenu = () => {
  //     setAnchorElUser(null);
  //   };

  const pages = ['Home', 'Pricing', 'About'];

  const DesktopMenuItems = () => {
    return (
      <>
        {pages.map((page) => (
          <Button
            key={page}
            component={Link}
            to={page === 'Home' ? '/' : `/${page.toLowerCase()}`}
            sx={{ my: 2, color: 'white', display: 'block', mx: 1 }}
          >
            {page}
          </Button>
        ))}
      </>
    );
  };

  const MobileMenuItems = () => {
    return (
      <>
        {pages.map((page) => (
          <MenuItem
            key={page}
            component={Link}
            to={page === 'Home' ? '/' : `/${page.toLowerCase()}`}
            onClick={handleCloseNavMenu}
          >
            <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
          </MenuItem>
        ))}
      </>
    );
  };

  return (
    <AppBar
      position="static"
      // sx={{
      //   backgroundColor: '#6d6875',
      // }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Desktop nav bar logo and nav items from here */}
          <PendingActionsIcon
            sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, fontSize: 32 }}
          />
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <DesktopMenuItems />
          </Box>

          {/* Mobile burger icon, menu, and items from here */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="burger menu button"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            {/* Menu that open on burger clicked */}
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              <MobileMenuItems />
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveNavBar;
