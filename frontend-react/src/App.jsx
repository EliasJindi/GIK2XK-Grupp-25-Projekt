import { useState, useEffect } from 'react';
import { Container, Grid, Typography, Box, AppBar, Toolbar, IconButton, Badge, ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ProductCard from './components/ProductCard';
import CartDrawer from './components/CartDrawer';

const militaryTheme = createTheme({
  palette: { mode: 'dark', primary: { main: '#4b5320' }, background: { default: '#0d1109' } },
});

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/products').then(res => res.json()).then(data => setProducts(data));
  }, []);

  const addToCart = (product, quantity) => {
    setCart([...cart, { ...product, quantity }]);
    setIsCartOpen(true); // Öppna korgen automatiskt vid köp
  };

  const clearCart = () => setCart([]);

  return (
    <ThemeProvider theme={militaryTheme}>
      <CssBaseline />
      <AppBar position="sticky" sx={{ bgcolor: '#0b1306', borderBottom: '2px solid #4b5320' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>ELIAS MILITARY COMMAND</Typography>
          <IconButton color="inherit" onClick={() => setIsCartOpen(true)}>
            <Badge badgeContent={cart.length} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container sx={{ py: 6 }}>
        <Grid container spacing={4} justifyContent="center">
          {products.map(p => (
            <Grid item key={p.id}>
              <ProductCard product={p} onAddToCart={addToCart} />
            </Grid>
          ))}
        </Grid>
      </Container>

      <CartDrawer 
        open={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cartItems={cart} 
        onClearCart={clearCart} 
      />
    </ThemeProvider>
  );
}

export default App;