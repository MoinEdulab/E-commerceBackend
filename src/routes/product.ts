import { Router } from 'express';
import ProductController from '../controller/ProductController'
import { image } from '../utils/multer';
const router = Router();

router.post('/getSaveData',image('file'),ProductController.getSaveProduct)
router.get('/getData',ProductController.getData);
router.delete('/deleteProduct',ProductController.delete)
router.put('/updateProduct',image('file'),ProductController.updateProduct)
export default router;