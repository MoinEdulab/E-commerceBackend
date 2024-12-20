import { NextFunction, Request, Response } from 'express';
const FILE_LOCATION = process.env.FILE_LOCATION || "";
import * as fs from 'fs';
import { ProductService } from '../services/product.service'
const SERVERL_URL = process.env.SERVER_URL;

export default class ProductController {
/*
Author: Moin.
Router: /api/ProductAdd/getSaveProduct
Description: this function use for save the Product list in database ,
*/
    public static getSaveProduct = async (req: Request, res: Response) => {
        try {
            const file: any = req.file;
            const { Name, Price, SKU } = req.body;
            if (!file) {
                return res
                    .status(400)
                    .json({ message: "File is missing in the request" });
            }
            const extension = file.originalname.split('.').pop();
            const oldname = `${FILE_LOCATION}public/${file.filename}`;
            fs.rename(oldname, `${oldname}.${extension}`, () => {
            });
            const createdData = await ProductService.CreateData(Name, Price, SKU, file.filename + "." + extension);
            if (createdData) {
                res.json({
                    status: 200,
                    message: "Document Uploaded Successfully!"
                });
            }

        } catch (err) {
            res.status(500).json({ status: 500, message: 'Some think went wrong' })
        }
    }
/*
Author: Moin.
Router: /api/ProductAdd/getData
Description: this function use to get the Product list  ,
*/
    public static getData = async (req: Request, res: Response) => {
        try {
            const getData = await ProductService.getData();
            const data = [];
            for (const Data of getData) {
                data.push({
                    id: Data.id,
                    SKU: Data.SKU,
                    Name: Data.Name,
                    Price: Data.Price,
                    image: Data.image,
                    fileLink: `${SERVERL_URL}/public/${Data.image}`
                });
            }
            if (getData) {
                res.status(200).json({ status: 200, message: "All colleges", data: data });
            }
        } catch (err) {
            res.status(500).json({ status: 500, message: 'Something went wrong' });
        }
    }
/*
Author: Moin.
Router: /api/ProductAdd/delete
Description: this function use to delete the Product list  ,
*/
    public static delete = async (req: Request, res: Response) => {
        try {
            const currentPath: string = process.cwd();
            fs.unlink(currentPath + '/src/public/' + req.query.filename, err => {
                if (err) throw err;
            });
            const userData = await ProductService.findData(Number(req.query.id));
            if (userData) {
                const deleteData = await ProductService.deleteData(Number(userData.id));
                res.status(200).json({ status: 200, data: deleteData });

            }
        } catch (err) {
            res.status(500).json({ status: 500, message: 'Something went wrong' });

        }
    }
/*
Author: Moin.
Router: /api/ProductAdd/updateProduct
Description: this function use to Update the Product list  ,
*/
    public static updateProduct = async (req: Request, res: Response) => {
        try {
            const file: any = req.file;
            const { Name, Price, SKU, id } = req.body;
            if (!file) {
                return res
                    .status(400)
                    .json({ message: "File is missing in the request" });
            }
            const extension = file.originalname.split('.').pop();
            const oldname = `${FILE_LOCATION}public/${file.filename}`;
            fs.rename(oldname, `${oldname}.${extension}`, () => {
            });
            const findUser = await ProductService.findData(Number(id));
            if (findUser) {
                const updateData = await ProductService.UpdateData(Number(findUser.id), Name, Price, SKU, file.filename + "." + extension);
                res.status(200).json({ status: 200, data: updateData });

            }
        } catch (err) {
            res.status(500).json({ status: 500, message: 'Something went wrong' });

        }
    }
}