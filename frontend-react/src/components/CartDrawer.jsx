import { Drawer, Box, Typography, List, ListItem, ListItemText, Button, Divider, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function CartDrawer({ open, onClose, cartItems, onClearCart }) {
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 350, p: 3, bgcolor: '#0d1109', height: '100%', color: '#f2e8cf' }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', letterSpacing: 1 }}>AKTUELL ORDER</Typography>
        <Divider sx={{ bgcolor: '#4b5320', mb: 2 }} />
        
        <List>
          {cartItems.map((item, index) => (
            <ListItem key={index} sx={{ borderBottom: '1px solid #1b2613' }}>
              <ListItemText 
                primary={`${item.title} (x${item.quantity})`} 
                secondary={`${item.price * item.quantity} kr`}
                secondaryTypographyProps={{ style: { color: '#a7bc89' } }}
              />
            </ListItem>
          ))}
        </List>

        {cartItems.length > 0 ? (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6">TOTALT: {totalPrice} kr</Typography>
            <Button 
              variant="outlined" 
              color="error" 
              fullWidth 
              startIcon={<DeleteIcon />} 
              onClick={onClearCart}
              sx={{ mt: 2 }}
            >
              TÖM ORDER
            </Button>
            <Button variant="contained" color="success" fullWidth sx={{ mt: 2, bgcolor: '#4b5320' }}>
              SLUTFÖR BESTÄLLNING
            </Button>
          </Box>
        ) : (
          <Typography sx={{ fontStyle: 'italic', color: '#a7bc89' }}>Orderlistan är tom...</Typography>
        )}
      </Box>
    </Drawer>
  );
}

export default CartDrawer;