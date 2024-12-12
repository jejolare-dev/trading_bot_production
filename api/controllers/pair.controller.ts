import { Request, Response } from "express";
import { validationResult } from "express-validator";
import pairService from "../services/pair.service";
import UserData from "../interfaces/common/UserData";

class PairController {
    async getUserPairs(req: Request, res: Response) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).send({success: false, data: "Invalid data"});
        }

        const data = await pairService.getUserPairs(req.body.userData);

        if (data.success) {
            res.status(200).send(data);
        } else {
            res.status(400).send(data);
        }
    }

    async addPair(req: Request, res: Response) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).send({ success: false, data: "Invalid data" });
        }

        const data = await pairService.createPair(req.body);

        if (data.success) {
            res.status(200).send(data);
        } else {
            res.status(400).send(data);
        }  
    }

    async editPair(req: Request, res: Response) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).send({ success: false, data: "Invalid data" });
        }

        const data = await pairService.editPair(req.body);

        if (data.success) {
            res.status(200).send(data);
        } else {
            res.status(400).send(data);
        }  
    }

    async deletePair(req: Request, res: Response) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).send({ success: false, data: "Invalid data" });
        }

        const data = await pairService.deletePair(req.body);

        if (data.success) {
            res.status(200).send(data);
        } else {
            res.status(400).send(data);
        }  
    }

    async togglePairActivation(req: Request, res: Response) {
        const { id, active, userData } = req.body;
        const errors = validationResult(req);
    
        if (!errors.isEmpty()) {
            return res.status(400).send({ success: false, data: "Invalid data" });
        }
        
        const data = await pairService.toggleActivation(userData, id, active);
    
        if (data.success) {
            return res.status(200).send(data);
        } else {
            return res.status(400).send(data);
        }
    }
}

const pairController = new PairController();

export default pairController;