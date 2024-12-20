import { Product } from "../entity/Product";
import { AppDataSource } from "../data-source";

export class ProductService {
  private static productRepository = AppDataSource.getRepository(Product);

  public static CreateData = async (Name: string, price: number, SKU:number,fileName: string) => {
    const product = new Product();
    product.Name = Name;
    product.Price = price;
    product.image = fileName;
    product.SKU = SKU;
    try {
      const savedProduct = await ProductService.productRepository.save(product);
      return savedProduct;
    } catch (error) {
      console.error("Error saving product:", error);
      throw error;
    }
  };
  public static getData =async () => {
    const getProduct = await ProductService.productRepository.find();
    return getProduct;
    
  }
  public static findData = async(id:number)=>{
    const Data = await ProductService.productRepository.findOneBy({ id: id });
    return Data;
  }
  public static deleteData = async (id:number)=>{
    const Delete = await ProductService.productRepository.delete({ id: id });
    return Delete;
  }
  public static UpdateData = async (id: number,Name: string, price: number, SKU:number,fileName: string) => {
    const product = new Product();
    product.Name = Name;
    product.Price = price;
    product.image = fileName;
    product.SKU = SKU;
      const result = await ProductService.productRepository
        .createQueryBuilder()
        .update(Product) 
        .set(product) 
        .where('id = :id', { id: id })
        .execute();
      return result;
  
  }
  

}
