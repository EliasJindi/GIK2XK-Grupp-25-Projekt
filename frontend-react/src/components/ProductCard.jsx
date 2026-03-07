import { useState } from 'react';
import { 
  Card, CardContent, CardMedia, Typography, Rating, 
  Button, Box, IconButton, Dialog, DialogTitle, 
  DialogContent, List, ListItem, ListItemText, Divider, TextField 
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CommentIcon from '@mui/icons-material/Comment';

function ProductCard({ product, onAddToCart }) {
  // State för lokala funktioner
  const [quantity, setQuantity] = useState(1);
  const [openComments, setOpenComments] = useState(false);
  
  // State för ny fältrapport (recension)
  const [userRating, setUserRating] = useState(5);
  const [userComment, setUserComment] = useState("");

  // Justera antal (plus/minus)
  const adjustQty = (val) => {
    if (quantity + val >= 1) setQuantity(quantity + val);
  };

  // Skicka fältrapport till Backend
  const handleReviewSubmit = () => {
    const reviewData = {
      productId: product.id,
      rating: userRating,
      comment: userComment,
      userId: 1 // Hårdkodat till General Elias (ID 1)
    };

    fetch('http://localhost:5000/ratings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reviewData)
    })
    .then(res => res.json())
    .then(data => {
      alert("Fältrapport skickad!"); //
      setUserComment(""); 
      setOpenComments(false);
      // Laddar om sidan för att visa den nya recensionen direkt
      window.location.reload(); 
    })
    .catch(err => console.error("Kunde inte skicka recension:", err));
  };

  const reviewCount = product.Ratings ? product.Ratings.length : 0;

  return (
    <>
      <Card sx={{ 
        maxWidth: 320, 
        m: 2, 
        bgcolor: '#1b2613', 
        color: '#f2e8cf', 
        border: '1px solid #4b5320',
        boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
      }}>
        <CardMedia 
          component="img" 
          height="180" 
          image={product.imageUrl || 'https://via.placeholder.com/400x200?text=MATERIEL+SAKNAS'} 
          alt={product.title} 
        />
        
        <CardContent>
          <Typography variant="h5" sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
            {product.title}
          </Typography>
          
          {/* Stjärnor och Knapp för Utlåtanden */}
          <Box sx={{ display: 'flex', alignItems: 'center', my: 1 }}>
            <Rating 
              value={product.averageRating || 0} 
              precision={0.5} 
              readOnly 
              size="small" 
              sx={{ color: '#ff4400' }} 
            />
            <Button 
              size="small" 
              startIcon={<CommentIcon />}
              onClick={() => setOpenComments(true)}
              sx={{ ml: 1, color: '#a7bc89', fontSize: '0.7rem', textTransform: 'none' }}
            >
              {reviewCount} Utlåtanden
            </Button>
          </Box>

          <Typography variant="h5" sx={{ color: '#ff4400', fontWeight: 'bold', mb: 2 }}>
            {product.price.toLocaleString()} kr
          </Typography>
          
          {/* Kvantitetsväljare */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            mb: 2, 
            bgcolor: '#0d1109', 
            p: 0.5, 
            borderRadius: 1,
            border: '1px solid #4b5320'
          }}>
            <IconButton onClick={() => adjustQty(-1)} sx={{ color: '#f2e8cf' }}><RemoveIcon /></IconButton>
            <Typography sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{quantity}</Typography>
            <IconButton onClick={() => adjustQty(1)} sx={{ color: '#f2e8cf' }}><AddIcon /></IconButton>
          </Box>

          <Button 
            variant="contained" 
            fullWidth 
            onClick={() => onAddToCart(product, quantity)}
            sx={{ bgcolor: '#4b5320', fontWeight: 'bold', '&:hover': { bgcolor: '#5c6628' } }}
          >
            LÄGG TILL I ORDER
          </Button>
        </CardContent>
      </Card>

      {/* MODAL: Läs och skriv fältrapporter */}
      <Dialog 
        open={openComments} 
        onClose={() => setOpenComments(false)} 
        PaperProps={{ sx: { bgcolor: '#0d1109', color: '#f2e8cf', minWidth: '350px' } }}
      >
        <DialogTitle sx={{ borderBottom: '1px solid #4b5320', fontWeight: 'bold' }}>
          FÄLTRAPPORTER: {product.title}
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          
          {/* Lista med existerande recensioner */}
          <List>
            {product.Ratings && product.Ratings.length > 0 ? (
              product.Ratings.map((rev, i) => (
                <ListItem key={i} alignItems="flex-start" sx={{ px: 0, borderBottom: '1px solid #1b2613' }}>
                  <ListItemText 
                    primary={
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography sx={{ fontWeight: 'bold', color: '#a7bc89' }}>
                          {rev.User?.username || 'Anonym Soldat'}
                        </Typography>
                        <Rating value={rev.score || rev.rating} size="small" readOnly sx={{ color: '#ff4400' }} />
                      </Box>
                    }
                    secondary={<Typography sx={{ color: '#f2e8cf', fontStyle: 'italic', mt: 0.5 }}>"{rev.comment}"</Typography>}
                  />
                </ListItem>
              ))
            ) : (
              <Typography sx={{ py: 2, fontStyle: 'italic', color: '#a7bc89' }}>Inga rapporter inkomna.</Typography>
            )}
          </List>

          <Divider sx={{ bgcolor: '#4b5320', my: 3 }} />

          {/* Sektion för att skriva ny rapport */}
          <Typography variant="h6" sx={{ mb: 2, color: '#a7bc89', fontWeight: 'bold' }}>LÄMNA EN FÄLTRAPPORT</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography>Betyg:</Typography>
              <Rating 
                value={userRating} 
                onChange={(event, newValue) => setUserRating(newValue)} 
                sx={{ color: '#ff4400' }} 
              />
            </Box>
            <TextField
              label="Din kommentar"
              multiline
              rows={3}
              fullWidth
              variant="filled"
              value={userComment}
              onChange={(e) => setUserComment(e.target.value)}
              sx={{ 
                bgcolor: '#1b2613', 
                input: { color: 'white' }, 
                '& .MuiFormLabel-root': { color: '#a7bc89' },
                '& .MuiInputBase-root': { color: 'white' }
              }}
            />
            <Button 
              variant="contained" 
              onClick={handleReviewSubmit}
              sx={{ bgcolor: '#ff4400', fontWeight: 'bold', mb: 2 }}
            >
              SKICKA RAPPORT
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ProductCard;