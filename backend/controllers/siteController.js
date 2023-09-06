import inFluencerModel from "../models/influencerModel.js";

class siteController {
  static getAllInfluencers = async (req, res) => {
    try {
      const result = await inFluencerModel.find();
      res.json(result);
      // res.send(result);
    } catch (error) {
      console.log(error);
    }
  };

  static getInfluencerById = async (req, res) => {
    try {
      const result = await inFluencerModel.findById(req.params.id);
      res.json(result);
    } catch (error) {
      console.log(error);
    }
  };

  static createInfulencer = async (req, res) => {
    try {
      const { name, socialMedia, followers } = req.body;
      const doc = new inFluencerModel({
        name,
        socialMedia,
        followers,
      });
      res.json({ success: true });
      // res.send(result);
      await doc.save();
    } catch (error) {
      console.log(error);
    }
  };

  static deleteInfluencer = async (req, res) => {
    try {
      await inFluencerModel.findByIdAndDelete(req.params.id);
      res.json({ success: true });
    } catch (error) {
      console.log(error);
    }
  };

  static updateInfluencer = async (req, res) => {
    try {
      const result = await inFluencerModel.findByIdAndUpdate(
        req.params.id,
        req.body
      );
      res.send(result);
    } catch (error) {
      console.log(error);
    }
  };

  static sortName = async (req, res) => {
    try {
      const result = await inFluencerModel.find().sort({ name: 1 });
      console.log(result);
      res.json(result);
    } catch (error) {
      console.log(error);
    }
  };

  static sortFollowers = async (req, res) => {
    try {
      const result = await inFluencerModel.find().sort({ followers: 1 });
      console.log(result);
      res.json(result);
    } catch (error) {
      console.log(error);
    }
  };

  static search= async()=>{
    
  }
}

export default siteController;
